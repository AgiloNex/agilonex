import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const items = [
  {
    title: "1. Aceite",
    body:
      "Ao acessar o site e contratar nossos serviços, você concorda com estes termos e com as condições comerciais apresentadas durante a negociação.",
  },
  {
    title: "2. Uso do site e dos serviços",
    body:
      "É proibido usar o site de forma ilícita, fraudulenta, para violar direitos de terceiros ou para tentar comprometer a segurança da plataforma.",
  },
  {
    title: "3. Responsabilidades do cliente",
    body:
      "O cliente deve fornecer informações verdadeiras, manter a confidencialidade de acessos e garantir que o uso da solução esteja de acordo com a legislação aplicável ao seu negócio.",
  },
  {
    title: "4. Limitação de responsabilidade",
    body:
      "Nos empenhamos para entregar soluções estáveis e seguras, mas não respondemos por danos indiretos, uso indevido da solução ou indisponibilidades causadas por terceiros.",
  },
  {
    title: "5. Alterações e suporte",
    body:
      "Podemos atualizar estes termos para refletir melhorias operacionais, legais ou de segurança. O suporte e os prazos seguem o que foi acordado em contrato ou proposta.",
  },
];

const Terms = () => {
  const { languagePath } = useLanguage();
  return (
    <main className="min-h-screen bg-background py-20 md:py-28">
      <div className="container max-w-4xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary mb-3">
            Termos
          </p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground normal-case">
            Termos de Uso
          </h1>
          <p className="mt-4 text-muted-foreground text-pretty">
            Leia as regras básicas de uso do site e dos serviços da AgiloNex.
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-[20px] border border-border/70 bg-card/90 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.16)]"
            >
              <h2 className="text-xl font-bold tracking-tight text-foreground normal-case">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          Este conteúdo é um modelo operacional e deve ser adaptado ao contrato final e à orientação jurídica.
        </p>

        <Link
          to={languagePath()}
          className="mt-8 inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
        >
          Voltar para a home
        </Link>
      </div>
    </main>
  );
};

export default Terms;
