import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const Cases = () => {
  const { lang } = useLanguage();

  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-20">
        <div className="container max-w-5xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Projetos e Resultados
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Conheça as soluções que desenvolvemos para negócios reais. Da ideia à execução.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Case: Barbearia */}
            <div className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-500">
                Site & Automação
              </div>
              <h2 className="mb-2 text-2xl font-bold">Barbearia Local</h2>
              <p className="mb-6 text-muted-foreground">
                Presença digital completa com agendamento integrado, garantindo conversão 24/7 sem depender de atendimento manual.
              </p>
              <ul className="mb-8 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Site de alta conversão
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Redução de fricção no agendamento
                </li>
              </ul>
              <Link 
                to={`/${lang}/cases/barbershop`}
                className="inline-flex items-center gap-2 font-medium text-blue-500 transition-colors hover:text-blue-600"
              >
                Ler estudo de caso completo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Outros cases podem entrar aqui futuramente */}
            <div className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-500">
                Sistema de Gestão
              </div>
              <h2 className="mb-2 text-2xl font-bold">Patrimônio Hub</h2>
              <p className="mb-6 text-muted-foreground">
                App de gestão de patrimônio para empresários, focado em holding e imóveis, proporcionando controle total sobre ativos.
              </p>
              <ul className="mb-8 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Painel analítico completo
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Segurança e privacidade de dados
                </li>
              </ul>
              <a 
                href="https://patrimonio-landing.gabrieluizdev.workers.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium text-blue-500 transition-colors hover:text-blue-600"
              >
                Acessar projeto <ArrowRight className="h-4 w-4" />
              </a>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cases;
