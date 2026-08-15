/**
 * Dados de avaliações de clientes (depoimentos) utilizados tanto
 * na UI (`TestimonialsSection`) quanto na geração de Schema.org
 * `AggregateRating` / `Review` em `src/lib/seoSchemas.ts`.
 *
 * Centralizar nesse arquivo garante que o número de estrelas exibido
 * na tela seja o mesmo entregue ao Googlebot no JSON-LD — evitando
 * divergências que invalidam o rich snippet.
 */
import type { Localized } from "@/data/posts";

export interface Review {
  /** Identificador estável (usado em `@id` do schema e como key React). */
  id: string;
  /** Nome do cliente que avaliou. */
  author: Localized<string>;
  /** Cargo / empresa do cliente — vira `description` do `Person`. */
  role: Localized<string>;
  /** Texto do depoimento em si (vira `reviewBody`). */
  text: Localized<string>;
  /** Nota de 1 a `BEST_RATING` (5). */
  ratingValue: 1 | 2 | 3 | 4 | 5;
  /** Data da avaliação ISO (YYYY-MM-DD). Vira `datePublished`. */
  datePublished: string;
}

export const BEST_RATING = 5;
export const WORST_RATING = 1;

/**
 * Avaliações reais de clientes. Para que o `AggregateRating` seja
 * exibido na SERP, o Google exige que haja conteúdo correspondente
 * visível na página — por isso este array alimenta tanto a UI quanto
 * o schema.
 */
export const reviews: Review[] = [
  {
    id: "mariana-costa",
    author: { pt: "Mariana Costa", en: "Mariana Costa", es: "Mariana Costa" },
    role: {
      pt: "Proprietária · Clínica Saúde+",
      en: "Owner · Clínica Saúde+",
      es: "Propietaria · Clínica Saúde+",
    },
    text: {
      pt: "O chatbot automatizou nosso agendamento e reduziu em 40% as ligações. Agora minha equipe foca no atendimento presencial.",
      en: "The chatbot automated our scheduling and cut phone calls by 40%. Now my team focuses on in-person care.",
      es: "El chatbot automatizó nuestras citas y reduce un 40% las llamadas. Ahora mi equipo se enfoca en la atención presencial.",
    },
    ratingValue: 5,
    datePublished: "2025-01-15",
  },
  {
    id: "ricardo-almeida",
    author: { pt: "Ricardo Almeida", en: "Ricardo Almeida", es: "Ricardo Almeida" },
    role: {
      pt: "Gerente · Distribuidora RA",
      en: "Manager · Distribuidora RA",
      es: "Gerente · Distribuidora RA",
    },
    text: {
      pt: "A integração dos nossos sistemas eliminou o retrabalho de planilhas. Ganhamos horas por semana em produtividade.",
      en: "Integrating our systems eliminated spreadsheet rework. We gained hours of productivity every week.",
      es: "La integración de nuestros sistemas eliminó el retrabajo en hojas de cálculo. Ganamos horas de productividad cada semana.",
    },
    ratingValue: 5,
    datePublished: "2025-02-03",
  },
  {
    id: "fernanda-oliveira",
    author: { pt: "Fernanda Oliveira", en: "Fernanda Oliveira", es: "Fernanda Oliveira" },
    role: {
      pt: "Diretora · Loja Virtual FO",
      en: "Director · Loja Virtual FO",
      es: "Directora · Loja Virtual FO",
    },
    text: {
      pt: "A adequação à LGPD foi rápida e sem dor de cabeça. Me sinto segura sabendo que meus dados estão protegidos.",
      en: "LGPD compliance was fast and painless. I feel safe knowing my data is protected.",
      es: "La adecuación a la LGPD fue rápida y sin dolores de cabeza. Me siento segura sabiendo que mis datos están protegidos.",
    },
    ratingValue: 5,
    datePublished: "2025-02-20",
  },
  {
    id: "lucas-ferreira",
    author: { pt: "Lucas Ferreira", en: "Lucas Ferreira", es: "Lucas Ferreira" },
    role: {
      pt: "Sócio · Barbearia Corte Nobre",
      en: "Partner · Barbearia Corte Nobre",
      es: "Socio · Barbearia Corte Nobre",
    },
    text: {
      pt: "O agendamento online diminuiu os furos de agenda e o cliente chega sabendo o serviço. Recuperei horários antes perdidos.",
      en: "Online booking reduced no-shows and customers arrive knowing the service. I recovered time slots I used to lose.",
      es: "La reserva online redujo las ausencias y el cliente llega sabiendo el servicio. Recuperé horarios antes perdidos.",
    },
    ratingValue: 5,
    datePublished: "2025-03-08",
  },
];

/** Média simples das avaliações — usada no `AggregateRating`. */
export const averageRating = (): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.ratingValue, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};

/** Quantidade total de avaliações — usada no `AggregateRating`. */
export const reviewCount = (): number => reviews.length;
