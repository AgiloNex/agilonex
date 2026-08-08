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

import { founder } from "@/lib/identity";

const agilonexAuthor: Post["author"] = {
  name: founder.fullName,
  url: "https://agilonex.com.br/sobre",
  bio: founder.bio,
};

export const posts: Post[] = [
  {
    slug: "engenharia-de-software-digital",
    publishedAt: "2026-08-08",
    readingMinutes: 9,
    tags: ["engenharia", "software", "tecnologia", "experiencia", "conceitos"],
    author: agilonexAuthor,
    title: {
      pt: "Engenharia de Software Digital: experiência, técnicas e ferramentas do mercado para entregar projetos de sucesso",
      en: "Digital Software Engineering: experience, techniques and tools of the market to deliver successful projects",
      es: "Ingeniería de software digital: experiencia, técnicas y herramientas del mercado para entregar proyectos de éxito",
    },
    excerpt: {
      pt: "Não basta ter técnica — precisa ter visão. Aqui compartilhamos a experiência da Agilonex com as principais técnicas e ferramentas do mercado para entregar projetos que geram resultado. Descubra como a gente trabalha na prática.",
      en: "It's not just about having technique — you need vision. Here we share Agilonex's experience with the main techniques and tools in the market to deliver successful projects. Discover how we work in practice.",
      es: "No basta con la técnica — se necesita visión. Aquí compartimos la experiencia de Agilonex con las principales técnicas y herramientas del mercado para entregar proyectos exitosos. Descubra cómo trabajamos en la práctica.",
    },
    content: {
      pt: [
        { type: "paragraph", text: "Desenvolvimento de software é uma disciplina que exige mais do que saber programar. Envolve planejamento estratégico, solução de problemas complexos, gestão de tempo e uma visão clara sobre o que o cliente realmente precisa. Na Agilonex, combinamos experiência técnica com práticas comprovadas do mercado para entregar projetos que realmente fazem o negócio avançar." },
        { type: "heading", level: 2, text: "1. Nossa metodologia de engenharia de software" },
        { type: "paragraph", text: "Nossa abordagem não segue apenas uma linha de código — ela é construída sobre metodologias comprovadas. Trabalhamos com práticas ágeis, como o Scrum, que nos permite iterar rapidamente e entregar valor de forma contínua. Essa visão garante que cada etapa do projeto tenha um objetivo claro e que os resultados sejam mensuráveis." },
        { type: "paragraph", text: "Além das práticas ágeis, investimos em um planejamento robusto que abrange desde a investigação do problema até a entrega do produto final. Essa metodologia nos permite entender o contexto do negócio do cliente desde o início, evitando desvios e garantindo que o resultado final atenda às demandas reais." },
        { type: "heading", level: 2, text: "2. Principais técnicas do mercado em que utilizamos" },
        { type: "list", items: [
          "Desenvolvimento Orientado a Serviços (SaaS): utilizamos a arquitetura orientada a serviços para criar soluções escaláveis e robustas, onde cada componente pode ser evoluído independentemente.",
          "Desenvolvimento Full-Stack: integramos front-end e back-end de forma coesa, garantindo uma experiência de usuário unificada e eficiente.",
          "Arquitetura Baseada em Microsserviços: para projetos grandes, adotamos arquiteturas em microsserviços que permitem escalar componentes conforme a demanda.",
          "Desenvolvimento com IA e Automação: utilizamos inteligência artificial para automatizar processos repetitivos e melhorar a experiência do usuário, desde chatbots até recomendações personalizadas.",
          "Testes Automatizados: implementamos testes unitários, de integração e end-to-end que garantem a qualidade do código antes da entrega final.",
        ]},
        { type: "heading", level: 2, text: "3. Ferramentas do mercado que utilizamos para entregar projetos" },
        { type: "list", items: [
          "Plataformas de Desenvolvimento: utilizamos frameworks modernos como React, Angular, Next.js e Vue.js para criar interfaces de qualidade e responsivas.",
          "Hospedagem e Infraestrutura: trabalhamos com Cloudflare, AWS e Azure para garantir alta disponibilidade, segurança e performance.",
          "Ferramentas de CI/CD: implementamos pipelines de integração e entrega contínuas (CI/CD) que automatizam testes, build e deploy.",
          "Ferramentas de Gestão de Projetos: utilizamos Jira, Notion e Asana para organizar o trabalho, cronogramas e comunicação entre a equipe e o cliente.",
          "Monitoramento e Analytics: implementamos ferramentas como Datadog, Google Analytics e Mixpanel para acompanhar o desempenho do projeto e tomar decisões baseadas em dados.",
          "Ferramentas de API: trabalhamos com REST, GraphQL e gRPC para garantir comunicação eficiente entre sistemas e integrações com terceiros.",
        ]},
        { type: "heading", level: 2, text: "4. Por que a Agilonex entrega projetos de sucesso" },
        { type: "paragraph", text: "O que diferencia nossa abordagem é a combinação de experiência técnica com uma visão centrada no cliente. Nunca entregamos soluções técnicas sem compreender o contexto do negócio, sem entender as dores do cliente e sem garantir que o resultado final entregue é realmente valorizável." },
        { type: "paragraph", text: "Cada projeto é construído com base em um diagnóstico profundo, no qual identificamos as necessidades reais, estabelecemos metas claras e projetamos uma solução que se adapta ao tempo e orçamento do cliente. Nossa abordagem prioriza a qualidade, a entrega no prazo e a transparência — porque, para nós, software é uma ferramenta para o negócio, não um fim em si mesmo." },
        { type: "quote", text: "Tecnologia que resolve problemas reais gera resultados duradouros.", cite: "A filosofia da Agilonex" },
        { type: "heading", level: 2, text: "5. O caminho da Agilonex" },
        { type: "paragraph", text: "Iniciar uma parceria com a Agilonex é simples e direto: você manda um WhatsApp, nós respondemos com um diagnóstico rápido e começamos a trabalhar juntos. Cada projeto segue um processo claro, desde o entendimento do problema até a entrega do produto final, com acompanhamento transparente e feedback contínuo." },
        { type: "paragraph", text: "Não precisam ser grandes empresas — pequenos negócios, empreendedores e startups de qualquer porte podem contar com a Agilonex para transformar suas ideias em soluções digitais práticas, eficientes e efetivas. A tecnologia é nossa ferramenta e a nossa meta é sempre que o seu negócio avance com ela." },
      ],
      en: [
        { type: "paragraph", text: "Software development is a discipline that demands more than just knowing how to code. It involves strategic planning, complex problem solving, time management, and a clear vision about what the client really needs. At Agilonex, we combine technical experience with proven market practices to deliver projects that truly move the business forward." },
        { type: "heading", level: 2, text: "1. Our software engineering methodology" },
        { type: "paragraph", text: "Our approach doesn't just follow a single code path — it's built on proven methodologies. We work with agile practices like Scrum, which allows us to iterate quickly and deliver value continuously. This vision ensures every project stage has a clear objective and that results are measurable." },
        { type: "paragraph", text: "Beyond agile practices, we invest in robust planning that covers everything from problem investigation to final product delivery. This methodology allows us to understand the client's business context from the start, avoiding deviations and ensuring the final result meets the client's real demands." },
        { type: "heading", level: 2, text: "2. Key market techniques we use" },
        { type: "list", items: [
          "Service-Oriented Development (SaaS): we use service-oriented architecture to create scalable and robust solutions where each component can evolve independently.",
          "Full-Stack Development: we integrate front-end and back-end in a cohesive way, ensuring a unified and efficient user experience.",
          "Microservices Architecture: for larger projects, we adopt microservices architecture that allows scaling components according to demand.",
          "AI and Automation Development: we use artificial intelligence to automate repetitive processes and improve the user experience, from chatbots to personalized recommendations.",
          "Automated Testing: we implement unit tests, integration tests, and end-to-end tests that guarantee code quality before final delivery.",
        ]},
        { type: "heading", level: 2, text: "3. Market tools we use to deliver projects" },
        { type: "list", items: [
          "Development Platforms: we use modern frameworks like React, Angular, Next.js and Vue.js to create quality and responsive interfaces.",
          "Hosting and Infrastructure: we work with Cloudflare, AWS and Azure to ensure high availability, security and performance.",
          "CI/CD Tools: we implement continuous integration and delivery pipelines that automate tests, build and deployment.",
          "Project Management Tools: we use Jira, Notion and Asana to organize work, schedules and communication between the team and the client.",
          "Monitoring and Analytics: we implement tools like Datadog, Google Analytics and Mixpanel to track project performance and make data-driven decisions.",
          "API Tools: we work with REST, GraphQL and gRPC to ensure efficient communication between systems and integrations with third parties.",
        ]},
        { type: "heading", level: 2, text: "4. Why Agilonex delivers successful projects" },
        { type: "paragraph", text: "What sets our approach apart is the combination of technical experience with a client-focused vision. We never deliver technical solutions without understanding the client's context, without understanding the client's pains and without guaranteeing that the final delivered result is truly valuable." },
        { type: "paragraph", text: "Every project is built on a deep diagnosis, where we identify the real needs, set clear goals and design a solution that adapts to the client's time and budget. Our approach prioritizes quality, on-time delivery and transparency — because, for us, software is a tool for the business, not an end in itself." },
        { type: "quote", text: "Technology that solves real problems generates lasting results.", cite: "The philosophy of Agilonex" },
         { type: "heading", level: 2, text: "5. Our path" },
         { type: "paragraph", text: "Starting a partnership with Agilonex is simple and direct: you send a WhatsApp, we reply with a quick diagnosis and we begin working together. Every project follows a clear process, from understanding the problem to delivering the final product, with transparent follow-up and continuous feedback." },
         { type: "paragraph", text: "We don't need to be large companies — small businesses, entrepreneurs and startups of any size can count on Agilonex to transform their ideas into practical, efficient and effective digital solutions. Technology is our tool and our goal is always that your business advances with it." },
       ],
       es: [
         { type: "paragraph", text: "El desarrollo de software es una disciplina que exige más que saber programar. Implica planificación estratégica, resolución de problemas complejos, gestión del tiempo y una visión clara de lo que el cliente realmente necesita. En Agilonex combinamos experiencia técnica con prácticas probadas del mercado para entregar proyectos que realmente hacen avanzar al negocio." },
         { type: "heading", level: 2, text: "1. Nuestra metodología de ingeniería de software" },
         { type: "paragraph", text: "Nuestro enfoque no sigue solo una línea de código — está construido sobre metodologías probadas. Trabajamos con prácticas ágiles, como Scrum, que nos permiten iterar rápidamente y entregar valor de forma continua. Esta visión garantiza que cada etapa del proyecto tenga un objetivo claro y que los resultados sean medibles." },
         { type: "paragraph", text: "Además de las prácticas ágiles, invertimos en una planificación robusta que abarca desde la investigación del problema hasta la entrega del producto final. Esta metodología nos permite entender el contexto del negocio del cliente desde el principio, evitando desvíos y garantizando que el resultado final atienda las demandas reales." },
         { type: "heading", level: 2, text: "2. Principales técnicas del mercado que utilizamos" },
         { type: "list", items: [
           "Desarrollo Orientado a Servicios (SaaS): utilizamos la arquitectura orientada a servicios para crear soluciones escalables y robustas, donde cada componente puede evolucionar de forma independiente.",
           "Desarrollo Full-Stack: integramos front-end y back-end de forma cohesionada, garantizando una experiencia de usuario unificada y eficiente.",
           "Arquitectura Basada en Microservicios: para proyectos grandes, adoptamos arquitecturas de microservicios que permiten escalar componentes según la demanda.",
           "Desarrollo con IA y Automatización: utilizamos inteligencia artificial para automatizar procesos repetitivos y mejorar la experiencia del usuario, desde chatbots hasta recomendaciones personalizadas.",
           "Pruebas Automatizadas: implementamos pruebas unitarias, de integración y de extremo a extremo (end-to-end) que garantizan la calidad del código antes de la entrega final.",
         ]},
         { type: "heading", level: 2, text: "3. Herramientas del mercado que utilizamos para entregar proyectos" },
         { type: "list", items: [
           "Plataformas de Desarrollo: utilizamos frameworks modernos como React, Angular, Next.js y Vue.js para crear interfaces de calidad y responsivas.",
           "Hospedaje e Infraestructura: trabajamos con Cloudflare, AWS y Azure para garantizar alta disponibilidad, seguridad y rendimiento.",
           "Herramientas de CI/CD: implementamos pipelines de integración y entrega continua (CI/CD) que automatizan pruebas, build y deploy.",
           "Herramientas de Gestión de Proyectos: utilizamos Jira, Notion y Asana para organizar el trabajo, los cronogramas y la comunicación entre el equipo y el cliente.",
           "Monitoreo y Analítica: implementamos herramientas como Datadog, Google Analytics y Mixpanel para dar seguimiento al rendimiento del proyecto y tomar decisiones basadas en datos.",
           "Herramientas de API: trabajamos con REST, GraphQL y gRPC para garantizar una comunicación eficiente entre sistemas e integraciones con terceros.",
         ]},
         { type: "heading", level: 2, text: "4. Por qué Agilonex entrega proyectos de éxito" },
         { type: "paragraph", text: "Lo que diferencia nuestro enfoque es la combinación de experiencia técnica con una visión centrada en el cliente. Nunca entregamos soluciones técnicas sin comprender el contexto del negocio, sin entender los dolores del cliente y sin garantizar que el resultado final entregado sea realmente valioso." },
         { type: "paragraph", text: "Cada proyecto se construye sobre un diagnóstico profundo, en el que identificamos las necesidades reales, establecemos metas claras y diseñamos una solución que se adapta al tiempo y presupuesto del cliente. Nuestro enfoque prioriza la calidad, la entrega a tiempo y la transparencia — porque, para nosotros, el software es una herramienta para el negocio, no un fin en sí mismo." },
         { type: "quote", text: "La tecnología que resuelve problemas reales genera resultados duraderos.", cite: "La filosofía de Agilonex" },
         { type: "heading", level: 2, text: "5. El camino de Agilonex" },
         { type: "paragraph", text: "Iniciar una sociedad con Agilonex es simple y directo: envías un WhatsApp, respondemos con un diagnóstico rápido y empezamos a trabajar juntos. Cada proyecto sigue un proceso claro, desde el entendimiento del problema hasta la entrega del producto final, con seguimiento transparente y feedback continuo." },
         { type: "paragraph", text: "No hace falta ser grandes empresas — pequeños negocios, emprendedores y startups de cualquier tamaño pueden contar con Agilonex para transformar sus ideas en soluciones digitales prácticas, eficientes y efectivas. La tecnología es nuestra herramienta y nuestra meta es siempre que tu negocio avance con ella." },
       ],
     },
   },
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
  {
    slug: "por-que-confiar-na-agilonex",
    publishedAt: "2026-08-07",
    readingMinutes: 6,
    tags: ["confiança", "atendimento", "preço acessível", "parceria"],
    author: agilonexAuthor,
    title: {
      pt: "Por que confiar na Agilonex: conversa, entendimento e preço acessível",
      en: "Why trust Agilonex: conversation, understanding, and an affordable price",
      es: "Por qué confiar en Agilonex: conversación, entendimiento y precio accesible",
    },
    excerpt: {
      pt: "Confiança não se decreta — se constrói. Na Agilonex a gente conversa com a pessoa, busca entender o que o negócio precisa de verdade e cobra um preço acessível. Este post explica como isso vira prática.",
      en: "Trust isn't declared — it's built. At Agilonex we talk with the person, try to truly understand what the business needs, and charge an affordable price. This post explains how that works in practice.",
      es: "La confianza no se decreta — se construye. En Agilonex hablamos con la persona, buscamos entender de verdad lo que el negocio necesita y cobramos un precio accesible. Este artículo explica cómo eso se vuelve práctica.",
    },
    content: {
      pt: [
        { type: "paragraph", text: "Quem nunca pagou por um serviço de tecnologia e se arrependeu? É uma pergunta retórica — quase todo dono de pequeno negócio já passou por isso. Pagou caro, demorou, e quando veio não era bem o que ele tinha pedido. Por causa disso, a primeira barreira com qualquer nova empresa de tecnologia não é técnica. É a confiança." },
        { type: "paragraph", text: "Este post é pra você entender, antes de qualquer contrato, por que dá pra confiar na Agilonex. A resposta curta é: a gente conversa com a pessoa, busca entender o que o negócio precisa de fato, e cobra um preço acessível. A resposta longa está abaixo — sem maquiagem." },

        { type: "heading", level: 2, text: "1. A gente conversa com a pessoa, não com um briefing" },
        { type: "paragraph", text: "Muita empresa começa o atendimento pedindo pra você preencher um formulário enorme antes de falar com qualquer humano. Na Agilonex é ao contrário: você manda um WhatsApp contando a ideia do seu jeito, com as palavras que você usa no dia a dia, e a primeira resposta é nossa — em até um dia útil, com gente de verdade — não um robô de triagem." },
        { type: "paragraph", text: "Isso significa que você pode falar \"quero mais cliente do bairro no WhatsApp\" sem saber se isso é marketing, automação ou site. A nossa função é traduzir o que você quer em solução técnica, não cobrar de você o vocabulário certo." },
        { type: "quote", text: "Tecnologia que resolve, não que complica.", cite: "Princípio da Agilonex" },

        { type: "heading", level: 2, text: "2. Buscamos entender o que o negócio precisa de verdade" },
        { type: "paragraph", text: "Entender o problema do cliente parece óbvio. Mas, no mercado de tecnologia, é raro. O comum é vender a mesma solução pra todo mundo, sem diferenciar uma barbearia de uma clínica ou um e-commerce de uma prestadora de serviço." },
        { type: "paragraph", text: "Na Agilonex a primeira pergunta não é \"qual plano você quer?\", é \"qual dor você tá sentindo?\". A partir daí faremos um diagnóstico gratuito, em até 7 dias úteis, com nome no papel: o que faz sentido fazer primeiro, o que pode esperar, e — sobretudo — o que não vale o seu dinheiro agora." },
        { type: "list", items: [
          "Se o seu problema for atendimento que demora pra responder no WhatsApp, a solução é automação com IA, não necessariamente um site novo.",
          "Se o problema é que o cliente entra no site e não entende o que você faz, a solução é refazer a comunicação da home, não uma campanha de anúncios.",
          "Se o problema é que você perde agendamento por vacilo manual, a solução é um fluxo simples de WhatsApp + calendário, não uma plataforma cheia de recursos que você nunca vai usar.",
        ]},
        { type: "paragraph", text: "Esse jeito de fazer diagnóstico vem de uma convicção: tecnologia que não resolve dor não é tecnologia — é despesa. Melhor não vender nada do que vender a coisa errada para o seu caso." },

        { type: "heading", level: 2, text: "3. Preço acessível não é preço baixo qualquer" },
        { type: "paragraph", text: "Pequeno negócio não pode pagar preço de grande empresa. Mas também não pode aceitar preço tão baixo que desconfie. Por isso, o ponto da Agilonex não é ser a \"opção mais barata\" — é ser a opção com preço acessível que você entende. Antes de fechar qualquer projeto, a gente mostra pra você:" },
        { type: "list", items: [
          "O que está incluso e o que não está (não tem surpresa de \"ah, isso é croposta\")",
          "Quanto custa em moeda, não em \"unidades de trabalho abstratas\"",
          "Qual o tempo estimado de entrega — com um intervalo honesto e não uma fantasia pra fechar a venda",
          "O que é de você e o que é da gente: o código, a hospedagem, o domínio — tudo em nome da empresa, sem amarras de plataforma",
        ]},
        { type: "paragraph", text: "A meta é que o preço faça sentido sem você precisar consultar outro dessenvolvedor pra saber se foi justo. Transparência é mais barata do que gente imagina." },

        { type: "heading", level: 2, text: "4. Por que dá pra cobrar acessível sem ser ruim" },
        { type: "paragraph", text: "Uma dúvida comum: \"se é tão acessível assim, o serviço tem que ser ruim\". Não tem. Acontece que muito do preço alto no mercado de tecnologia vem de três coisas que não pesam na operação real:" },
        { type: "list", items: [
          "Equipes pequenas com estrutura corporativa grande — a agência paga sala, diretoria em três camadas, jargão — e você paga por isso no preço.",
          "Cobrança por hora em vez de por resultado — quanto mais lento, mais faturado.",
          "Ferramentas e ERPs internos complicados que encarecem tudo só porque o processo da agência é travado.",
        ]},
        { type: "paragraph", text: "A Agilonex é enxuta por opção. Não tem diretoria em camadas, não tem processo interno pesado, não tem ferramenta cara que você paga indireto. O que você paga cobre um humano competente, a ferramenta necessária, e uma margem justa. Isso vira preço acessível sem ser ruim." },

        { type: "heading", level: 2, text: "5. Provas que você pode verificar" },
        { type: "paragraph", text: "Confiança na conversa é importante, mas nada substitui trabalho publicado. A Agilonex não esconde nada: uma barbearia local com site e atendimento automático, um sistema de gestão de patrimônio para empresários, e a integração de IA num escritório de advocacia com treinamento dos funcionários. Você consegue ver cada um desses projetos na página de Cases." },
        { type: "paragraph", text: "E, mais do que isso, o nome do responsável técnico não é uma abstração corporativa — é Gabriel Luiz Silva Espírito Santo, o mesmo nome que assina como Encarregado de Dados (DPO) na nossa Política de Privacidade. Quando a responsabilidade tem nome, fica mais fácil confiar." },

        { type: "heading", level: 2, text: "6. E se eu não souber o que preciso?" },
        { type: "paragraph", text: "Esse é o caso mais normal. A maioria dos donos de pequeno negócio não deveria precisar saber a diferença entre landing page, site institucional, funil, chatbot ou dashboard. Esse é o nosso trabalho. Você chega com a sensação de \"tô perdendo cliente pra concorrente na internet\" ou \"demoro demais pra responder mensagem\" — a gente converte isso em solução e te mostra o porquê da escolha." },
        { type: "paragraph", text: "Se na conversa ficar claro que você precisa de algo fora do nosso alcance — uma app mobile nativa muito complexa, por exemplo —, a gente te diz com sinceridade e te ajuda a encontrar quem faça melhor. Não vendemos o que não conseguimos entregar." },

        { type: "heading", level: 2, text: "7. Conversar não compromete nada" },
        { type: "paragraph", text: "Confiança se prova falando. Você não precisa comprar nada pra conversar com a Agilonex. Não tem cobrança por reunião de diagnóstico, não tem proposta escondida atrás de formulário. Você manda um WhatsApp, a gente responde. Se der certo a parceria, ótimo. Se não, você sai sabendo pelo menos o que faz sentido pro seu caso — sem pagar nada por isso." },
        { type: "quote", text: "Da ideia ao resultado: soluções digitais que fazem o negócio avançar.", cite: "A frase que resume todo trabalho da Agilonex" },
        { type: "paragraph", text: "Se isso te parece o jeito de trabalhar que você procura, manda um WhatsApp agora ou explorá os cases publicados pra ver com prova o que cada projeto entregou. A próxima confiança que você constrói é a primeira conversa." },
      ],
      en: [
        { type: "paragraph", text: "Who has never paid for a tech service and regretted it? It's a rhetorical question — almost every small business owner has been there. Paid a lot, it took long, and when it arrived it wasn't what they had asked for. Because of that, the first barrier with any new tech company isn't technical. It's trust." },
        { type: "paragraph", text: "This post is so you can understand, before any contract, why you can trust Agilonex. The short answer: we talk with the person, try to truly understand what the business needs, and charge an affordable price. The long answer is below — no sugar-coating." },

        { type: "heading", level: 2, text: "1. We talk with the person, not with a briefing" },
        { type: "paragraph", text: "Many companies start the engagement by asking you to fill out a long form before talking to a human. At Agilonex it's the opposite: you send a WhatsApp telling the idea your way, in the words you use every day, and the first reply is ours — within one business day, from a real person, not a triage bot." },
        { type: "paragraph", text: "It means you can say \"I want more customers from my neighborhood on WhatsApp\" without knowing whether that's marketing, automation, or a website. Our job is to translate what you want into a technical solution, not to bill you for the right vocabulary." },
        { type: "quote", text: "Technology that solves, not that complicates.", cite: "Agilonex principle" },

        { type: "heading", level: 2, text: "2. We try to truly understand what the business needs" },
        { type: "paragraph", text: "Understanding the client's problem seems obvious. But in the tech market, it's rare. The norm is to sell the same solution to everyone, without differentiating a barbershop from a clinic or an e-commerce from a service provider." },
        { type: "paragraph", text: "At Agilonex the first question isn't \"which plan do you want?\" — it's \"what pain are you feeling?\". From there we run a free diagnosis, within 7 business days, with names on paper: what makes sense to do first, what can wait, and — above all — what isn't worth your money right now." },
        { type: "list", items: [
          "If your problem is slow replies on WhatsApp, the solution is AI automation — not necessarily a new site.",
          "If the problem is the visitor not understanding what you do, the solution is reworking your homepage messaging — not an ad campaign.",
          "If the problem is losing bookings to manual slip-ups, the solution is a simple WhatsApp + calendar flow — not a platform full of features you'll never use.",
        ]},
        { type: "paragraph", text: "This way of doing diagnosis comes from a conviction: technology that doesn't solve pain isn't technology — it's an expense. Better not to sell anything than to sell the wrong thing for your case." },

        { type: "heading", level: 2, text: "3. Affordable price isn't just any low price" },
        { type: "paragraph", text: "A small business can't pay large-company prices. But it also can't accept a price so low it makes you suspicious. So Agilonex's point isn't to be the \"cheapest option\" — it's to be the option with an affordable price you can understand. Before any project is confirmed, we show you:" },
        { type: "list", items: [
          "What's included and what isn't (no surprise \"ah, that's an extra\")",
          "The cost in money, not in \"abstract work units\"",
          "The estimated delivery time — with an honest range, not a fantasy to close the sale",
          "What's yours and what's ours: the code, hosting, domain — everything in the company's name, no platform lock-in",
        ]},
        { type: "paragraph", text: "The goal is for the price to make sense without you needing to consult another developer to know if it was fair. Transparency is cheaper than people imagine." },

        { type: "heading", level: 2, text: "4. Why we can charge affordably without being bad" },
        { type: "paragraph", text: "A common doubt: \"if it's so affordable, the service must be bad\". It isn't. What happens is that much of the high pricing in the tech market comes from three things that don't weigh on actual operations:" },
        { type: "list", items: [
          "Small teams with big corporate structure — the agency pays for office, three layers of directors, jargon — and you pay for it in the price.",
          "Hourly billing instead of outcome — the slower, the more billed.",
          "Expensive internal tools and ERPs that bloat everything just because the agency's own process is stuck.",
        ]},
        { type: "paragraph", text: "Agilonex is lean by choice. No layered directors, no heavy internal process, no expensive tool you pay for indirectly. What you pay covers one competent human, the necessary tool, and a fair margin. That becomes an affordable price without being bad." },

        { type: "heading", level: 2, text: "5. Proof you can verify" },
        { type: "paragraph", text: "Trust in the conversation matters, but nothing replaces published work. Agilonex hides nothing: a local barbershop with a site and automated service, an asset management system for business owners, and AI integration in a law firm with staff training. You can see each of these projects on the Cases page." },
        { type: "paragraph", text: "And more than that, the technical lead's name isn't a corporate abstraction — it's Gabriel Luiz Silva Espírito Santo, the same name signed as Data Protection Officer (DPO) in our Privacy Policy. When responsibility has a name, it's easier to trust." },

        { type: "heading", level: 2, text: "6. What if I don't know what I need?" },
        { type: "paragraph", text: "That's the most normal case. Most small business owners shouldn't have to know the difference between a landing page, an institutional site, a funnel, a chatbot, or a dashboard. That's our job. You arrive with the feeling \"I'm losing customers to the competitor online\" or \"it takes me too long to reply to messages\" — we turn that into a solution and show you why we chose it." },
        { type: "paragraph", text: "If during the conversation it turns out you need something outside our scope — like a very complex native mobile app, for example — we honestly tell you and help you find someone better. We don't sell what we can't deliver." },

        { type: "heading", level: 2, text: "7. Talking commits you to nothing" },
        { type: "paragraph", text: "Trust is proven by talking. You don't have to buy anything to talk to Agilonex. There's no charge for a diagnosis meeting, no hidden proposal behind a form. You send a WhatsApp, we reply. If the partnership works out, great. If not, you leave at least knowing what makes sense for your case — without paying anything for it." },
        { type: "quote", text: "From idea to result: digital solutions that move the business forward.", cite: "The phrase that sums up all of Agilonex's work" },
        { type: "paragraph", text: "If this sounds like the way of working you're after, send a WhatsApp now or explore the published cases to see what each project delivered, with proof. The next trust you build is the first conversation." },
      ],
      es: [
        { type: "paragraph", text: "¿Quién nunca pagó por un servicio de tecnología y se arrepintió? Es una pregunta retórica — casi todo dueño de pequeño negocio ya pasó por eso. Pagó caro, tardó, y cuando llegó no era bien lo que había pedido. Por eso, la primera barrera con cualquier empresa nueva de tecnología no es técnica. Es la confianza." },
        { type: "paragraph", text: "Este artículo es para que entiendas, antes de cualquier contrato, por qué da para confiar en Agilonex. La respuesta corta: hablamos con la persona, buscamos entender de verdad lo que el negocio necesita y cobramos un precio accesible. La respuesta larga está abajo — sin maquillaje." },

        { type: "heading", level: 2, text: "1. Hablamos con la persona, no con un briefing" },
        { type: "paragraph", text: "Muchas empresas empiezan la atención pidiéndote rellenar un formulario enorme antes de hablar con cualquier humano. En Agilonex es al contrario: mandas un WhatsApp contando la idea a tu manera, con las palabras que usas en el día a día, y la primera respuesta es nuestra — en un día útil, con gente de verdad — no un bot de triaje." },
        { type: "paragraph", text: "Significa que puedes decir \"quiero más clientes del barrio en WhatsApp\" sin saber si eso es marketing, automatización o un sitio. Nuestra función es traducir lo que quieres en solución técnica, no cobrarte por el vocabulario correcto." },
        { type: "quote", text: "Tecnología que resuelve, no que complica.", cite: "Principio de Agilonex" },

        { type: "heading", level: 2, text: "2. Buscamos entender de verdad lo que el negocio necesita" },
        { type: "paragraph", text: "Entender el problema del cliente parece obvio. Pero en el mercado de tecnología, es raro. Lo común es vender la misma solución a todos, sin diferenciar una barbería de una clínica o un e-commerce de un prestador de servicios." },
        { type: "paragraph", text: "En Agilonex la primera pregunta no es \"¿qué plan quieres?\", es \"¿qué dolor estás sintiendo?\". Desde ahí hacemos un diagnóstico gratuito, en 7 días útiles, con nombres en el papel: qué conviene hacer primero, qué puede esperar, y — sobre todo — qué no vale tu dinero ahora." },
        { type: "list", items: [
          "Si tu problema es la atención que tarda en responder en WhatsApp, la solución es automatización con IA — no necesariamente un sitio nuevo.",
          "Si el problema es que el visitante no entiende lo que haces, la solución es rehacer la comunicación de la home — no una campaña de anuncios.",
          "Si el problema es que pierdes reservas por distracción manual, la solución es un flujo simple de WhatsApp + calendario — no una plataforma llena de features que jamás usarás.",
        ]},
        { type: "paragraph", text: "Esta forma de hacer diagnóstico viene de una convicción: la tecnología que no resuelve dolor no es tecnología — es gasto. Mejor no vender nada que vender lo equivocado para tu caso." },

        { type: "heading", level: 2, text: "3. Precio accesible no es cualquier precio bajo" },
        { type: "paragraph", text: "Un pequeño negocio no puede pagar precio de grande empresa. Pero tampoco puede aceptar un precio tan bajo que desconfíes. Por eso, el punto de Agilonex no es ser la \"opción más barata\" — es la opción con un precio accesible que entiendes. Antes de cerrar cualquier proyecto, te mostramos:" },
        { type: "list", items: [
          "Qué está incluido y qué no (sin sorpresas de \"ah, eso es extra\")",
          "Cuánto cuesta en moneda, no en \"unidades de trabajo abstractas\"",
          "Cuál es el tiempo estimado de entrega — con un intervalo honesto y no una fantasía para cerrar la venta",
          "Qué es tuyo y qué es nuestro: el código, el hospedaje, el dominio — todo a nombre de la empresa, sin amarre de plataforma",
        ]},
        { type: "paragraph", text: "La meta es que el precio tenga sentido sin que necesites consultar a otro desarrollador para saber si fue justo. La transparencia es más barata de lo que la gente imagina." },

        { type: "heading", level: 2, text: "4. Por qué da para cobrar accesible sin ser malo" },
        { type: "paragraph", text: "Una duda común: \"si es tan accesible, el servicio tiene que ser malo\". No. Lo que pasa es que gran parte del precio alto en el mercado de tecnología viene de tres cosas que no pesan en la operación real:" },
        { type: "list", items: [
          "Equipos pequeños con estructura corporativa grande — la agencia paga oficina, dirección en tres capas, jerga — y tú pagas por eso en el precio.",
          "Cobro por hora en vez de por resultado — cuanto más lento, más se factura.",
          "Herramientas y ERPs internos caros que encarecen todo solo porque el proceso de la agencia está trabado.",
        ]},
        { type: "paragraph", text: "Agilonex es ágil por opción. No hay dirección en capas, no hay proceso interno pesado, no hay herramienta cara que pagues indirectamente. Lo que pagas cubre a un humano competente, la herramienta necesaria, y un margen justo. Eso se vuelve un precio accesible sin ser malo." },

        { type: "heading", level: 2, text: "5. Pruebas que puedes verificar" },
        { type: "paragraph", text: "La confianza en la conversación importa, pero nada reemplaza el trabajo publicado. Agilonex no esconde nada: una barbería local con sitio y atención automática, un sistema de gestión de patrimonio para empresarios, y la integración de IA en un despacho de abogados con formación de los empleados. Puedes ver cada uno de estos proyectos en la página de Cases." },
        { type: "paragraph", text: "Y, más que eso, el nombre del responsable técnico no es una abstracción corporativa — es Gabriel Luiz Silva Espírito Santo, el mismo nombre que firma como Encargado de Datos (DPO) en nuestra Política de Privacidad. Cuando la responsabilidad tiene nombre, es más fácil confiar." },

        { type: "heading", level: 2, text: "6. ¿Y si no sé qué necesito?" },
        { type: "paragraph", text: "Ese es el caso más normal. La mayoría de dueños de pequeños negocios no debería tener que saber la diferencia entre landing page, sitio institucional, funnel, chatbot o dashboard. Eso es nuestro trabajo. Llegas con la sensación \"estoy perdiendo clientes con el competidor online\" o \"tardo demasiado en responder mensajes\" — nosotros lo convertimos en solución y te mostramos el porqué de la elección." },
        { type: "paragraph", text: "Si en la conversación queda claro que necesitas algo fuera de nuestro alcance — una app móvil nativa muy compleja, por ejemplo —, te decimos con sinceridad y te ayudamos a encontrar quien lo haga mejor. No vendemos lo que no conseguimos entregar." },

        { type: "heading", level: 2, text: "7. Hablar no te compromete a nada" },
        { type: "paragraph", text: "La confianza se prueba hablando. No tienes que comprar nada para hablar con Agilonex. No hay cobro por reunión de diagnóstico, no hay propuesta escondida detrás de formulario. Mandas un WhatsApp, respondemos. Si funciona la sociedad, estupendo. Si no, sales al menos sabiendo qué tiene sentido para tu caso — sin pagar nada por eso." },
        { type: "quote", text: "De la idea al resultado: soluciones digitales que hacen avanzar al negocio.", cite: "La frase que resume todo el trabajo de Agilonex" },
        { type: "paragraph", text: "Si esto te parece la forma de trabajar que buscas, manda un WhatsApp ahora o explora los cases publicados para ver con prueba lo que entregó cada proyecto. La próxima confianza que construyes es la primera conversación." },
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
