import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const BarbershopCase = () => {
  const { lang } = useLanguage();

  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-20">
        <div className="container max-w-4xl">
          <Link 
            to={`/${lang}/cases`}
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar para Cases
          </Link>

          <article>
            <header className="mb-12">
              <div className="mb-4 inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-500">
                Site & Automação
              </div>
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                Barbearia Local: Digitalização e agendamento sem fricção
              </h1>
              <p className="text-xl text-muted-foreground">
                Como transformamos o atendimento de uma barbearia com uma presença digital moderna e agendamento integrado.
              </p>
            </header>

            <div className="prose prose-slate max-w-none dark:prose-invert">
              <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">O Contexto</h2>
                <p className="text-muted-foreground">
                  A barbearia atendia a dezenas de clientes diariamente, mas enfrentava o desafio comum: interrupções constantes para responder mensagens e fazer agendamentos, além da perda de clientes que tentavam marcar horários fora do expediente.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">O Problema</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-red-500/70" /> Perda de tempo em atendimentos manuais.</li>
                  <li className="flex gap-2"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-red-500/70" /> Ausência de um canal oficial além do Instagram.</li>
                  <li className="flex gap-2"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-red-500/70" /> Dificuldade do cliente para visualizar horários disponíveis de forma autônoma.</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">O que foi entregue</h2>
                <p className="text-muted-foreground mb-4">
                  Desenvolvemos uma landing page de alta conversão associada a um sistema de agendamento automático.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border bg-card p-4">
                    <h3 className="font-semibold">Landing Page Profissional</h3>
                    <p className="text-sm text-muted-foreground mt-2">Design responsivo e com identidade visual alinhada, apresentando serviços e preços de forma clara.</p>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-4">
                    <h3 className="font-semibold">Sistema de Agendamento</h3>
                    <p className="text-sm text-muted-foreground mt-2">Integração para o cliente escolher o profissional e horário sem depender de resposta humana.</p>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Resultado</h2>
                <p className="text-muted-foreground mb-4">
                  O projeto publicado (disponível no <a href="https://barbershop.agilonex.workers.dev/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">link de demonstração</a>) estabelece uma estrutura capaz de captar agendamentos 24 horas por dia. O fluxo de informações agora é imediato, reduzindo a carga cognitiva da equipe e garantindo uma experiência premium ao cliente.
                </p>
              </section>

              <div className="mt-12 rounded-2xl bg-blue-500/5 p-8 text-center border border-blue-500/10">
                <h2 className="text-2xl font-bold mb-4">Quer um resultado semelhante no seu negócio?</h2>
                <p className="text-muted-foreground mb-6">
                  Fale conosco para entender como podemos digitalizar a sua operação.
                </p>
                <a 
                  href={`/${lang}#contato`} 
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-blue-600 px-8 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Solicitar um diagnóstico
                </a>
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BarbershopCase;
