import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSEO } from "@/hooks/useSEO";
import { legalPageSchema, BASE_URL } from "@/lib/seoSchemas";
import { founder } from "@/lib/identity";

const CONTACT_EMAIL = founder.email;
const LAST_UPDATED = { pt: "10 de julho de 2026", en: "July 10, 2026", es: "10 de julio de 2026" };

const content = {
  pt: {
    updatedLabel: "Última atualização",
    title: "Política de Cookies",
    s1: {
      h: "1. Sobre esta política",
      pre: "Esta política explica como a AgiloNex usa cookies e tecnologias semelhantes no site agilonex.com.br, e como você controla isso. Ela complementa a nossa ",
      link: "Política de Privacidade",
      post: " — em caso de dúvida sobre como tratamos dados pessoais de forma mais ampla, essa é a referência principal.",
    },
    s2: {
      h: "2. O que é um cookie",
      body: "Cookie é um pequeno arquivo de texto que um site grava no seu navegador pra lembrar informações entre visitas ou entre páginas — como uma etiqueta temporária colada no seu navegador. Alguns somem quando você fecha o navegador; outros ficam salvos por um tempo definido.",
    },
    s3: {
      h: "3. Como agrupamos os cookies que usamos",
      items: [
        { b: "Necessários", t: "essenciais pro site funcionar. Não pedem consentimento porque servem exatamente o serviço que você pediu ao abrir a página." },
        { b: "Funcionalidade", t: "lembram preferências de uso." },
        { b: "Analíticos", t: "medem como as páginas são usadas, pra entender o que funciona." },
        { b: "Publicidade", t: "usados por parceiros de anúncio pra medir e direcionar campanhas." },
      ],
      note: `Cookies necessários ficam sempre ativos. Os outros três só são ativados se você autorizar no banner de cookies — e você pode revogar essa autorização a qualquer momento clicando no botão "Cookies" fixado no canto da tela.`,
    },
    s4: {
      h: "4. Cookies que usamos",
      cols: ["Cookie", "Categoria", "Finalidade", "Definido por", "Duração"],
      rows: [
        ["agilonex_cookie_consent", "Necessário", "Guarda sua escolha sobre cookies, pra não perguntar de novo a cada visita", "AgiloNex (próprio site)", "180 dias"],
        ["_ga", "Analítico", "Distingue visitantes únicos", "Google LLC (Google Analytics)", "2 anos (na prática, ~13 meses — a maioria dos navegadores limita a 400 dias)"],
        ["_ga_<container-id>", "Analítico", "Mantém o estado da sessão de navegação", "Google LLC (Google Analytics)", "2 anos"],
        ["_fbp", "Publicidade", "Identifica seu navegador entre visitas, pra medir e otimizar campanhas", "Meta Platforms, Inc. (Meta Pixel)", "90 dias"],
        ["_fbc", "Publicidade", "Associa o clique num anúncio do Facebook/Instagram à sua visita", "Meta Platforms, Inc. (Meta Pixel)", "90 dias"],
        ["__gads / __gpi", "Publicidade", "Medem performance dos anúncios do Google AdSense e evitam repetir o mesmo anúncio", "Google LLC (Google AdSense)", "13 meses"],
        ["IDE", "Publicidade", "Permite ao Google exibir anúncios personalizados com base em visitas anteriores a este e a outros sites", "Google LLC (Google AdSense / DoubleClick)", "13 meses"],
      ],
      footnote: "Ainda não usamos cookies de funcionalidade além do necessário. Se isso mudar — por exemplo, memorizar seu idioma preferido —, atualizamos esta tabela antes de ativar.",
    },
    s5: {
      h: "5. Pra onde seus dados vão",
      body: "Google Analytics, Meta Pixel e Google AdSense são operados por empresas americanas (Google LLC e Meta Platforms, Inc.), o que envolve transferência internacional de dados. Isso é permitido pela LGPD mediante as garantias e exigências do Art. 33. Se você não autorizar essas categorias no banner, esses scripts não carregam e nenhum dado é enviado a essas empresas por meio deles.\n\nO Google AdSense, como fornecedor terceirizado, usa cookies para exibir anúncios com base em visitas anteriores do usuário a este e a outros sites. Você pode desativar a publicidade personalizada em https://www.google.com/settings/ads e saber como o Google usa dados de sites parceiros em https://policies.google.com/technologies/partner-sites.",
    },
    s6: {
      h: "6. Como gerenciar sua escolha",
      body: `Clique no botão "Cookies" no canto da tela pra reabrir o painel e mudar sua escolha quando quiser — aceitar tudo, recusar tudo que não é essencial, ou escolher categoria por categoria. Também dá pra bloquear cookies direto nas configurações do seu navegador, mas isso é complementar: o controle principal é o painel do próprio site.`,
    },
    s7: {
      h: "7. Seus direitos",
      pre: "Como titular de dados pela LGPD, você pode confirmar a existência de tratamento, pedir acesso, correção, anonimização, eliminação ou portabilidade dos seus dados, e revogar consentimento a qualquer momento. Os detalhes completos de como exercer isso estão na nossa ",
      link: "Política de Privacidade",
      post: ".",
    },
    s8: { h: "8. Dúvidas", pre: "Fale com a gente em ", post: "." },
    s9: {
      h: "9. Mudanças nesta política",
      body: "Atualizamos esta política quando adicionamos ou removemos uma ferramenta que usa cookies. A data no topo mostra a última revisão.",
    },
  },
  en: {
    updatedLabel: "Last updated",
    title: "Cookie Policy",
    s1: {
      h: "1. About this policy",
      pre: "This policy explains how AgiloNex uses cookies and similar technologies on agilonex.com.br, and how you control that. It complements our ",
      link: "Privacy Policy",
      post: " — for anything about how we handle personal data more broadly, that's the primary reference.",
    },
    s2: {
      h: "2. What a cookie is",
      body: "A cookie is a small text file a site saves in your browser to remember information between visits or between pages — like a temporary tag stuck to your browser. Some disappear when you close the browser; others stay saved for a set period.",
    },
    s3: {
      h: "3. How we group the cookies we use",
      items: [
        { b: "Necessary", t: "essential for the site to work. They don't ask for consent because they serve exactly the service you requested by opening the page." },
        { b: "Functionality", t: "remember usage preferences." },
        { b: "Analytics", t: "measure how pages are used, to understand what works." },
        { b: "Advertising", t: "used by ad partners to measure and target campaigns." },
      ],
      note: `Necessary cookies are always on. The other three only turn on if you authorize them in the cookie banner — and you can revoke that authorization anytime by clicking the "Cookies" button fixed in the corner of the screen.`,
    },
    s4: {
      h: "4. Cookies we use",
      cols: ["Cookie", "Category", "Purpose", "Set by", "Duration"],
      rows: [
        ["agilonex_cookie_consent", "Necessary", "Stores your cookie choice, so we don't ask again on every visit", "AgiloNex (own site)", "180 days"],
        ["_ga", "Analytics", "Distinguishes unique visitors", "Google LLC (Google Analytics)", "2 years (in practice, ~13 months — most browsers cap it at 400 days)"],
        ["_ga_<container-id>", "Analytics", "Keeps track of browsing session state", "Google LLC (Google Analytics)", "2 years"],
        ["_fbp", "Advertising", "Identifies your browser across visits, to measure and optimize campaigns", "Meta Platforms, Inc. (Meta Pixel)", "90 days"],
        ["_fbc", "Advertising", "Links a click on a Facebook/Instagram ad to your visit", "Meta Platforms, Inc. (Meta Pixel)", "90 days"],
        ["__gads / __gpi", "Advertising", "Measure performance of Google AdSense ads and avoid repeating the same ad", "Google LLC (Google AdSense)", "13 months"],
        ["IDE", "Advertising", "Lets Google show personalized ads based on previous visits to this and other sites", "Google LLC (Google AdSense / DoubleClick)", "13 months"],
      ],
      footnote: "We don't currently use functionality cookies beyond what's necessary. If that changes — for example, remembering your preferred language — we'll update this table before turning it on.",
    },
    s5: {
      h: "5. Where your data goes",
      body: "Google Analytics, Meta Pixel, and Google AdSense are operated by U.S. companies (Google LLC and Meta Platforms, Inc.), which involves an international data transfer. This is permitted under the LGPD subject to the safeguards and requirements of Art. 33. If you don't authorize these categories in the banner, those scripts don't load and no data is sent to those companies through them.\n\nGoogle AdSense, as a third-party vendor, uses cookies to display ads based on a user's previous visits to this and other sites. You can opt out of personalized advertising at https://www.google.com/settings/ads and learn how Google uses data from partner sites at https://policies.google.com/technologies/partner-sites.",
    },
    s6: {
      h: "6. How to manage your choice",
      body: `Click the "Cookies" button in the corner of the screen to reopen the panel and change your choice whenever you want — accept everything, reject everything non-essential, or choose category by category. You can also block cookies directly in your browser settings, but that's complementary: the main control is the site's own panel.`,
    },
    s7: {
      h: "7. Your rights",
      pre: "As a data subject under the LGPD, you can confirm whether processing exists, request access, correction, anonymization, deletion, or portability of your data, and revoke consent at any time. Full details on how to exercise this are in our ",
      link: "Privacy Policy",
      post: ".",
    },
    s8: { h: "8. Questions", pre: "Reach us at ", post: "." },
    s9: {
      h: "9. Changes to this policy",
      body: "We update this policy whenever we add or remove a tool that uses cookies. The date at the top shows the last revision.",
    },
  },
  es: {
    updatedLabel: "Última actualización",
    title: "Política de Cookies",
    s1: {
      h: "1. Sobre esta política",
      pre: "Esta política explica cómo AgiloNex usa cookies y tecnologías similares en el sitio agilonex.com.br, y cómo la controlas. Complementa nuestra ",
      link: "Política de Privacidad",
      post: " — para cualquier duda sobre cómo tratamos los datos personales de forma más amplia, esa es la referencia principal.",
    },
    s2: {
      h: "2. Qué es una cookie",
      body: "Una cookie es un pequeño archivo de texto que un sitio guarda en tu navegador para recordar información entre visitas o entre páginas — como una etiqueta temporal pegada a tu navegador. Algunas desaparecen cuando cierras el navegador; otras quedan guardadas por un tiempo definido.",
    },
    s3: {
      h: "3. Cómo agrupamos las cookies que usamos",
      items: [
        { b: "Necesarias", t: "esenciales para que el sitio funcione. No piden consentimiento porque sirven exactamente el servicio que pediste al abrir la página." },
        { b: "Funcionalidad", t: "recuerdan preferencias de uso." },
        { b: "Analíticas", t: "miden cómo se usan las páginas, para entender qué funciona." },
        { b: "Publicidad", t: "usadas por socios publicitarios para medir y dirigir campañas." },
      ],
      note: `Las cookies necesarias siempre están activas. Las otras tres solo se activan si las autorizas en el banner de cookies — y puedes revocar esa autorización en cualquier momento haciendo clic en el botón "Cookies" fijado en la esquina de la pantalla.`,
    },
    s4: {
      h: "4. Cookies que usamos",
      cols: ["Cookie", "Categoría", "Finalidad", "Definida por", "Duración"],
      rows: [
        ["agilonex_cookie_consent", "Necesaria", "Guarda tu elección sobre cookies, para no preguntar de nuevo en cada visita", "AgiloNex (sitio propio)", "180 días"],
        ["_ga", "Analítica", "Distingue visitantes únicos", "Google LLC (Google Analytics)", "2 años (en la práctica, ~13 meses — la mayoría de los navegadores lo limitan a 400 días)"],
        ["_ga_<container-id>", "Analítica", "Mantiene el estado de la sesión de navegación", "Google LLC (Google Analytics)", "2 años"],
        ["_fbp", "Publicidad", "Identifica tu navegador entre visitas, para medir y optimizar campañas", "Meta Platforms, Inc. (Meta Pixel)", "90 días"],
        ["_fbc", "Publicidad", "Asocia el clic en un anuncio de Facebook/Instagram a tu visita", "Meta Platforms, Inc. (Meta Pixel)", "90 días"],
        ["__gads / __gpi", "Publicidad", "Miden el rendimiento de los anuncios de Google AdSense y evitan repetir el mismo anuncio", "Google LLC (Google AdSense)", "13 meses"],
        ["IDE", "Publicidad", "Permite a Google mostrar anuncios personalizados según visitas anteriores a este y a otros sitios", "Google LLC (Google AdSense / DoubleClick)", "13 meses"],
      ],
      footnote: "Todavía no usamos cookies de funcionalidad más allá de lo necesario. Si eso cambia — por ejemplo, recordar tu idioma preferido —, actualizamos esta tabla antes de activarlo.",
    },
    s5: {
      h: "5. A dónde van tus datos",
      body: "Google Analytics, Meta Pixel y Google AdSense son operados por empresas estadounidenses (Google LLC y Meta Platforms, Inc.), lo que implica una transferencia internacional de datos. Esto está permitido por la LGPD según las garantías y exigencias del Art. 33. Si no autorizas esas categorías en el banner, esos scripts no se cargan y no se envía ningún dato a esas empresas a través de ellos.\n\nGoogle AdSense, como proveedor externo, usa cookies para mostrar anuncios según las visitas anteriores del usuario a este y a otros sitios. Puedes desactivar la publicidad personalizada en https://www.google.com/settings/ads y conocer cómo Google usa datos de sitios socios en https://policies.google.com/technologies/partner-sites.",
    },
    s6: {
      h: "6. Cómo gestionar tu elección",
      body: `Haz clic en el botón "Cookies" en la esquina de la pantalla para reabrir el panel y cambiar tu elección cuando quieras — aceptar todo, rechazar todo lo no esencial, o elegir categoría por categoría. También puedes bloquear cookies directamente en la configuración de tu navegador, pero eso es complementario: el control principal es el panel del propio sitio.`,
    },
    s7: {
      h: "7. Tus derechos",
      pre: "Como titular de datos bajo la LGPD, puedes confirmar si existe tratamiento, pedir acceso, corrección, anonimización, eliminación o portabilidad de tus datos, y revocar el consentimiento en cualquier momento. Los detalles completos de cómo ejercer esto están en nuestra ",
      link: "Política de Privacidad",
      post: ".",
    },
    s8: { h: "8. Dudas", pre: "Escríbenos a ", post: "." },
    s9: {
      h: "9. Cambios en esta política",
      body: "Actualizamos esta política cuando agregamos o quitamos una herramienta que usa cookies. La fecha en la parte superior muestra la última revisión.",
    },
  },
} as const;

const Cookies = () => {
  const { language, languagePath, t } = useLanguage();
  useSEO({
    title: "Política de Cookies",
    description: "Como a AgiloNex usa cookies e tecnologias semelhantes, e como você controla isso.",
    canonical: `${BASE_URL}${languagePath("politica-de-cookies")}`,
    lang: language,
    schema: legalPageSchema(language, "politica-de-cookies", "Política de Cookies"),
  });
  const copy = content[language] ?? content.pt;
  const updated = LAST_UPDATED[language] ?? LAST_UPDATED.pt;
  const privacyPolicyPath = languagePath("lgpd");

  return (
    <main className="min-h-screen bg-background py-20 md:py-28">
      <article className="container max-w-4xl text-foreground">
        <p className="text-sm text-muted-foreground mb-2">
          {copy.updatedLabel}: {updated}
        </p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground normal-case mb-8">
          {copy.title}
        </h1>

        <Section title={copy.s1.h}>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {copy.s1.pre}
            <Link to={privacyPolicyPath} className="text-primary hover:underline">
              {copy.s1.link}
            </Link>
            {copy.s1.post}
          </p>
        </Section>

        <Section title={copy.s2.h}>
          <p className="text-sm leading-relaxed text-muted-foreground">{copy.s2.body}</p>
        </Section>

        <Section title={copy.s3.h}>
          <ul className="space-y-2 list-disc pl-5 text-sm leading-relaxed text-muted-foreground">
            {copy.s3.items.map((item) => (
              <li key={item.b}>
                <strong className="text-foreground">{item.b}</strong> — {item.t}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy.s3.note}</p>
        </Section>

        <Section title={copy.s4.h}>
          <div className="overflow-x-auto rounded-[20px] border border-border/70 bg-card/90">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  {copy.s4.cols.map((c) => (
                    <th key={c} className="py-3 px-4 font-semibold text-foreground">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {copy.s4.rows.map((row) => (
                  <tr key={row[0]} className="border-b border-border/70 align-top">
                    <td className="py-3 px-4 font-mono text-xs text-foreground">{row[0]}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row[1]}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row[2]}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row[3]}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{copy.s4.footnote}</p>
        </Section>

        <Section title={copy.s5.h}>
          <p className="text-sm leading-relaxed text-muted-foreground">{copy.s5.body}</p>
        </Section>

        <Section title={copy.s6.h}>
          <p className="text-sm leading-relaxed text-muted-foreground">{copy.s6.body}</p>
        </Section>

        <Section title={copy.s7.h}>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {copy.s7.pre}
            <Link to={privacyPolicyPath} className="text-primary hover:underline">
              {copy.s7.link}
            </Link>
            {copy.s7.post}
          </p>
        </Section>

        <Section title={copy.s8.h}>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {copy.s8.pre}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
              {CONTACT_EMAIL}
            </a>
            {copy.s8.post}
          </p>
        </Section>

        <Section title={copy.s9.h}>
          <p className="text-sm leading-relaxed text-muted-foreground">{copy.s9.body}</p>
        </Section>

        <Link
          to={languagePath()}
          className="mt-8 inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
        >
          {t.footer.backHome}
        </Link>
      </article>
    </main>
  );
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold tracking-tight text-foreground normal-case mb-3">{title}</h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

export default Cookies;
