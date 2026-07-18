---
target: homepage
total_score: 19
p0_count: 1
p1_count: 3
timestamp: 2026-07-18T14-01-39Z
slug: src-pages-index-tsx
---
#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2/4 | A home longa nao comunica claramente em que etapa da jornada o visitante esta; estados de formulario dependem de feedback tardio. |
| 2 | Match System / Real World | 2/4 | A linguagem alterna entre IA, LGPD, milhas, planos e desenvolvimento sem uma narrativa unica para pequenos negocios. |
| 3 | User Control and Freedom | 3/4 | Ha navegacao por ancoras e menu mobile, mas o volume de secoes torna o retorno e a escolha de caminho cansativos. |
| 4 | Consistency and Standards | 2/4 | CTAs, tons e tratamentos visuais variam entre componentes; a home parece reunir varias landing pages. |
| 5 | Error Prevention | 1/4 | O formulario usa `const WEBHOOK_URL = "[WEBHOOK_URL]"`, portanto o envio real falha ate que a configuracao seja substituida. |
| 6 | Recognition Rather Than Recall | 2/4 | O visitante precisa lembrar qual oferta viu entre muitos blocos e categorias; falta uma escolha inicial por objetivo. |
| 7 | Flexibility and Efficiency | 2/4 | Nao ha entrada curta por perfil ou necessidade; todos percorrem a mesma sequencia longa. |
| 8 | Aesthetic and Minimalist Design | 2/4 | Inter, gradientes, cards e fundos escuros repetidos criam uma linguagem generica e pouco diferenciada. |
| 9 | Error Recovery | 1/4 | O erro do formulario cai em toast generico e abre WhatsApp, sem orientar o que foi preservado ou como tentar novamente. |
| 10 | Help and Documentation | 2/4 | FAQ existe, mas a prova concreta e os cases aparecem tarde e sem antes/depois, depoimento ou numero. |
| **Total** | | **19/40** | **Precisa de foco estrutural antes de uma rodada cosmetica.** |

#### Anti-Patterns Verdict

**Start here.** A home parece parcialmente gerada por padroes de landing page de IA: Inter como fonte dominante, repeticao de cards, muitos gradientes/fundos, labels uppercase e varias secoes de oferta com a mesma cadencia. Nao e um desastre visual, mas a aparencia nao comunica ainda a proximidade pratica e a personalidade da Agilonex.

**LLM assessment**: A composicao e competente e consistente em tokens, mas a identidade fica diluida. O maior sinal de template nao e uma unica classe; e a soma de hero generica, grids de cards, pricing, calculadora, nichos, FAQ e varios CTAs antes de uma prova forte. A secao de portfolio e o melhor material de diferenciacao, mas entra tarde e trata projetos como links, nao como historias de resultado.

**Deterministic scan**: 2 findings, ambos `overused-font`, em [src/index.css](/home/gabriel/Documentos/digital-growth-partners-1/src/index.css): linha 1 (import de Inter) e linha 63 (font-family Inter). O detector nao encontrou outros anti-patterns nos alvos escaneados. O alerta e valido como recomendacao de identidade; nao e um bloqueador funcional.

**Visual overlays**: Nao disponiveis. A automacao de navegador nao esta exposta nesta sessao e a tentativa local com Playwright falhou porque o executavel Chromium nao esta instalado. Nenhuma afirmacao visual foi baseada em overlay.

#### Overall Impression

A home com bastante trabalho de implementacao, bons CTAs para WhatsApp e uma base de componentes reutilizavel, mas que tenta servir muitos negocios e ofertas ao mesmo tempo. A maior oportunidade e transformar a pagina de um catalogo de possibilidades em uma rota curta: problema do cliente, prova real, proximo passo.

#### What's Working

- O CTA de WhatsApp aparece no header, hero, processo, pricing, FAQ e contato, o que sustenta a conversao principal.
- A secao de processo tem uma promessa concreta de diagnostico, configuracao e entrada no ar, mais acessivel que a linguagem tecnica do restante da pagina.
- O portfolio possui projetos reais e links funcionais, incluindo Agilo Milhas, Diario de Emocoes, Patrimonio Hub e PrevTrack.

#### Priority Issues

- **[P0] Formulario de contato nao esta conectado a um endpoint real**
  - **Why it matters**: O submit faz POST para o literal `"[WEBHOOK_URL]"`; a conversao por formulario falha e o visitante so descobre depois de preencher quatro campos.
  - **Fix**: substituir a configuracao por uma URL real ou remover o formulario da home ate existir endpoint; manter WhatsApp como fallback visivel desde o inicio.
  - **Suggested command**: `$impeccable harden src/components/ContactSection.tsx`

- **[P1] A promessa da hero nao corresponde ao escopo estrategico**
  - **Why it matters**: O titulo fala apenas de automatizar, integrar e proteger com tecnologia, enquanto a Agilonex tambem vende sites, landing pages, software, marketing, upscaling e treinamento de IA.
  - **Fix**: usar a promessa confirmada de crescimento, inovacao e entrada no digital; deixar automacao como uma prova/rota, nao como a definicao inteira da empresa. Atualizar tambem title, description e Open Graph de `index.html`.
  - **Suggested command**: `$impeccable clarify src/components/HeroSection.tsx`

- **[P1] Sobrecarga de oferta e hierarquia**
  - **Why it matters**: A sequencia Hero, ChatDemo, Process, Pricing, About, Services, HowItWorks, Benefits, Portfolio, ROI, Nichos, FAQ, CTA e Contact cria muitos pontos de decisao e repete "como funciona". Pequenos negocios nao sabem por onde comecar.
  - **Fix**: escolher tres entradas orientadas a problema (atrair clientes, automatizar atendimento, construir uma solucao digital), mover pricing para paginas especificas, trazer prova antes de pricing e eliminar a duplicacao entre ProcessSection e HowItWorksSection.
  - **Suggested command**: `$impeccable distill src/pages/Index.tsx`

- **[P1] Conteudo pode ficar invisivel sem JavaScript ou em movimento reduzido**
  - **Why it matters**: ProcessSection inicia cards com `opacity: 0` e so os revela apos IntersectionObserver; outros componentes usam `initial={{ opacity: 0 }}` com `whileInView`. Se o observer nao dispara, o conteudo essencial desaparece. Isso tambem conflita com a exigencia WCAG 2.2 AA.
  - **Fix**: deixar o estado base visivel e aplicar animacao somente via variante ativada; adicionar `useReducedMotion` ou CSS para reduzir transicoes sem esconder conteudo.
  - **Suggested command**: `$impeccable audit src/components`

- **[P2] Identidade visual generica e pouco proprietaria**
  - **Why it matters**: Inter, azul saturado, fundos quase pretos, gradientes, blur e cards repetidos aproximam a Agilonex de templates SaaS e contradizem a direcao de ser proxima, pratica e acessivel.
  - **Fix**: documentar o sistema atual, escolher uma tipografia com mais personalidade, reduzir tratamentos decorativos e usar os projetos reais como material visual principal.
  - **Suggested command**: `$impeccable document`, depois `$impeccable typeset src/index.css`

#### Persona Red Flags

**Jordan (First-Timer, pequeno negocio local)**: Encontra termos como integrações, APIs, dashboards, LGPD, SaaS e squad antes de entender qual problema sera resolvido. A pagina oferece seis servicos, tres planos, nichos e uma calculadora sem uma pergunta inicial que o ajude a se localizar.

**Maya (Startup em crescimento)**: Pode interpretar a oferta como chatbot barato para PME porque a hero e o pricing destacam automacao e planos mensais. Desenvolvimento de software, produto digital e customizacao aparecem espalhados, sem uma rota clara para uma conversa de maior escopo.

**Alex (Power User, decisor tecnico)**: Encontra links para projetos, mas sem case tecnico, stack, escopo, prazo ou resultado. O portfolio demonstra existencia, nao capacidade de decisao; falta evidenciar antes/depois e impacto.

#### Minor Observations

- O CTA secundario da hero leva para `#servicos`, mas a decisao estrategica registrada para o site e "Ver exemplos de projetos e resultados".
- A navegacao inclui `Planos` e `Como Funciona` no header, embora a propria estrategia indique que processo deve reforcar confianca, nao competir como CTA.
- `index.html` usa metadata de "Automação, Integração e LGPD para PMEs", ainda mais estreita que a copy atual da home.
- Muitas secoes usam labels uppercase pequenos e rastreados, repetindo a cadencia que a skill recomenda evitar.
- O uso de `border-radius` de 20px a 28px e sombras largas aparece em varios cards, aproximando-se do padrao de ghost-card e over-rounding.

#### Questions to Consider

- E melhor a home vender uma entrada principal, "coloque seu negocio no digital", e deixar automacao, sites e software como caminhos escolhidos pelo visitante?
- A prova da barbearia e do escritorio de advocacia pode aparecer antes de pricing para construir confianca antes de pedir decisao?
- A Agilonex quer ser percebida primeiro como parceira de crescimento digital ou como especialista em automacao com IA?
