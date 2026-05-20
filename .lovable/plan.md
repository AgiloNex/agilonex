# Plano: Seção de Pricing com Ancoragem Psicológica

Criar uma nova seção `PricingSection` posicionada **entre Serviços e Como Funciona**, aplicando a técnica de ancoragem: card âncora de alto valor à esquerda, oferta principal destacada ao centro (com preço âncora riscado dentro), e plano básico discreto à direita.

## Planos propostos (baseados nos serviços atuais do site)

Como a AgiloNex oferece automação com IA, integrações, desenvolvimento sob medida e LGPD, faz sentido empacotar como combos de implementação + assinatura de suporte. Mantive a âncora em ~4x o principal (regra de 3x–5x).


| Vamos diminuir os valores dos planos inIciar em 250, 397 800                                                                                                                                                                                                                                 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| Estrutura: ✅ BoaÂncora: ✅ FuncionaStarter: ⚠️ Sobe pra R$1.497Principal: ⚠️ Separa implementação + mensalidadeSuporte vitalício: ❌ Troca por prazo definido ou assinatura mensalMaior erro a evitar agora:Vender suporte vitalício sem ter estruturapra honrar isso em 2, 3, 5 anos. | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Se é implementação + suporte mensal: → Separa os dois valores → Ex: R$2.500 implementação + R$300/mês suporte Se é só assinatura anual: → Deixa explícito: R$4.900/ano = R$408/mês → Soa muito melhor                                                                                        | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| &nbsp;                                                                                                                                                                                                                                                                                       | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |


Economia exibida no card principal: **R$ 15.000** (19.900 − 4.900).

## Conteúdo de cada card

**Enterprise Custom (Âncora)**

- Badge: "Completo"
- Subtítulo: "Valor completo do projeto"
- Benefícios: Squad dedicado · IA + Integrações + Sistema sob medida · Adequação LGPD completa · SLA prioritário · Onboarding presencial
- CTA: "Saiba mais" (outline, secundário)

**Essencial AgiloNex (Principal)**

- Badge topo: "⭐ Melhor Escolha"
- Preço riscado: R$ 19.900 (opacidade 50%, line-through)
- Preço grande: **R$ 4.900**
- Pill verde: "💰 Economia de R$ 15.000 em relação ao plano completo"
- Tag "Suporte vitalício incluso" (por ser assinatura)
- Benefícios: Automação com IA pronta · 1 integração-chave · Dashboard analítico · Treinamento da equipe · Suporte vitalício
- CTA: "Quero agora" → abre WhatsApp

**Starter Automation (Básico)**

- Sem badge, visual discreto
- Benefícios: 1 chatbot OU automação simples · Entrega em 7 dias · 7 dias de garantia · Suporte por 30 dias
- CTA: "Começar" (ghost/outline)

## Estrutura visual

```text
┌─ Tag "Planos" + Título + Subtítulo ─────────────────────────┐
│ Texto de ancoragem: "O valor total do Enterprise Custom é   │
│ R$ 19.900. Mas hoje você pode acessar o essencial por uma   │
│ fração desse valor."                                        │
└─────────────────────────────────────────────────────────────┘

  ┌─────────┐   ┌───────────┐   ┌─────────┐
  │ Âncora  │   │ PRINCIPAL │   │ Básico  │
  │ (dark)  │   │ scale 1.05│   │         │
  │         │   │ shadow XL │   │         │
  └─────────┘   └───────────┘   └─────────┘

  🔒 Compra segura · ✅ 7 dias de garantia · ♾️ Suporte vitalício nas assinaturas
```

Mobile: **Principal primeiro**, depois Âncora (reduzida), depois Básico — empilhados.

## Detalhes técnicos

- **Novo arquivo**: `src/components/PricingSection.tsx`
- **Registrar em**: `src/pages/Index.tsx` entre `<ServicesSection />` e `<HowItWorksSection />`
- **Traduções**: adicionar bloco `pricing` em `src/i18n/translations.ts` (pt/en/es) com: tag, title, subtitle, anchorIntro, plans[3] (name, price, oldPrice, period, badge, features[], cta, ctaType), savingsLabel, trustRow
- **Nav**: adicionar item "Planos" em `nav` (pt/en/es) e link `#planos` no Header
- **Estilos**: usar tokens semânticos do design system (`bg-primary`, `bg-card`, `border-border`, `text-muted-foreground`). Nada de cores hardcoded.
  - Card principal: `bg-primary text-primary-foreground shadow-2xl md:scale-105`
  - Card âncora: `bg-secondary border-border`
  - Pill economia: verde via classe utilitária com token (`bg-green-500/15 text-green-400` aceitável como acento, ou criar token `--success`)
  - Preço riscado: `line-through opacity-50`
- **CTA principal**: reaproveita o helper de link do WhatsApp já usado em `WhatsAppButton`/`CtaSection`
- **Responsivo**: `grid-cols-1 md:grid-cols-3`, ordem mobile via `order-*` (Principal `order-1`, Âncora `order-2`, Básico `order-3`)
- **Acessibilidade**: cada card é `<article>` com `<h3>`; badges com `aria-label`

## Checklist de validação

- Preço âncora riscado dentro do card Principal ✓
- Economia calculada (R$ 15.000) exibida em pill vibrante ✓
- Card Principal com `scale-1.05` + shadow elevado ✓
- Badge "Melhor Escolha" só no Principal ✓
- CTA forte (WhatsApp) só no Principal ✓
- Texto de ancoragem acima dos cards ✓
- Mobile: Principal no topo ✓
- 3 idiomas traduzidos ✓