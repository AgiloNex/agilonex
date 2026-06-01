export type Language = "pt" | "en" | "es";

export const translations = {
  pt: {
    nav: {
      about: "Sobre",
      services: "Serviços",
      how: "Como Funciona",
      portfolio: "Portfólio",
      pricing: "Planos",
      contact: "Contato",
      cta: "Fale Conosco",
    },
    hero: {
      title1: "Automatize, Integre e Proteja seu Negócio com",
      titleHighlight: "Tecnologia",
      subtitle:
        "Soluções em IA, sistemas e privacidade de dados para empresas que querem crescer com eficiência, não burocracia.",
      ctaWhats: "Fale comigo no WhatsApp",
      ctaServices: "Conheça os serviços",
      imgAlt: "Ilustração de tecnologia conectada",
    },
    about: {
      tag: "Sobre Nós",
      title: "Tecnologia que resolve, não que complica",
      subtitle:
        "A AgiloNex nasceu para tornar a tecnologia acessível e prática para empresas que querem crescer sem dor de cabeça.",
      items: [
        { title: "Foco em PMEs", text: "Entendemos os desafios de pequenas e médias empresas e criamos soluções que cabem na sua realidade." },
        { title: "Soluções Acessíveis", text: "Tecnologia de ponta sem custos exorbitantes. Resultados reais com investimento justo." },
        { title: "Abordagem Prática", text: "Sem complicação. Trabalhamos lado a lado com você para entregar o que realmente importa." },
      ],
    },
    services: {
      tag: "Serviços",
      title: "Soluções que impulsionam seu negócio",
      subtitle: "Do diagnóstico à entrega, cuidamos de tudo para que você foque no que importa: crescer. Também faço upscaling e melhoria de imagens para redes sociais, deixando suas artes e fotos mais nítidas e prontas para publicar.",
      learnMore: "Saiba mais",
      items: [
        {
          title: "Automação com IA",
          description: "Chatbots, atendimento automático e integrações inteligentes para escalar sua operação sem aumentar custos.",
          items: ["Chatbots personalizados", "Atendimento automático", "Integrações inteligentes"],
        },
        {
          title: "Integração de Sistemas",
          description: "Conectamos seus sistemas e automatizamos processos para eliminar retrabalho e ganhar produtividade.",
          items: ["APIs sob medida", "Automação de processos", "Conexão entre sistemas"],
        },
        {
          title: "Desenvolvimento para Nichos",
          description: "Sistemas personalizados e dashboards feitos sob medida para atender as necessidades específicas do seu negócio.",
          items: ["Sistemas personalizados", "Dashboards analíticos", "Soluções sob medida"],
        },
        {
          title: "LGPD e Privacidade",
          description: "Organize seus dados e fique em conformidade com a legislação. Termos de uso, políticas de privacidade e mais.",
          items: ["Termos de uso", "Políticas de privacidade", "Organização de dados"],
        },
        {
          title: "Upscaling e Melhoria de Imagens",
          description: "Faço upscaling, aumento de qualidade e refinamento de imagens para uso em redes sociais, anúncios e materiais digitais.",
          items: ["Imagens mais nítidas", "Prontas para redes sociais", "Melhoria de qualidade"],
        },
      ],
    },
    how: {
      tag: "Como Funciona",
      title: "Simples, direto e eficiente",
      steps: [
        { title: "Entendimento", text: "Analisamos seu negócio e identificamos onde a tecnologia pode gerar mais resultado." },
        { title: "Desenvolvimento", text: "Criamos a solução ideal com agilidade, mantendo você no controle de cada etapa." },
        { title: "Entrega e Suporte", text: "Implementamos, treinamos sua equipe e garantimos suporte contínuo." },
      ],
    },
    process: {
      tag: "Como Funciona",
      title: "Do primeiro contato ao agente no ar em 7 dias",
      subtitle: "Um processo simples, sem surpresas e sem você precisar entender de tecnologia",
      steps: [
        {
          icon: "🎯",
          label: "Passo 1",
          title: "Diagnóstico gratuito",
          description:
            "Você responde 5 perguntas sobre seu negócio pelo WhatsApp. Em menos de 15 minutos entendemos exatamente o que seu cliente pergunta todo dia.",
        },
        {
          icon: "⚙️",
          label: "Passo 2",
          title: "A gente configura tudo",
          description:
            "Nossa equipe monta e treina o agente com as informações do seu negócio. Você não precisa instalar nada, mexer em código ou contratar técnico.",
        },
        {
          icon: "🚀",
          label: "Passo 3",
          title: "Seu agente entra ao vivo",
          description:
            "Em até 7 dias úteis seu WhatsApp já está sendo atendido pela IA. Você acompanha tudo pelo celular e pode ajustar o que quiser.",
        },
        {
          icon: "📈",
          label: "Passo 4",
          title: "Você foca no que importa",
          description:
            "Menos mensagens repetitivas, menos tempo perdido, mais clientes atendidos fora do horário. Os resultados aparecem na primeira semana.",
        },
      ],
      cta: "Começar meu diagnóstico gratuito",
    },
    faq: {
      tag: "FAQ",
      title: "Dúvidas frequentes",
      subtitle: "Respostas diretas para as perguntas mais comuns",
      items: [
        {
          question: "Preciso de conhecimento técnico para usar?",
          answer:
            "Não. A gente configura tudo pra você em até 7 dias úteis. Você só precisa responder algumas perguntas sobre seu negócio. Depois disso, é só acompanhar os atendimentos pelo celular.",
        },
        {
          question: "E se o cliente fizer uma pergunta que o bot não sabe responder?",
          answer:
            "O agente reconhece quando não sabe e transfere automaticamente para você no WhatsApp, sem o cliente perceber a transição. Você nunca perde um atendimento.",
        },
        {
          question: "Tem fidelidade ou contrato longo?",
          answer:
            "Não. Nossos planos são mensais e você pode cancelar quando quiser, sem multa. Mas na prática, nossos clientes ficam porque os resultados aparecem rápido.",
        },
        {
          question: "Funciona para qualquer tipo de negócio?",
          answer:
            "Funciona para qualquer negócio que atende clientes pelo WhatsApp — salões, clínicas, lojas, restaurantes, prestadores de serviço. Se seu cliente te manda mensagem, a IA consegue ajudar.",
        },
        {
          question: "Quanto tempo leva para ver resultado?",
          answer:
            "A maioria dos clientes começa a perceber redução no volume de mensagens repetitivas ainda na primeira semana. Agendamentos automáticos e respostas fora do horário comercial são os primeiros ganhos visíveis.",
        },
        {
          question: "E a segurança dos dados dos meus clientes?",
          answer:
            "Todos os dados ficam protegidos seguindo as diretrizes da LGPD. Não compartilhamos informações com terceiros e você tem controle total sobre o que o agente armazena.",
        },
      ],
      cta: "Ainda tem dúvidas? Fale com a gente →",
    },
    roi: {
      tag: "Calculadora de ROI",
      title: "Quanto você está perdendo sem IA?",
      subtitle: "Calcule em 30 segundos o impacto real no seu negócio",
      labels: {
        messagesPerDay: "Quantas mensagens você recebe por dia no WhatsApp?",
        manualHours: "Quantas horas por dia você gasta respondendo manualmente?",
        ticketAverage: "Qual o ticket médio dos seus serviços/produtos? (R$)",
        conversionRate: "Qual sua taxa de conversão atual? (% de mensagens que viram clientes)",
      },
      stats: {
        revenueLost: "Receita perdida por mês",
        timeCost: "Custo do seu tempo por mês",
        totalLost: "Total que você perde mensalmente",
        netSavings: "Economia líquida com AgiloNex",
        payback: "Payback estimado",
        note: "* Estimativas baseadas em médias do mercado brasileiro. Resultados reais podem variar.",
        lowVolume: "Seu volume ainda é baixo, mas cada cliente perdido fora do horário já tem custo",
        planSavings: "Com {price}/mês você recupera {value} em potencial perdido",
      },
      cta: "Quero automatizar e parar de perder vendas",
    },
    contactSection: {
      tag: "Atendimento comercial",
      title: "Pronto para automatizar seu atendimento?",
      subtitle: "Preencha o formulário e nossa equipe entra em contato em até 1 hora no horário comercial.",
      cards: [
        { title: "Resposta rápida", text: "Fluxo pensado para captura imediata de leads locais." },
        { title: "Foco em conversão", text: "Contato direto pelo WhatsApp e rotina de atendimento comercial." },
      ],
      success: "Recebemos seu contato, {name}! Em breve nossa equipe vai te chamar no WhatsApp.",
      form: {
        name: "Nome completo",
        namePh: "Seu nome completo",
        whatsapp: "WhatsApp",
        segment: "Segmento do negócio",
        segmentPh: "Selecione uma opção",
        message: "Mensagem",
        messagePh: "Conte brevemente sobre seu negócio",
        submit: "Enviar contato",
        sending: "Enviando...",
      },
      direct: {
        title: "Contato direto",
        subtitle: "Use estes canais se preferir falar com a equipe sem preencher o formulário.",
        socials: "Redes sociais",
      },
      toast: "Ops, algo deu errado. Tente pelo WhatsApp diretamente.",
      toastAction: "Abrir WhatsApp",
      buttonWhatsapp: "Falar no WhatsApp",
    },
    benefits: {
      tag: "Benefícios",
      title: "Resultados reais para o seu negócio",
      items: [
        { title: "Economia de Tempo", text: "Automatize tarefas repetitivas e libere sua equipe para o que importa." },
        { title: "Redução de Erros", text: "Processos digitais eliminam falhas humanas e aumentam a precisão." },
        { title: "Mais Organização", text: "Sistemas integrados trazem clareza e controle para toda sua operação." },
        { title: "Segurança de Dados", text: "Proteja as informações do seu negócio e dos seus clientes com as melhores práticas." },
      ],
    },
    portfolio: {
      tag: "Portfólio & Laboratório",
      title: "Projetos que demonstram nosso trabalho",
      subtitle: "Conheça soluções reais que desenvolvemos para resolver problemas complexos com tecnologia acessível.",
      featuredLabel: "Solução em produção",
      featured: {
        name: "Agilo Milhas",
        title: "Plataforma de gestão e troca de milhas aéreas",
        description: "Uma das soluções da AgiloNex em produção: ajuda viajantes e empresas a maximizar o valor das suas milhas com transparência e inteligência.",
        cta: "Acessar plataforma",
      },
      projects: [
        {
          name: "Zenith Guardian",
          title: "Governança de Identidades & Sustentabilidade Digital",
          description: "Auditoria automatizada de identidades em nuvem com cálculo de pegada de carbono usando Python e Pandas.",
          cta: "Ver projeto",
          url: "https://lovable.dev/projects/904bf7f9-72ed-4eb2-8f69-354446279684",
        },
        {
          name: "IntelliTask",
          title: "Middleware de IA para Gestão de Prioridades",
          description: "Dashboard inteligente que categoriza urgência e impacto de tarefas usando LLMs e integração com Supabase.",
          cta: "Abrir demo",
          url: "https://task-ai-project.lovable.app",
        },
        {
          name: "Graceful Spaces",
          title: "Experiência Digital & Bem-estar",
          description: "Plataforma para gestão de espaços com foco em fluidez, organização e experiência do usuário.",
          cta: "Ver projeto",
          url: "https://lovable.dev/projects/eb7a9fd9-9b87-470a-991c-15d758fdde1d",
        },
      ],
    },
    pricing: {
      tag: "Planos",
      title: "Escolha o plano ideal para o seu momento",
      subtitle: "Comece pequeno, escale quando fizer sentido. Sem fidelidade, sem letra miúda.",
      anchorIntro: "O valor cheio do plano <strong>Enterprise</strong> é <strong>R$ 800/mês</strong>. Mas hoje você pode acessar o essencial do nosso método por uma fração desse valor.",
      plans: {
        anchor: {
          name: "Enterprise",
          subtitle: "Operação completa com squad dedicado",
          badge: "Completo",
          price: "800",
          period: "/mês",
          features: [
            "Squad dedicado de IA + integrações",
            "Sistema sob medida e dashboards",
            "Adequação LGPD completa",
            "SLA prioritário e canal direto",
            "Onboarding presencial",
          ],
          cta: "Saiba mais",
        },
        main: {
          name: "Essencial AgiloNex",
          subtitle: "Automação pronta para o seu negócio crescer",
          badge: "Melhor Escolha",
          oldPrice: "800",
          price: "397",
          period: "/mês",
          savings: "Economia de R$ 403/mês em relação ao Enterprise",
          features: [
            "Automação com IA configurada",
            "1 integração-chave incluída",
            "Dashboard analítico",
            "Treinamento da sua equipe",
            "Suporte incluso enquanto assinante",
          ],
          cta: "Quero agora",
        },
        basic: {
          name: "Starter",
          subtitle: "Para validar a primeira automação",
          price: "250",
          period: "/mês",
          features: [
            "1 chatbot OU automação simples",
            "Implementação em até 7 dias",
            "Suporte por chat",
            "7 dias de garantia",
          ],
          cta: "Começar",
        },
      },
      trust: {
        secure: "Compra segura",
        guarantee: "7 dias de garantia",
        support: "Suporte incluso enquanto assinante",
      },
    },
    cta: {
      title: "Pronto para melhorar seu negócio?",
      subtitle: "Converse com a gente e descubra como a tecnologia pode transformar sua operação de forma simples e acessível.",
      whats: "WhatsApp",
      quote: "Solicitar orçamento",
    },
    contact: {
      tag: "Contato",
      title: "Vamos conversar?",
      subtitle: "Preencha o formulário ou fale diretamente pelo WhatsApp. Respondemos em até 24 horas.",
      whats: "Falar no WhatsApp",
      name: "Nome",
      namePh: "Seu nome",
      email: "Email",
      emailPh: "Seu e-mail",
      message: "Mensagem",
      messagePh: "Como podemos ajudar?",
      send: "Enviar mensagem",
      sending: "Enviando...",
      success: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
    },
    footer: {
      rights: "Todos os direitos reservados.",
    },
    lang: {
      label: "Idioma",
      pt: "Português",
      en: "English",
      es: "Español",
    },
  },
  en: {
    nav: {
      about: "About",
      services: "Services",
      how: "How It Works",
      portfolio: "Portfolio",
      pricing: "Pricing",
      contact: "Contact",
      cta: "Talk to Us",
    },
    hero: {
      title1: "Automate, Integrate and Protect your Business with",
      titleHighlight: "Technology",
      subtitle:
        "AI, systems and data privacy solutions for businesses that want to grow with efficiency, not bureaucracy.",
      ctaWhats: "Chat on WhatsApp",
      ctaServices: "Explore services",
      imgAlt: "Illustration of connected technology",
    },
    about: {
      tag: "About Us",
      title: "Technology that solves, not complicates",
      subtitle:
        "AgiloNex was born to make technology accessible and practical for companies that want to grow without headaches.",
      items: [
        { title: "SMB Focused", text: "We understand the challenges of small and medium businesses and create solutions that fit your reality." },
        { title: "Affordable Solutions", text: "Cutting-edge technology without exorbitant costs. Real results with fair investment." },
        { title: "Practical Approach", text: "No complications. We work side by side with you to deliver what really matters." },
      ],
    },
    services: {
      tag: "Services",
      title: "Solutions that drive your business",
      subtitle: "From diagnosis to delivery, we handle everything so you can focus on what matters: growing. I also offer image upscaling and enhancement for social media, making your visuals sharper and ready to post.",
      learnMore: "Learn more",
      items: [
        {
          title: "AI Automation",
          description: "Chatbots, automatic service and intelligent integrations to scale operations without raising costs.",
          items: ["Custom chatbots", "Automatic service", "Smart integrations"],
        },
        {
          title: "Systems Integration",
          description: "We connect your systems and automate processes to eliminate rework and gain productivity.",
          items: ["Custom APIs", "Process automation", "System connections"],
        },
        {
          title: "Niche Development",
          description: "Custom systems and dashboards built to fit the specific needs of your business.",
          items: ["Custom systems", "Analytics dashboards", "Tailored solutions"],
        },
        {
          title: "Data Privacy & GDPR",
          description: "Organize your data and stay compliant with regulations. Terms of use, privacy policies and more.",
          items: ["Terms of use", "Privacy policies", "Data organization"],
        },
        {
          title: "Image Upscaling & Enhancement",
          description: "I upscale and improve images for social media, ads and digital materials so they look cleaner and more professional.",
          items: ["Sharper images", "Ready for social media", "Quality enhancement"],
        },
      ],
    },
    how: {
      tag: "How It Works",
      title: "Simple, direct and effective",
      steps: [
        { title: "Understanding", text: "We analyze your business and identify where technology can deliver the most results." },
        { title: "Development", text: "We create the ideal solution with agility, keeping you in control of every step." },
        { title: "Delivery & Support", text: "We deploy, train your team and ensure ongoing support." },
      ],
    },
    process: {
      tag: "How It Works",
      title: "From first contact to live agent in 7 days",
      subtitle: "A simple process, without surprises and without needing to understand technology",
      steps: [
        {
          icon: "🎯",
          label: "Step 1",
          title: "Free diagnosis",
          description:
            "You answer 5 questions about your business on WhatsApp. In less than 15 minutes we understand exactly what your customers ask every day.",
        },
        {
          icon: "⚙️",
          label: "Step 2",
          title: "We set everything up",
          description:
            "Our team builds and trains the agent with your business information. You do not need to install anything, touch code or hire a technician.",
        },
        {
          icon: "🚀",
          label: "Step 3",
          title: "Your agent goes live",
          description:
            "Within 7 business days your WhatsApp is already being handled by AI. You can follow everything from your phone and adjust whatever you want.",
        },
        {
          icon: "📈",
          label: "Step 4",
          title: "You focus on what matters",
          description:
            "Fewer repetitive messages, less wasted time, more customers served outside business hours. Results show up in the first week.",
        },
      ],
      cta: "Start my free diagnosis",
    },
    faq: {
      tag: "FAQ",
      title: "Frequently asked questions",
      subtitle: "Straight answers to the most common questions",
      items: [
        {
          question: "Do I need technical knowledge to use it?",
          answer:
            "No. We set everything up for you in up to 7 business days. You only need to answer a few questions about your business. After that, just follow the conversations from your phone.",
        },
        {
          question: "What if the bot cannot answer a customer question?",
          answer:
            "The agent knows when it does not know and automatically transfers the conversation to you on WhatsApp, without the customer noticing the transition. You never lose a lead.",
        },
        {
          question: "Is there a lock-in or long contract?",
          answer:
            "No. Our plans are monthly and you can cancel whenever you want, without penalty. In practice, clients stay because the results come quickly.",
        },
        {
          question: "Does it work for any business type?",
          answer:
            "It works for any business that serves customers on WhatsApp, including salons, clinics, stores, restaurants and service providers. If your customer sends a message, AI can help.",
        },
        {
          question: "How long until I see results?",
          answer:
            "Most clients start noticing fewer repetitive messages in the first week. Automated bookings and after-hours replies are the first visible wins.",
        },
        {
          question: "What about my customers' data security?",
          answer:
            "All data is protected following LGPD guidelines. We do not share information with third parties and you keep full control over what the agent stores.",
        },
      ],
      cta: "Still have questions? Talk to us →",
    },
    roi: {
      tag: "ROI Calculator",
      title: "How much are you losing without AI?",
      subtitle: "Calculate the real impact on your business in 30 seconds",
      labels: {
        messagesPerDay: "How many WhatsApp messages do you receive per day?",
        manualHours: "How many hours per day do you spend answering manually?",
        ticketAverage: "What is your average service/product ticket? (R$)",
        conversionRate: "What is your current conversion rate? (% of messages that become customers)",
      },
      stats: {
        revenueLost: "Revenue lost per month",
        timeCost: "Your time cost per month",
        totalLost: "Total monthly loss",
        netSavings: "Net savings with AgiloNex",
        payback: "Estimated payback",
        note: "* Estimates are based on Brazilian market averages. Real results may vary.",
        lowVolume: "Your volume is still low, but every customer lost after hours already has a cost",
        planSavings: "With {price}/month you recover {value} in lost potential",
      },
      cta: "I want to automate and stop losing sales",
    },
    contactSection: {
      tag: "Commercial support",
      title: "Ready to automate your service?",
      subtitle: "Fill out the form and our team will contact you within 1 hour during business hours.",
      cards: [
        { title: "Fast response", text: "A flow designed for immediate local lead capture." },
        { title: "Conversion focused", text: "Direct WhatsApp contact and a sales-oriented follow-up routine." },
      ],
      success: "We received your contact, {name}! Our team will reach out on WhatsApp soon.",
      form: {
        name: "Full name",
        namePh: "Your full name",
        whatsapp: "WhatsApp",
        segment: "Business segment",
        segmentPh: "Select an option",
        message: "Message",
        messagePh: "Tell us briefly about your business",
        submit: "Send contact",
        sending: "Sending...",
      },
      direct: {
        title: "Direct contact",
        subtitle: "Use these channels if you prefer to talk to the team without filling out the form.",
        socials: "Social media",
      },
      toast: "Something went wrong. Please try WhatsApp directly.",
      toastAction: "Open WhatsApp",
      buttonWhatsapp: "Chat on WhatsApp",
    },
    benefits: {
      tag: "Benefits",
      title: "Real results for your business",
      items: [
        { title: "Time Savings", text: "Automate repetitive tasks and free your team for what matters." },
        { title: "Fewer Errors", text: "Digital processes eliminate human errors and increase precision." },
        { title: "More Organization", text: "Integrated systems bring clarity and control to your operation." },
        { title: "Data Security", text: "Protect your business and customer information with best practices." },
      ],
    },
    portfolio: {
      tag: "Portfolio & Lab",
      title: "Projects that showcase our work",
      subtitle: "Discover real solutions we built to solve complex problems with accessible technology.",
      featuredLabel: "Solution in production",
      featured: {
        name: "Agilo Milhas",
        title: "Airline miles management & exchange platform",
        description: "One of AgiloNex's production solutions: helps travelers and businesses maximize the value of their miles with transparency and intelligence.",
        cta: "Open platform",
      },
      projects: [
        {
          name: "Zenith Guardian",
          title: "Identity Governance & Digital Sustainability",
          description: "Automated cloud identity auditing with carbon footprint calculation using Python and Pandas.",
          cta: "View project",
          url: "https://lovable.dev/projects/904bf7f9-72ed-4eb2-8f69-354446279684",
        },
        {
          name: "IntelliTask",
          title: "AI Middleware for Priority Management",
          description: "Intelligent dashboard that categorizes urgency and task impact using LLMs and Supabase integration.",
          cta: "Open demo",
          url: "https://task-ai-project.lovable.app",
        },
        {
          name: "Graceful Spaces",
          title: "Digital Experience & Wellbeing",
          description: "Platform for managing spaces with focus on fluidity, organization and user experience.",
          cta: "View project",
          url: "https://lovable.dev/projects/eb7a9fd9-9b87-470a-991c-15d758fdde1d",
        },
      ],
    },
    pricing: {
      tag: "Pricing",
      title: "Choose the plan that fits your stage",
      subtitle: "Start small, scale when it makes sense. No lock-in, no fine print.",
      anchorIntro: "The full price of the <strong>Enterprise</strong> plan is <strong>R$ 800/mo</strong>. But today you can access the essentials of our method for a fraction of that.",
      plans: {
        anchor: {
          name: "Enterprise",
          subtitle: "Full operation with a dedicated squad",
          badge: "Complete",
          price: "800",
          period: "/mo",
          features: [
            "Dedicated AI + integrations squad",
            "Custom system and dashboards",
            "Full GDPR/LGPD compliance",
            "Priority SLA and direct channel",
            "On-site onboarding",
          ],
          cta: "Learn more",
        },
        main: {
          name: "AgiloNex Essential",
          subtitle: "Automation ready to grow your business",
          badge: "Best Choice",
          oldPrice: "800",
          price: "397",
          period: "/mo",
          savings: "Save R$ 403/mo compared to Enterprise",
          features: [
            "AI automation configured",
            "1 key integration included",
            "Analytics dashboard",
            "Team training",
            "Support included while subscribed",
          ],
          cta: "Get started",
        },
        basic: {
          name: "Starter",
          subtitle: "To validate your first automation",
          price: "250",
          period: "/mo",
          features: [
            "1 chatbot OR simple automation",
            "Delivered in up to 7 days",
            "Chat support",
            "7-day guarantee",
          ],
          cta: "Begin",
        },
      },
      trust: {
        secure: "Secure checkout",
        guarantee: "7-day guarantee",
        support: "Support included while subscribed",
      },
    },
    cta: {
      title: "Ready to improve your business?",
      subtitle: "Talk to us and discover how technology can transform your operation simply and affordably.",
      whats: "WhatsApp",
      quote: "Request a quote",
    },
    contact: {
      tag: "Contact",
      title: "Let's talk?",
      subtitle: "Fill out the form or chat directly on WhatsApp. We reply within 24 hours.",
      whats: "Chat on WhatsApp",
      name: "Name",
      namePh: "Your name",
      email: "Email",
      emailPh: "Your email",
      message: "Message",
      messagePh: "How can we help?",
      send: "Send message",
      sending: "Sending...",
      success: "Message sent successfully! We'll get back to you soon.",
    },
    footer: {
      rights: "All rights reserved.",
    },
    lang: {
      label: "Language",
      pt: "Português",
      en: "English",
      es: "Español",
    },
  },
  es: {
    nav: {
      about: "Sobre",
      services: "Servicios",
      how: "Cómo Funciona",
      portfolio: "Portafolio",
      pricing: "Planes",
      contact: "Contacto",
      cta: "Habla con Nosotros",
    },
    hero: {
      title1: "Automatiza, Integra y Protege tu Negocio con",
      titleHighlight: "Tecnología",
      subtitle:
        "Soluciones de IA, sistemas y privacidad de datos para empresas que quieren crecer con eficiencia, no burocracia.",
      ctaWhats: "Habla por WhatsApp",
      ctaServices: "Conoce los servicios",
      imgAlt: "Ilustración de tecnología conectada",
    },
    about: {
      tag: "Sobre Nosotros",
      title: "Tecnología que resuelve, no que complica",
      subtitle:
        "AgiloNex nació para hacer la tecnología accesible y práctica para empresas que quieren crecer sin dolores de cabeza.",
      items: [
        { title: "Foco en PYMEs", text: "Entendemos los desafíos de pequeñas y medianas empresas y creamos soluciones que se adaptan a tu realidad." },
        { title: "Soluciones Accesibles", text: "Tecnología de punta sin costos exorbitantes. Resultados reales con inversión justa." },
        { title: "Enfoque Práctico", text: "Sin complicaciones. Trabajamos contigo para entregar lo que realmente importa." },
      ],
    },
    services: {
      tag: "Servicios",
      title: "Soluciones que impulsan tu negocio",
      subtitle: "Del diagnóstico a la entrega, nos encargamos de todo para que te enfoques en lo importante: crecer. También hago upscaling y mejora de imágenes para redes sociales, dejando tus piezas visuales más nítidas y listas para publicar.",
      learnMore: "Saber más",
      items: [
        {
          title: "Automatización con IA",
          description: "Chatbots, atención automática e integraciones inteligentes para escalar tu operación sin aumentar costos.",
          items: ["Chatbots personalizados", "Atención automática", "Integraciones inteligentes"],
        },
        {
          title: "Integración de Sistemas",
          description: "Conectamos tus sistemas y automatizamos procesos para eliminar retrabajo y ganar productividad.",
          items: ["APIs a medida", "Automatización de procesos", "Conexión entre sistemas"],
        },
        {
          title: "Desarrollo para Nichos",
          description: "Sistemas personalizados y dashboards a medida para las necesidades específicas de tu negocio.",
          items: ["Sistemas personalizados", "Dashboards analíticos", "Soluciones a medida"],
        },
        {
          title: "Privacidad y RGPD",
          description: "Organiza tus datos y cumple con la legislación. Términos de uso, políticas de privacidad y más.",
          items: ["Términos de uso", "Políticas de privacidad", "Organización de datos"],
        },
        {
          title: "Upscaling y Mejora de Imágenes",
          description: "Hago upscaling y mejoro imágenes para redes sociales, anuncios y materiales digitales para que se vean más profesionales.",
          items: ["Imágenes más nítidas", "Listas para redes sociales", "Mejora de calidad"],
        },
      ],
    },
    how: {
      tag: "Cómo Funciona",
      title: "Simple, directo y eficiente",
      steps: [
        { title: "Entendimiento", text: "Analizamos tu negocio e identificamos dónde la tecnología puede generar más resultados." },
        { title: "Desarrollo", text: "Creamos la solución ideal con agilidad, manteniéndote en control de cada etapa." },
        { title: "Entrega y Soporte", text: "Implementamos, capacitamos a tu equipo y garantizamos soporte continuo." },
      ],
    },
    process: {
      tag: "Cómo Funciona",
      title: "Del primer contacto al agente en vivo en 7 días",
      subtitle: "Un proceso simple, sin sorpresas y sin que tengas que entender de tecnología",
      steps: [
        {
          icon: "🎯",
          label: "Paso 1",
          title: "Diagnóstico gratuito",
          description:
            "Respondes 5 preguntas sobre tu negocio por WhatsApp. En menos de 15 minutos entendemos exactamente lo que tus clientes preguntan a diario.",
        },
        {
          icon: "⚙️",
          label: "Paso 2",
          title: "Nosotros configuramos todo",
          description:
            "Nuestro equipo monta y entrena el agente con la información de tu negocio. No necesitas instalar nada, tocar código ni contratar un técnico.",
        },
        {
          icon: "🚀",
          label: "Paso 3",
          title: "Tu agente entra en vivo",
          description:
            "En hasta 7 días hábiles tu WhatsApp ya estará siendo atendido por IA. Puedes seguir todo desde el celular y ajustar lo que quieras.",
        },
        {
          icon: "📈",
          label: "Paso 4",
          title: "Tú te enfocas en lo importante",
          description:
            "Menos mensajes repetitivos, menos tiempo perdido y más clientes atendidos fuera de horario. Los resultados aparecen en la primera semana.",
        },
      ],
      cta: "Empezar mi diagnóstico gratuito",
    },
    faq: {
      tag: "FAQ",
      title: "Preguntas frecuentes",
      subtitle: "Respuestas directas a las dudas más comunes",
      items: [
        {
          question: "¿Necesito conocimientos técnicos para usarlo?",
          answer:
            "No. Nosotros configuramos todo para ti en hasta 7 días hábiles. Solo necesitas responder algunas preguntas sobre tu negocio. Después, solo sigue la atención desde el celular.",
        },
        {
          question: "¿Y si el cliente hace una pregunta que el bot no sabe responder?",
          answer:
            "El agente reconoce cuando no sabe y transfiere automáticamente la conversación a ti por WhatsApp, sin que el cliente note la transición. Nunca pierdes una atención.",
        },
        {
          question: "¿Hay permanencia o contrato largo?",
          answer:
            "No. Nuestros planes son mensuales y puedes cancelar cuando quieras, sin multa. En la práctica, los clientes se quedan porque los resultados aparecen rápido.",
        },
        {
          question: "¿Funciona para cualquier tipo de negocio?",
          answer:
            "Funciona para cualquier negocio que atienda clientes por WhatsApp, incluyendo salones, clínicas, tiendas, restaurantes y prestadores de servicio. Si tu cliente escribe, la IA ayuda.",
        },
        {
          question: "¿Cuánto tiempo tarda en verse el resultado?",
          answer:
            "La mayoría de los clientes empieza a notar menos mensajes repetitivos en la primera semana. Las reservas automáticas y las respuestas fuera del horario comercial son las primeras mejoras visibles.",
        },
        {
          question: "¿Y la seguridad de los datos de mis clientes?",
          answer:
            "Todos los datos quedan protegidos siguiendo las directrices de la LGPD. No compartimos información con terceros y tú mantienes control total sobre lo que el agente almacena.",
        },
      ],
      cta: "¿Aún tienes dudas? Habla con nosotros →",
    },
    roi: {
      tag: "Calculadora de ROI",
      title: "¿Cuánto estás perdiendo sin IA?",
      subtitle: "Calcula en 30 segundos el impacto real en tu negocio",
      labels: {
        messagesPerDay: "¿Cuántos mensajes recibes por día en WhatsApp?",
        manualHours: "¿Cuántas horas al día pasas respondiendo manualmente?",
        ticketAverage: "¿Cuál es tu ticket promedio de servicios/productos? (R$)",
        conversionRate: "¿Cuál es tu tasa de conversión actual? (% de mensajes que se convierten en clientes)",
      },
      stats: {
        revenueLost: "Ingresos perdidos por mes",
        timeCost: "Costo de tu tiempo por mes",
        totalLost: "Total perdido mensualmente",
        netSavings: "Ahorro neto con AgiloNex",
        payback: "Retorno estimado",
        note: "* Estimaciones basadas en promedios del mercado brasileño. Los resultados reales pueden variar.",
        lowVolume: "Tu volumen aún es bajo, pero cada cliente perdido fuera de horario ya tiene un costo",
        planSavings: "Con {price}/mes recuperas {value} en potencial perdido",
      },
      cta: "Quiero automatizar y dejar de perder ventas",
    },
    contactSection: {
      tag: "Atención comercial",
      title: "¿Listo para automatizar tu atención?",
      subtitle: "Completa el formulario y nuestro equipo te contactará en hasta 1 hora en horario comercial.",
      cards: [
        { title: "Respuesta rápida", text: "Flujo pensado para capturar leads locales de inmediato." },
        { title: "Enfoque en conversión", text: "Contacto directo por WhatsApp y rutina de atención comercial." },
      ],
      success: "Recibimos tu contacto, {name}! Nuestro equipo te escribirá por WhatsApp pronto.",
      form: {
        name: "Nombre completo",
        namePh: "Tu nombre completo",
        whatsapp: "WhatsApp",
        segment: "Segmento del negocio",
        segmentPh: "Selecciona una opción",
        message: "Mensaje",
        messagePh: "Cuéntanos brevemente sobre tu negocio",
        submit: "Enviar contacto",
        sending: "Enviando...",
      },
      direct: {
        title: "Contacto directo",
        subtitle: "Usa estos canales si prefieres hablar con el equipo sin completar el formulario.",
        socials: "Redes sociales",
      },
      toast: "Algo salió mal. Intenta por WhatsApp directamente.",
      toastAction: "Abrir WhatsApp",
      buttonWhatsapp: "Hablar por WhatsApp",
    },
    benefits: {
      tag: "Beneficios",
      title: "Resultados reales para tu negocio",
      items: [
        { title: "Ahorro de Tiempo", text: "Automatiza tareas repetitivas y libera a tu equipo para lo importante." },
        { title: "Menos Errores", text: "Los procesos digitales eliminan fallas humanas y aumentan la precisión." },
        { title: "Más Organización", text: "Sistemas integrados aportan claridad y control a toda tu operación." },
        { title: "Seguridad de Datos", text: "Protege la información de tu negocio y clientes con las mejores prácticas." },
      ],
    },
    portfolio: {
      tag: "Portafolio & Laboratorio",
      title: "Proyectos que demuestran nuestro trabajo",
      subtitle: "Conoce soluciones reales que desarrollamos para resolver problemas complejos con tecnología accesible.",
      featuredLabel: "Solución en producción",
      featured: {
        name: "Agilo Milhas",
        title: "Plataforma de gestión e intercambio de millas aéreas",
        description: "Una de las soluciones de AgiloNex en producción: ayuda a viajeros y empresas a maximizar el valor de sus millas con transparencia e inteligencia.",
        cta: "Acceder a la plataforma",
      },
      projects: [
        {
          name: "Zenith Guardian",
          title: "Gobernanza de Identidades & Sostenibilidad Digital",
          description: "Auditoría automatizada de identidades en la nube con cálculo de huella de carbono usando Python y Pandas.",
          cta: "Ver proyecto",
          url: "https://lovable.dev/projects/904bf7f9-72ed-4eb2-8f69-354446279684",
        },
        {
          name: "IntelliTask",
          title: "Middleware de IA para Gestión de Prioridades",
          description: "Dashboard inteligente que categoriza urgencia e impacto de tareas usando LLMs e integración con Supabase.",
          cta: "Abrir demo",
          url: "https://task-ai-project.lovable.app",
        },
        {
          name: "Graceful Spaces",
          title: "Experiencia Digital & Bienestar",
          description: "Plataforma para gestión de espacios con foco en fluidez, organización y experiencia del usuario.",
          cta: "Ver proyecto",
          url: "https://lovable.dev/projects/eb7a9fd9-9b87-470a-991c-15d758fdde1d",
        },
      ],
    },
    pricing: {
      tag: "Planes",
      title: "Elige el plan ideal para tu momento",
      subtitle: "Empieza pequeño, escala cuando tenga sentido. Sin permanencia, sin letra chica.",
      anchorIntro: "El valor completo del plan <strong>Enterprise</strong> es <strong>R$ 800/mes</strong>. Pero hoy puedes acceder a lo esencial de nuestro método por una fracción de ese valor.",
      plans: {
        anchor: {
          name: "Enterprise",
          subtitle: "Operación completa con squad dedicado",
          badge: "Completo",
          price: "800",
          period: "/mes",
          features: [
            "Squad dedicado de IA + integraciones",
            "Sistema a medida y dashboards",
            "Adecuación RGPD/LGPD completa",
            "SLA prioritario y canal directo",
            "Onboarding presencial",
          ],
          cta: "Saber más",
        },
        main: {
          name: "Esencial AgiloNex",
          subtitle: "Automatización lista para hacer crecer tu negocio",
          badge: "Mejor Elección",
          oldPrice: "800",
          price: "397",
          period: "/mes",
          savings: "Ahorra R$ 403/mes frente al Enterprise",
          features: [
            "Automatización con IA configurada",
            "1 integración clave incluida",
            "Dashboard analítico",
            "Capacitación de tu equipo",
            "Soporte incluido mientras seas suscriptor",
          ],
          cta: "Lo quiero",
        },
        basic: {
          name: "Starter",
          subtitle: "Para validar tu primera automatización",
          price: "250",
          period: "/mes",
          features: [
            "1 chatbot O automatización simple",
            "Entrega en hasta 7 días",
            "Soporte por chat",
            "7 días de garantía",
          ],
          cta: "Empezar",
        },
      },
      trust: {
        secure: "Compra segura",
        guarantee: "7 días de garantía",
        support: "Soporte incluido mientras seas suscriptor",
      },
    },
    cta: {
      title: "¿Listo para mejorar tu negocio?",
      subtitle: "Habla con nosotros y descubre cómo la tecnología puede transformar tu operación de forma simple y accesible.",
      whats: "WhatsApp",
      quote: "Solicitar presupuesto",
    },
    contact: {
      tag: "Contacto",
      title: "¿Hablamos?",
      subtitle: "Completa el formulario o habla directamente por WhatsApp. Respondemos en 24 horas.",
      whats: "Hablar por WhatsApp",
      name: "Nombre",
      namePh: "Tu nombre",
      email: "Email",
      emailPh: "Tu correo",
      message: "Mensaje",
      messagePh: "¿Cómo podemos ayudar?",
      send: "Enviar mensaje",
      sending: "Enviando...",
      success: "¡Mensaje enviado con éxito! Te contactaremos pronto.",
    },
    footer: {
      rights: "Todos los derechos reservados.",
    },
    lang: {
      label: "Idioma",
      pt: "Português",
      en: "English",
      es: "Español",
    },
  },
};

export type TranslationShape = typeof translations.pt;
