/**
 * Fonte centralizada de posts do blog da AgiloNex.
 *
 * Cada post é multilíngue (pt/en/es) e tipa o conteúdo como blocos
 * estruturados (heading/paragraph/list/code), evitando dependência de
 * um parser de Markdown em runtime. Para adicionar um novo post, basta
 * adicionar um objeto ao array `posts` abaixo — todas as rotas, a
 * listagem do blog e o sitemap se ajustam automaticamente.
 */

export type PostBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; cite?: string };

export type Localized<T> = { pt: T; en: T; es: T };

export interface Post {
  slug: string;
  /** Data ISO (YYYY-MM-DD) — usada para ordenação, sitemap e exibição. */
  publishedAt: string;
  /** Tempo médio de leitura em minutos. */
  readingMinutes: number;
  /** Categorias/tags para agrupar posts no futuro. */
  tags: string[];
  author: {
    name: string;
    /** Mini-bio curta exibida no rodapé do post (reforça E-E-A-T). */
    bio: Localized<string>;
    /** Opcional: link para reforçar credibilidade. */
    url?: string;
  };
  /** Título (H1) por idioma. */
  title: Localized<string>;
  /** Resumo curto para a listagem e meta description. */
  excerpt: Localized<string>;
  /** Conteúdo principal como blocos estruturados por idioma. */
  content: Localized<PostBlock[]>;
}

const agilonexAuthor: Post["author"] = {
  name: "Gabriel Luiz Silva Espírito Santo",
  url: "https://agilonex.com.br/sobre",
  bio: {
    pt: "Fundador e responsável técnico da AgiloNex. Atua há alguns anos conectando pequenos negócios a tecnologia: já automatizou atendimentos por WhatsApp, integrou IA em sites de escritórios de advocacia e publicou projetos web publicados em produção.",
    en: "Founder and technical lead at AgiloNex. For the past few years he has been connecting small businesses to technology: automating WhatsApp service, integrating AI into law firm websites, and shipping web projects to production.",
    es: "Fundador y responsable técnico de AgiloNex. Desde hace algunos años conecta pequeños negocios con tecnología: ha automatizado atenciones por WhatsApp, integrado IA en sitios de despachos de abogados y publicado proyectos web en producción.",
  },
};

export const posts: Post[] = [
  {
    slug: "o-que-e-a-agilonex",
    publishedAt: "2026-08-07",
    readingMinutes: 7,
    tags: ["agilonex", "empresa", "automação", "apps", "tecnologia"],
    author: agilonexAuthor,
    title: {
      pt: "O que é a Agilonex: tecnologia, automação e apps que fazem o negócio avançar",
      en: "What is Agilonex: technology, automation, and apps that move businesses forward",
      es: "Qué es Agilonex: tecnología, automatización y apps que hacen avanzar al negocio",
    },
    excerpt: {
      pt: "Conheça a AgiloNex — uma empresa completa de tecnologia, automação e desenvolvimento de apps criada para transformar a realidade de pequenos negócios, empreendedores e startups em soluções digitais práticas.",
      en: "Meet Agilonex — a full-service technology, automation, and app development company built to turn the reality of small businesses, entrepreneurs, and startups into practical digital solutions.",
      es: "Conoce Agilonex — una empresa completa de tecnología, automatización y desarrollo de apps creada para transformar la realidad de pequeños negocios, emprendedores y startups en soluciones digitales prácticas.",
    },
    content: {
      pt: [
        { type: "paragraph", text: "Pequenos negócios não precisam de menos tecnologia — precisam de tecnologia feita para a sua realidade. Esse é o ponto de partida da Agilonex, uma empresa completa de tecnologia, automação e desenvolvimento de apps, com sede em Belo Horizonte e atuação remota para todo o Brasil e exterior." },
        { type: "paragraph", text: "Este post explica quem somos, o que fazemos, para quem fazemos e por que vale a pena começar uma conversa — mesmo que você ainda não saiba exatamente do que precisa." },

        { type: "heading", level: 2, text: "1. Quem é a Agilonex" },
        { type: "paragraph", text: "A Agilonex é uma empresa de tecnologia fundada e liderada tecnicamente por Gabriel Luiz Silva Espírito Santo. Nasceu de uma observação simples: pequenos negócios locais, empreendedores e startups têm as mesmas necessidades digitais que grandes empresas, mas sem orçamento, equipe e tempo parecidos. A solução não é servir uma versão capada do digital — é servir a tecnologia sob medida, enxuta e com bom custo-benefício." },
        { type: "paragraph", text: "Não somos uma agência tradicional burocrática. Também não somos uma fábrica de software genérica. Somos a parceira digital que conecta a sua ideia ao seu resultado, na duração que o pequeno negócio precisa: semanas, não trimestres." },

        { type: "heading", level: 2, text: "2. Para quem a Agilonex existe" },
        { type: "list", items: [
          "Pequenos negócios locais — salões, clínicas, restaurantes, barbearias, lojas — que precisam entrar no digital ou aprimorar a presença que já têm.",
          "Empreendedores locais que não podem se dar ao luxo de perder cliente pra concorrente só porque o atendimento demora numa resposta.",
          "Startups em crescimento que precisam de um parceiro técnico para liberar uma feature, lançar um app ou integrar IA sem contratar um time interno.",
          "Empresas que querem preparar suas equipes para usar inteligência artificial no trabalho de verdade, não só em palestras motivacionais.",
        ]},

        { type: "heading", level: 2, text: "3. O que a Agilonex faz" },
        { type: "paragraph", text: "Atuamos em três grandes frentes, todas ligadas por um princípio: a tecnologia precisa ajudar a faturar ou poupar tempo, não virar projeto de museum." },
        { type: "heading", level: 3, text: "3.1 Marketing digital com propósito" },
        { type: "paragraph", text: "Sites, landing pages, anúncios e presença online desenhados a partir de um objetivo de negócio, não a partir de tendência estética. O que importa é: o visitante entende o que você faz em 10 segundos e tem um caminho claro para falar com você? Se não, aí está o problema — não na cor do botão." },
        { type: "heading", level: 3, text: "3.2 Automação com IA" },
        { type: "paragraph", text: "Agentes no WhatsApp que atendem 24/7, respondem as dúvidas frequentes e transferem para você só o que realmente precisa de toque humano. Já aplicamos isso em barbearias, escritórios de advocacia e lojas. A meta não é substituir o dono: é devolver o tempo dele, enquanto o cliente novo não desiste esperando." },
        { type: "heading", level: 3, text: "3.3 Desenvolvimento de apps, sites e software" },
        { type: "paragraph", text: "Sites públicos, landing pages de campanha, sistemas internos (gestão, patrimônio, dashboards) e apps sob medida. Entregamos hospedados no Cloudflare — rápido, com HTTPS dobro de impacto, segurança e uptime — e você fica com a posse do código, sem amarra de plataforma." },

        { type: "heading", level: 2, text: "4. Por que a Agilonex é \"empresa completa\"" },
        { type: "paragraph", text: "Muita empresa de tecnologia faz só software ou só campanha. A Agilonex cobre o caminho inteiro, do diagnóstico estratégico à publicação do app em produção. Isso significa que se você disser \"quero mais clientes do bairro no WhatsApp\", não vai sobrar um buraco entre o site novo, o anúncio e o robô que atende a entrada." },
        { type: "quote", text: "Da ideia ao resultado: soluções digitais que fazem o negócio avançar.", cite: "A frase que resume todo trabalho da Agilonex" },

        { type: "heading", level: 2, text: "5. Provas em vez de promessas" },
        { type: "paragraph", text: "Em vez de uma claim genérica de \"mais de 200 projetos\", mostramos o que foi feito de verdade, com nome de projeto publicado: barbearia local com site e atendimento automático; apoio na marca e anúncios de uma quadra local; implementação de IA em sites de um escritório de advocacia e treinamento dos funcionários; e o sistema Patrimônio Hub, app de gestão patrimonial para empresários. Cada prova é acessível na página de Cases." },
        { type: "paragraph", text: "O que esperar de uma conversa com a gente: você descreve o problema, a gente tenda te mostrar se já resolvemos parecido ou, se não resolvemos, te dizemos com sinceridade que não é a nossa praia. Não vendemos o que não conseguimos entregar." },

        { type: "heading", level: 2, text: "6. Como é começar com a Agilonex" },
        { type: "list", items: [
          "Você manda um WhatsApp contando o problema ou a ideia — sem precisar vir com briefing formatado.",
          "A gente responde em até um dia útil com uma primeira leitura: qual caminho técnico faz sentido, que estimativa e como se parece a próxima conversa.",
          "Se fizer sentido, fazemos um diagnóstico gratuito e desenhamos a primeira entrega — usualmente algo publicável em 7 dias úteis para você sentir a parceria antes de um contrato longo.",
          "Durante todo o projeto, você acompanha pelo celular. Sem portal caprichado de status, sem planilhas complexas: o que você precisa está no ar.",
        ]},

        { type: "heading", level: 2, text: "7. Quem está por trás — e por que isso importa" },
        { type: "paragraph", text: "A Agilonex é conduzida tecnicamente por Gabriel Luiz Silva Espírito Santo, supervisor direto de todos os projetos. O nome aparece também como Encarregado de Dados (DPO) na nossa Política de Privacidade, porque o tratamento dos dados do seu cliente é uma responsabilidade séria — pasada de mão a mão com um nome, não atrelada a uma abstração corporativa. Esse tipo de cuidado é a diferença entre um site que qualquer template de resolveria e uma parceria que entende o seu negócio." },

        { type: "heading", level: 2, text: "8. Conversar não compromete nada" },
        { type: "paragraph", text: "A maneira mais simples de entender se a Agilonex serve para o seu caso é conversar. Mandamos um diagnóstico gratuito no WhatsApp, sem compromisso, em até 7 dias úteis. Se na conversa ficar claro que você precisa de algo fora do nosso alcance, a gente te ajuda a achar quem faça melhor." },
        { type: "quote", text: "Tecnologia que resolve, não que complica.", cite: "Princípio da Agilonex" },
        { type: "paragraph", text: "Se isso descreve o que você procura, fale com a gente pelo WhatsApp ou explore os cases publicados. A próxima conversa é só mandar a primeira mensagem." },
      ],
      en: [
        { type: "paragraph", text: "Small businesses don't need less technology — they need technology built for their reality. That's the starting point of Agilonex, a full-service technology, automation, and app development company based in Belo Horizonte and working remotely across Brazil and abroad." },
        { type: "paragraph", text: "This post explains who we are, what we do, who we do it for, and why it's worth starting a conversation — even if you don't yet know exactly what you need." },

        { type: "heading", level: 2, text: "1. Who Agilonex is" },
        { type: "paragraph", text: "Agilonex is a technology company founded and technically led by Gabriel Luiz Silva Espírito Santo. It grew out of a simple observation: local small businesses, entrepreneurs, and startups have the same digital needs as large companies, but without comparable budget, team, or time. The answer isn't a watered-down version of digital — it's tailored technology, lean and cost-effective." },
        { type: "paragraph", text: "We're not a traditional bureaucratic agency, nor a generic software factory. We're the digital partner that connects your idea to your result, in the timeframe a small business actually has: weeks, not quarters." },

        { type: "heading", level: 2, text: "2. Who Agilonex exists for" },
        { type: "list", items: [
          "Local small businesses — salons, clinics, restaurants, barbershops, shops — that need to go digital or sharpen the presence they already have.",
          "Local entrepreneurs who can't afford to lose a customer to a competitor just because their reply took too long.",
          "Growing startups that need a technical partner to ship a feature, launch an app, or integrate AI without hiring an in-house team.",
          "Companies that want to prepare their teams to actually use AI at work — not just in motivational talks.",
        ]},

        { type: "heading", level: 2, text: "3. What Agilonex does" },
        { type: "paragraph", text: "We work across three main fronts, all connected by one principle: technology must help you earn revenue or save time, not turn into a museum project." },
        { type: "heading", level: 3, text: "3.1 Purposeful digital marketing" },
        { type: "paragraph", text: "Websites, landing pages, ads, and online presence designed from a business goal, not from aesthetic trends. What matters: does the visitor understand what you do in 10 seconds and have a clear path to talk to you? If not, that's the problem — not the button color." },
        { type: "heading", level: 3, text: "3.2 AI automation" },
        { type: "paragraph", text: "WhatsApp agents that serve customers 24/7, answer frequent questions, and only escalate to you what truly needs a human. We've applied this in barbershops, law firms, and shops. The goal isn't to replace the owner: it's to return their time, while the new customer doesn't give up waiting." },
        { type: "heading", level: 3, text: "3.3 App, website, and software development" },
        { type: "paragraph", text: "Public sites, campaign landing pages, internal systems (management, asset tracking, dashboards), and custom apps. Delivered hosted on Cloudflare — fast, with HTTPS, security, and uptime — and you keep ownership of the code, no platform lock-in." },

        { type: "heading", level: 2, text: "4. Why Agilonex is a \"complete\" company" },
        { type: "paragraph", text: "Many tech companies do only software, or only campaigns. Agilonex covers the whole path, from strategic diagnosis to shipping the app to production. So if you say \"I want more customers from my neighborhood on WhatsApp,\" there's no gap left between the new site, the ad, and the bot that handles the inbound." },
        { type: "quote", text: "From idea to result: digital solutions that move the business forward.", cite: "The phrase that sums up all of Agilonex's work" },

        { type: "heading", level: 2, text: "5. Proof instead of promises" },
        { type: "paragraph", text: "Instead of a generic \"over 200 projects\" claim, we show what's actually been built, with published project names: a local barbershop with a site and automated service; brand and ad support for a local sports court; AI integrated into law firm websites and staff training; and Patrimônio Hub, an asset management app for business owners. Each proof is on the Cases page." },
        { type: "paragraph", text: "What to expect from a chat with us: you describe the problem, we try to show whether we've solved something similar, or — if we haven't — we honestly tell you it's not our fit. We don't sell what we can't deliver." },

        { type: "heading", level: 2, text: "6. What starting with Agilonex looks like" },
        { type: "list", items: [
          "You send a WhatsApp telling us the problem or the idea — no formal briefing required.",
          "We reply within one business day with a first read: which technical path makes sense, a rough estimate, and what the next conversation looks like.",
          "If it makes sense, we run a free diagnosis and design the first delivery — usually something shippable in 7 business days, so you feel the partnership before any long contract.",
          "Throughout the project, you follow along on your phone. No fancy status portal, no complex spreadsheets: what you need goes live.",
        ]},

        { type: "heading", level: 2, text: "7. Who's behind it — and why it matters" },
        { type: "paragraph", text: "Agilonex is technically run by Gabriel Luiz Silva Espírito Santo, direct supervisor of all projects. His name also appears as Data Protection Officer (DPO) in our Privacy Policy — because how your customer's data is treated is a serious responsibility, handed off with a name, not to a corporate abstraction. This kind of care is the difference between a site that any template could have produced and a partnership that understands your business." },

        { type: "heading", level: 2, text: "8. Talking commits you to nothing" },
        { type: "paragraph", text: "The simplest way to find out whether Agilonex fits your case is to talk. We send a free diagnosis over WhatsApp, no obligation, within 7 business days. If it turns out you need something outside our scope, we'll help you find someone better suited." },
        { type: "quote", text: "Technology that solves, not that complicates.", cite: "Agilonex principle" },
        { type: "paragraph", text: "If this describes what you're after, talk to us on WhatsApp or explore the published cases. The next step is just sending the first message." },
      ],
      es: [
        { type: "paragraph", text: "Los pequeños negocios no necesitan menos tecnología — necesitan tecnología hecha para su realidad. Ese es el punto de partida de Agilonex, una empresa completa de tecnología, automatización y desarrollo de apps, con sede en Belo Horizonte y actuación remota para todo Brasil y el exterior." },
        { type: "paragraph", text: "Este artículo explica quiénes somos, qué hacemos, para quién lo hacemos y por qué vale la pena iniciar una conversación — incluso si todavía no sabes exactamente qué necesitas." },

        { type: "heading", level: 2, text: "1. Quién es Agilonex" },
        { type: "paragraph", text: "Agilonex es una empresa de tecnología fundada y liderada técnicamente por Gabriel Luiz Silva Espírito Santo. Nació de una observación simple: los pequeños negocios locales, los emprendedores y las startups tienen las mismas necesidades digitales que las grandes empresas, pero sin un presupuesto, equipo y tiempo parecidos. La solución no es servir una versión recortada de lo digital — es servir tecnología a medida, ágil y con buena relación coste-beneficio." },
        { type: "paragraph", text: "No somos una agencia tradicional burocrática. Tampoco una fábrica de software genérica. Somos el socio digital que conecta tu idea con tu resultado, en el plazo que el pequeño negocio necesita: semanas, no trimestres." },

        { type: "heading", level: 2, text: "2. Para quién existe Agilonex" },
        { type: "list", items: [
          "Pequeños negocios locales — salones, clínicas, restaurantes, barberías, tiendas — que necesitan entrar en lo digital o afinar la presencia que ya tienen.",
          "Emprendedores locales que no pueden permitirse perder un cliente por un competidor solo porque la respuesta tarda.",
          "Startups en crecimiento que necesitan un socio técnico para liberar una feature, lanzar una app o integrar IA sin contratar un equipo interno.",
          "Empresas que quieren preparar a sus equipos para usar inteligencia artificial en el trabajo de verdad, no solo en charlas motivacionales.",
        ]},

        { type: "heading", level: 2, text: "3. Qué hace Agilonex" },
        { type: "paragraph", text: "Actuamos en tres grandes frentes, todos conectados por un principio: la tecnología tiene que ayudar a facturar o ahorrar tiempo, no volverse un proyecto de museo." },
        { type: "heading", level: 3, text: "3.1 Marketing digital con propósito" },
        { type: "paragraph", text: "Sitios, landing pages, anuncios y presencia online diseñados a partir de un objetivo de negocio, no a partir de tendencia estética. Lo que importa es: ¿el visitante entiende lo que haces en 10 segundos y tiene un camino claro para hablar contigo? Si no, ahí está el problema — no en el color del botón." },
        { type: "heading", level: 3, text: "3.2 Automatización con IA" },
        { type: "paragraph", text: "Agentes en WhatsApp que atienden 24/7, responden las dudas frecuentes y solo te escalan lo que de verdad necesita toque humano. Ya lo aplicamos en barberías, despachos de abogados y tiendas. El objetivo no es sustituir al dueño: es devolverle el tiempo, mientras el cliente nuevo no se rinde esperando." },
        { type: "heading", level: 3, text: "3.3 Desarrollo de apps, sitios y software" },
        { type: "paragraph", text: "Sitios públicos, landing pages de campaña, sistemas internos (gestión, patrimonio, dashboards) y apps a medida. Los entregamos hospedados en Cloudflare — rápidos, con HTTPS, seguridad y uptime — y tú te quedas con la posesión del código, sin amarre de plataforma." },

        { type: "heading", level: 2, text: "4. Por qué Agilonex es una \"empresa completa\"" },
        { type: "paragraph", text: "Muchas empresas de tecnología solo hacen software, o solo hacen campaña. Agilonex cubre el camino completo, desde el diagnóstico estratégico hasta la publicación del app en producción. Así que si dices \"quiero más clientes del barrio en WhatsApp\", no va a quedar un hueco entre el sitio nuevo, el anuncio y el bot que atiende la entrada." },
        { type: "quote", text: "De la idea al resultado: soluciones digitales que hacen avanzar al negocio.", cite: "La frase que resume todo el trabajo de Agilonex" },

        { type: "heading", level: 2, text: "5. Pruebas en vez de promesas" },
        { type: "paragraph", text: "En lugar de un claim genérico de \"más de 200 proyectos\", mostramos lo que se ha hecho de verdad, con nombre de proyecto publicado: una barbería local con sitio y atención automática; apoyo de marca y anuncios para una cancha deportiva local; IA integrada en sitios de un despacho de abogados y formación de los empleados; y el sistema Patrimônio Hub, app de gestión patrimonial para empresarios. Cada prueba está en la página de Cases." },
        { type: "paragraph", text: "Qué esperar de una charla con nosotros: describes el problema, nosotros intentamos mostrarte si ya resolvimos algo parecido o, si no, te decimos con sinceridad que no es nuestro fuerte. No vendemos lo que no conseguimos entregar." },

        { type: "heading", level: 2, text: "6. Cómo es empezar con Agilonex" },
        { type: "list", items: [
          "Mandas un WhatsApp contando el problema o la idea — sin necesidad de briefing formateado.",
          "Respondemos en un día útil con una primera lectura: qué camino técnico tiene sentido, un estimado y cómo sería la próxima conversación.",
          "Si tiene sentido, hacemos un diagnóstico gratuito y diseñamos la primera entrega — normalmente algo publicable en 7 días útiles para que sientas la sociedad antes de un contrato largo.",
          "Durante todo el proyecto, sigues todo por el móvil. Sin portal caprichoso de estado, sin hojas complejas: lo que necesitabas está en el aire.",
        ]},

        { type: "heading", level: 2, text: "7. Quién está detrás — y por qué importa" },
        { type: "paragraph", text: "Agilonex está conducida técnicamente por Gabriel Luiz Silva Espírito Santo, supervisor directo de todos los proyectos. Su nombre también aparece como Encargado de Datos (DPO) en nuestra Política de Privacidad, porque el tratamiento de los datos de tu cliente es una responsabilidad seria — pasada mano a mano con un nombre, no atada a una abstracción corporativa. Ese tipo de cuidado es la diferencia entre un sitio que cualquier template podría resolver y una sociedad que entiende tu negocio." },

        { type: "heading", level: 2, text: "8. Hablar no compromete a nada" },
        { type: "paragraph", text: "La forma más simple de entender si Agilonex encaja en tu caso es conversar. Mandamos un diagnóstico gratuito por WhatsApp, sin compromiso, en hasta 7 días útiles. Si en la conversación queda claro que necesitas algo fuera de nuestro alcance, te ayudamos a encontrar quien lo haga mejor." },
        { type: "quote", text: "Tecnología que resuelve, no que complica.", cite: "Principio de Agilonex" },
        { type: "paragraph", text: "Si esto describe lo que buscas, habla con nosotros por WhatsApp o explora los cases publicados. La próxima conversación es solo mandar el primer mensaje." },
      ],
    },
  },
];

export const getPostBySlug = (slug: string): Post | undefined =>
  posts.find((post) => post.slug === slug);

export const getPostsSorted = (): Post[] =>
  [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const formatDate = (iso: string, lang: "pt" | "en" | "es"): string => {
  const date = new Date(`${iso}T00:00:00`);
  const localeMap = { pt: "pt-BR", en: "en-US", es: "es-ES" } as const;
  return date.toLocaleDateString(localeMap[lang], {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
