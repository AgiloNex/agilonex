import { Link } from "react-router-dom";

const sections = [
  {
    title: "1. Dados que coletamos",
    body:
      "Podemos coletar nome, e-mail, telefone, empresa, mensagem enviada, informações de navegação e dados necessários para atendimento, orçamento e prestação dos serviços.",
  },
  {
    title: "2. Finalidade do uso",
    body:
      "Os dados são usados para responder solicitações, prestar suporte, melhorar a experiência, executar contratos e enviar comunicações relacionadas aos nossos serviços quando permitido.",
  },
  {
    title: "3. Compartilhamento",
    body:
      "Não vendemos dados pessoais. O compartilhamento ocorre apenas quando necessário para operar o serviço, cumprir obrigações legais ou com parceiros essenciais à prestação contratada.",
  },
  {
    title: "4. Segurança e retenção",
    body:
      "Adotamos medidas técnicas e administrativas para proteger as informações. Os dados são mantidos apenas pelo tempo necessário às finalidades informadas ou por obrigação legal.",
  },
  {
    title: "5. Direitos do titular",
    body:
      "Você pode solicitar acesso, correção, exclusão, portabilidade e esclarecimentos sobre o tratamento de dados pessoais pelos nossos canais de contato.",
  },
];

const Lgpd = () => {
  return (
    <main className="min-h-screen bg-background py-20 md:py-28">
      <div className="container max-w-4xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary mb-3">
            LGPD
          </p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground normal-case">
            Política de Privacidade e LGPD
          </h1>
          <p className="mt-4 text-muted-foreground text-pretty">
            Aqui explicamos de forma direta como tratamos seus dados pessoais e quais são seus direitos.
          </p>
        </div>

        <div className="space-y-4">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-[20px] border border-border/70 bg-card/90 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.16)]"
            >
              <h2 className="text-xl font-bold tracking-tight text-foreground normal-case">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
            </article>
          ))}
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          Este conteúdo tem caráter informativo e deve ser revisado com assessoria jurídica para uso final.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
        >
          Voltar para a home
        </Link>
      </div>
    </main>
  );
};

export default Lgpd;
