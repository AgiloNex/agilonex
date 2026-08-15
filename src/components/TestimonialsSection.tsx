import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { reviews, averageRating, reviewCount, BEST_RATING } from "@/data/reviews";

const TestimonialsSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const { t, language } = useLanguage();
  const avg = averageRating();

  return (
    <section id="depoimentos" className="py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            {t.testimonials.tag}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
            {t.testimonials.title}
          </h2>
          <p
            className="sr-only"
            aria-label={t.testimonials.aggregateAria
              .replace("{value}", String(avg))
              .replace("{count}", String(reviewCount()))}
          >
            {t.testimonials.aggregateAria
              .replace("{value}", String(avg))
              .replace("{count}", String(reviewCount()))}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card p-8 rounded-[20px] shadow-card"
            >
              <div
                className="flex gap-0.5 mb-4"
                aria-label={t.testimonials.ratingAria.replace(
                  "{value}",
                  String(review.ratingValue)
                )}
              >
                {Array.from({ length: BEST_RATING }).map((_, si) => (
                  <Star
                    key={si}
                    size={16}
                    className={
                      si < review.ratingValue
                        ? "fill-primary text-primary"
                        : "fill-transparent text-muted-foreground"
                    }
                  />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed text-pretty">
                "{review.text[language]}"
              </p>
              <div className="mt-6 pt-4 border-t border-border">
                <p className="font-semibold text-foreground text-sm">
                  {review.author[language]}
                </p>
                <p className="text-xs text-muted-foreground">
                  {review.role[language]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
