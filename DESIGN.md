---
name: AgiloNex
description: Oficina digital pratica e parceira de crescimento para negocios que querem avancar.
colors:
  background: "#0D1217"
  foreground: "#F2F4F6"
  card: "#131A20"
  primary: "#0A24FF"
  accent: "#4759FF"
  secondary: "#1B232B"
  muted-foreground: "#8F9AA8"
  border: "#222D37"
  whatsapp: "#25D366"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  sm: "0.5rem"
  md: "1rem"
  lg: "1.25rem"
  xl: "1.5rem"
spacing:
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  section: "clamp(5rem, 10vw, 7rem)"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.sm}"
    padding: "0.75rem 1.5rem"
  button-secondary:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
    padding: "0.75rem 1.5rem"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "2rem"
---

# Design System: AgiloNex

## 1. Overview

**Creative North Star: "A Oficina Digital que Faz o Negocio Avancar"**

O sistema atual deve parecer uma oficina digital pratica: acessivel para o pequeno negocio, capaz de lidar com tecnologia avancada e sempre orientada a uma proxima acao concreta. A voz combina a proximidade de uma parceira de crescimento com a confianca de quem implementa, treina e entrega.

O produto visual existente e escuro, tecnico e energetico, com azul como cor de acao e superficies em camadas. A evolucao deve preservar essa base, mas reduzir decoracao generica e deixar projetos, problemas reais e resultados carregarem mais da identidade.

**Key Characteristics:**
- Pratico antes de impressionante.
- Tecnologia explicada sem jargao desnecessario.
- Contraste alto e leitura confortavel.
- Prova concreta antes de promessas amplas.
- Uma acao principal clara: WhatsApp qualificado.

## 2. Colors

A paleta e um sistema escuro de alto contraste, com azul eletrico para acao e verde reservado a WhatsApp e estados de sucesso.

### Primary
- **Azul de Acao** (#0A24FF): principal CTA, links ativos, progresso e pontos de conversao.
- **Azul de Destaque** (#4759FF): hover, estados alternativos e destaque secundario.

### Secondary
- **Superficie Grafite** (#1B232B): secoes alternadas, controles e separacao tonal.

### Neutral
- **Fundo Noturno** (#0D1217): fundo global e areas de maior contraste.
- **Superficie de Card** (#131A20): cards e containers de conteudo.
- **Texto Claro** (#F2F4F6): titulos e informacao primaria.
- **Texto Muted** (#8F9AA8): corpo, apoio e descricoes; verificar contraste em cada superficie.
- **Borda Grafite** (#222D37): divisores e contornos discretos.
- **WhatsApp** (#25D366): somente para a acao e identificacao do canal WhatsApp.

### Named Rules
**The One Action Rule.** Azul eletrico indica a proxima acao; nao deve virar decoracao em todos os elementos.

## 3. Typography

**Display Font:** Inter (with system-ui, sans-serif fallback)
**Body Font:** Inter (with system-ui, sans-serif fallback)
**Label/Mono Font:** None

**Character:** A tipografia atual e funcional, compacta e tecnologica. O uso futuro deve manter a legibilidade, mas reduzir dependencias de tracking uppercase e buscar uma personalidade mais propria antes de uma troca ampla.

### Hierarchy
- **Display** (800, clamp(2.25rem, 5vw, 3.75rem), 1.05): promessa principal da hero; usar `text-wrap: balance`.
- **Headline** (800, clamp(1.875rem, 4vw, 2.5rem), 1.1): titulos de secoes e argumentos principais.
- **Title** (700, 1.25rem, 1.25): nomes de servicos, projetos e cards.
- **Body** (400, 1rem, 1.6): explicacoes com largura maxima de 65-75ch.
- **Label** (600, 0.875rem, 1.4, uppercase somente quando curto): estados, categorias e metadados.

### Named Rules
**The Clear Voice Rule.** Tamanho, peso e contraste devem organizar a leitura; tracking amplo e uppercase nao podem substituir hierarquia.

## 4. Elevation

O sistema usa camadas tonais como profundidade primaria e sombras discretas como reforco de interacao. Cards nao devem depender de blur ou sombra larga para parecerem clicaveis; a diferenca de superficie, borda ou CTA deve comunicar a funcao.

### Shadow Vocabulary
- **Card base** (`var(--shadow-card)`): elevacao baixa em containers informativos.
- **Card hover** (`var(--shadow-card-hover)`): resposta de hover, sem combinar sombra larga com borda decorativa pesada.
- **Contact emphasis** (`0 8px 24px rgba(0,0,0,0.16)`): somente para o bloco de contato quando necessario.

### Named Rules
**The Flat-by-Default Rule.** Superficies ficam quietas em repouso; movimento, foco e hover devem explicar estado, nao enfeitar a pagina.

## 5. Components

### Buttons
- **Shape:** cantos discretos, 0.5rem; pill somente para tags ou estados.
- **Primary:** `--primary` com texto branco, `0.75rem 1.5rem`, CTA de WhatsApp em primeiro plano.
- **Hover / Focus:** mudanca clara de cor ou opacidade; foco visivel com ring de `--ring`; nunca depender apenas de sombra.
- **Secondary:** superficie `--card`, borda `--border`, texto `--foreground`; menos peso visual que o WhatsApp.

### Cards / Containers
- **Corner Style:** 0.5rem a 1rem; evitar 20px+ em novos cards.
- **Background:** `--card` sobre `--background` ou `--secondary`.
- **Shadow Strategy:** elevacao baixa e tonal; sem ghost-card decorativo.
- **Border:** `--border` quando separar conteudo for necessario.
- **Internal Padding:** 1.5rem a 2rem.

### Inputs / Fields
- **Style:** fundo `--background`, borda `--border`, altura minima de 2.75rem, raio `0.5rem`.
- **Focus:** ring visivel em `--ring` e contraste preservado.
- **Error / Disabled:** erro textual proximo ao campo; nao depender apenas de toast ou cor.

### Navigation
- **Style:** header fixo com fundo escuro e separador discreto.
- **Desktop:** links secundarios com contraste suficiente e um CTA de WhatsApp dominante.
- **Mobile:** menu com alvo de toque confortavel, foco visivel e fechamento apos navegacao.

### Portfolio Case
- **Style:** projetos reais devem aparecer como prova, com contexto, problema, entrega e resultado antes de um link externo.
- **Behavior:** o CTA de portfolio e secundario ao WhatsApp, mas deve ter peso suficiente para visitantes ainda em avaliacao.

## 6. Do's and Don'ts

### Do:
- **Do** manter contraste de texto e foco compatíveis com WCAG 2.2 AA.
- **Do** usar a cor primaria para acao, nao como textura em todas as secoes.
- **Do** explicar tecnologia em linguagem de negocio local.
- **Do** trazer cases, depoimentos e numeros antes de pricing quando disponiveis.
- **Do** deixar todo conteudo visivel por padrao; animacao deve aprimorar, nunca habilitar a leitura.
- **Do** preservar o WhatsApp como CTA principal e o portfolio como CTA secundario.

### Don't:
- **Don't** parecer uma agencia tradicional, corporativa e burocratica.
- **Don't** parecer um template generico de SaaS com cards e gradientes previsiveis.
- **Don't** parecer uma empresa excessivamente tecnica, fria ou dificil de entender.
- **Don't** repetir labels uppercase rastreados acima de todas as secoes.
- **Don't** usar Inter, azul e gradientes como identidade suficiente sem prova visual real.
- **Don't** esconder conteudo essencial em `opacity: 0` aguardando JavaScript.
- **Don't** usar borda lateral colorida, texto com gradiente ou cards excessivamente arredondados.
