import { useEffect, useState } from "react";
import { motion , useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/i18n/LanguageContext";

const MONTHLY_PLAN_PRICE = 397;
const VALUE_PER_HOUR = 25;

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const numberFormatter = new Intl.NumberFormat("pt-BR");
const percentFormatter = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 1,
});

type AnimatedNumberProps = {
  value: number;
  formatter: (value: number) => string;
  className?: string;
};

const AnimatedNumber = ({ value, formatter, className }: AnimatedNumberProps) => {
  const shouldReduceMotion = useReducedMotion();

  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const startValue = displayValue;
    const endValue = value;
    const duration = 350;
    let startTime = 0;
    let frame = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const nextValue = startValue + (endValue - startValue) * progress;
      setDisplayValue(nextValue);

      if (progress < 1) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    frame = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frame);
  }, [value]);

  return <span className={className}>{formatter(displayValue)}</span>;
};

const ROICalculator = () => {
  const shouldReduceMotion = useReducedMotion();

  const { t } = useLanguage();
  const [messagesPerDay, setMessagesPerDay] = useState(50);
  const [manualHours, setManualHours] = useState(3);
  const [ticketAverage, setTicketAverage] = useState(200);
  const [conversionRate, setConversionRate] = useState(20);

  const lostMessagesPerDay = messagesPerDay * 0.4;
  const clientsLostPerMonth = lostMessagesPerDay * (conversionRate / 100) * 30;
  const revenueLostPerMonth = clientsLostPerMonth * ticketAverage;
  const timeCostPerMonth = manualHours * VALUE_PER_HOUR * 26;
  const totalLostPerMonth = revenueLostPerMonth + timeCostPerMonth;
  const netSavings = totalLostPerMonth - MONTHLY_PLAN_PRICE;
  const roiPercent = ((totalLostPerMonth - MONTHLY_PLAN_PRICE) / MONTHLY_PLAN_PRICE) * 100;

  const updateFromSlider =
    (setter: (value: number) => void) => (value: number[]) => setter(value[0] ?? 0);

  const formatSignedCurrency = (value: number) => {
    const formatted = currency.format(Math.abs(value));
    return value >= 0 ? formatted : `- ${formatted}`;
  };

  const formatPercent = (value: number) => `${percentFormatter.format(value)}%`;

  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-background via-background to-secondary/20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="container relative">
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary mb-3">
            {t.roi.tag}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
            {t.roi.title}
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">{t.roi.subtitle}</p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr,0.95fr]">
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="rounded-[24px] border border-border/70 bg-card/85 p-6 md:p-8 shadow-[0_18px_48px_rgba(0,0,0,0.2)] backdrop-blur-sm"
          >
            <div className="space-y-7">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <label className="text-sm font-medium text-foreground">
                    {t.roi.labels.messagesPerDay}
                  </label>
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    {numberFormatter.format(messagesPerDay)}
                  </span>
                </div>
                <Slider value={[messagesPerDay]} min={10} max={500} step={1} onValueChange={updateFromSlider(setMessagesPerDay)} className="w-full" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>10</span>
                  <input
                    type="number"
                    min={10}
                    max={500}
                    value={messagesPerDay}
                    onChange={(event) =>
                      setMessagesPerDay(Math.min(500, Math.max(10, Number(event.target.value) || 10)))
                    }
                    className="w-24 rounded-md border border-input bg-background px-3 py-2 text-right text-sm text-foreground shadow-sm outline-none transition-colors focus:border-primary"
                  />
                  <span>500</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <label className="text-sm font-medium text-foreground">{t.roi.labels.manualHours}</label>
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    {numberFormatter.format(manualHours)}h
                  </span>
                </div>
                <Slider value={[manualHours]} min={1} max={12} step={1} onValueChange={updateFromSlider(setManualHours)} className="w-full" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>1h</span>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={manualHours}
                    onChange={(event) =>
                      setManualHours(Math.min(12, Math.max(1, Number(event.target.value) || 1)))
                    }
                    className="w-24 rounded-md border border-input bg-background px-3 py-2 text-right text-sm text-foreground shadow-sm outline-none transition-colors focus:border-primary"
                  />
                  <span>12h</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <label className="text-sm font-medium text-foreground">{t.roi.labels.ticketAverage}</label>
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    {currency.format(ticketAverage)}
                  </span>
                </div>
                <Slider value={[ticketAverage]} min={50} max={2000} step={10} onValueChange={updateFromSlider(setTicketAverage)} className="w-full" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>R$ 50</span>
                  <input
                    type="number"
                    min={50}
                    max={2000}
                    step={10}
                    value={ticketAverage}
                    onChange={(event) =>
                      setTicketAverage(Math.min(2000, Math.max(50, Number(event.target.value) || 50)))
                    }
                    className="w-28 rounded-md border border-input bg-background px-3 py-2 text-right text-sm text-foreground shadow-sm outline-none transition-colors focus:border-primary"
                  />
                  <span>R$ 2.000</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <label className="text-sm font-medium text-foreground">{t.roi.labels.conversionRate}</label>
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    {formatPercent(conversionRate)}
                  </span>
                </div>
                <Slider value={[conversionRate]} min={5} max={80} step={1} onValueChange={updateFromSlider(setConversionRate)} className="w-full" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>5%</span>
                  <input
                    type="number"
                    min={5}
                    max={80}
                    value={conversionRate}
                    onChange={(event) =>
                      setConversionRate(Math.min(80, Math.max(5, Number(event.target.value) || 5)))
                    }
                    className="w-24 rounded-md border border-input bg-background px-3 py-2 text-right text-sm text-foreground shadow-sm outline-none transition-colors focus:border-primary"
                  />
                  <span>80%</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-[24px] border border-border/70 bg-card p-6 md:p-8 shadow-[0_18px_48px_rgba(0,0,0,0.28)] text-card-foreground"
          >
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[18px] border border-border/20 bg-muted/50 p-4">
                  <p className="text-sm text-muted-foreground">{t.roi.stats.revenueLost}</p>
                  <AnimatedNumber value={revenueLostPerMonth} formatter={(value) => currency.format(value)} className="mt-2 block text-xl font-bold tracking-tight text-foreground" />
                </div>
                <div className="rounded-[18px] border border-border/20 bg-muted/50 p-4">
                  <p className="text-sm text-muted-foreground">{t.roi.stats.timeCost}</p>
                  <AnimatedNumber value={timeCostPerMonth} formatter={(value) => currency.format(value)} className="mt-2 block text-xl font-bold tracking-tight text-foreground" />
                </div>
              </div>

              <div className="rounded-[20px] border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-red-500/5 p-5">
                <p className="text-sm font-medium text-orange-300">{t.roi.stats.totalLost}</p>
                <AnimatedNumber value={totalLostPerMonth} formatter={(value) => currency.format(value)} className="mt-2 block text-3xl md:text-4xl font-bold tracking-tight text-orange-200" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[18px] border border-emerald-500/30 bg-emerald-500/10 p-4">
                  <p className="text-sm text-emerald-300">{t.roi.stats.netSavings}</p>
                  <AnimatedNumber
                    value={netSavings}
                    formatter={formatSignedCurrency}
                    className={`mt-2 block text-xl font-bold tracking-tight ${netSavings >= 0 ? "text-emerald-200" : "text-rose-200"}`}
                  />
                </div>
                <div className="rounded-[18px] border border-emerald-500/30 bg-emerald-500/10 p-4">
                  <p className="text-sm text-emerald-300">ROI</p>
                  <AnimatedNumber
                    value={roiPercent}
                    formatter={formatPercent}
                    className={`mt-2 block text-xl font-bold tracking-tight ${roiPercent > 0 ? "text-emerald-200" : "text-rose-200"}`}
                  />
                </div>
              </div>

              <div className="rounded-[20px] border border-border/60 bg-muted/50 p-5">
                {netSavings > 0 ? (
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t.roi.stats.planSavings
                      .replace("{price}", currency.format(MONTHLY_PLAN_PRICE))
                      .replace("{value}", currency.format(netSavings))}
                    {" "}
                    - {t.roi.stats.payback}{" "}
                    <strong className="text-foreground">{Math.max(1, Math.round((MONTHLY_PLAN_PRICE / totalLostPerMonth) * 30))} {t.roi.stats.days}</strong>.
                  </p>
                ) : (
                  <p className="text-sm leading-relaxed text-muted-foreground">{t.roi.stats.lowVolume}</p>
                )}

                <a
                  href="#contato"
                  className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:gap-3 hover:opacity-95"
                >
                  {t.roi.cta}
                  <ArrowRight size={16} />
                </a>
              </div>

              <p className="pt-1 text-xs text-muted-foreground">{t.roi.stats.note}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
