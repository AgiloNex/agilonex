/**
 * Identidade centralizada do fundador e responsável técnico da Agilonex.
 *
 * Usada em schemas Schema.org (E-E-A-T), autor de posts do blog, página
 * Sobre e política de privacidade — qualquer lugar que precise identificar
 * quem está por trás da empresa. Alterar aqui propaga para todos.
 */
export const founder = {
  name: "Gabriel Luiz",
  fullName: "Gabriel Luiz Silva Espírito Santo",
  jobTitle: "Fundador e Responsável Técnico",
  role: "Desenvolvedor de software",
  email: "gabrielluizsilva.contato@gmail.com",
  location: {
    city: "Belo Horizonte",
    state: "Minas Gerais",
    country: "BR",
  },
  links: {
    linkedin: "https://www.linkedin.com/in/gabriel-luiz-silva-es",
    github: "https://github.com/DevGabrielLuiz",
  },
  /** Bio curta reforçando E-E-A-T (experiência). */
  bio: {
    pt:
      "Desenvolvedor de software e fundador da Agilonex. Atua conectando pequenos negócios a tecnologia: já automatizou atendimentos por WhatsApp, integrou IA em sites de escritórios de advocacia e publicou projetos web em produção. Mantém os dados do seu cliente como responsabilidade séria — ele mesmo é o Encarregado de Dados (DPO) da Agilonex.",
    en:
      "Software developer and founder of Agilonex. Connects small businesses to technology: has automated WhatsApp service, integrated AI into law firm websites, and shipped web projects to production. He treats your customer's data as a serious responsibility — he is himself Agilonex's Data Protection Officer (DPO).",
    es:
      "Desarrollador de software y fundador de Agilonex. Conecta pequeños negocios con tecnología: ha automatizado atenciones por WhatsApp, integrado IA en sitios de despachos de abogados y publicado proyectos web en producción. Trata los datos de tu cliente como una responsabilidad seria — él mismo es el Encargado de Datos (DPO) de Agilonex.",
  },
} as const;
