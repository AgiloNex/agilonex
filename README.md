# AgiloNex — Site Institucional & Oficina Digital

Site institucional e plataforma da **AgiloNex**, uma oficina digital e parceira de crescimento para pequenos negócios, empreendedores e startups.

## Tecnologias

- **Core**: React 18 + TypeScript + Vite
- **Estilização**: Tailwind CSS + Radix UI / shadcn/ui
- **Animações**: Framer Motion
- **Roteamento & I18n**: React Router DOM (com suporte a PT, EN, ES)
- **Deploy**: Cloudflare Workers via Wrangler (`wrangler.jsonc`)

## Pré-requisitos

- Node.js 18+
- Bun (gerenciador de pacotes recomendado)

## Instalação

```bash
bun install
```

## Scripts Disponíveis

- `bun dev` — Inicia o servidor de desenvolvimento Vite
- `bun run build` — Gera o build de produção (executa o script `prebuild` automaticamente)
- `bun run build:dev` — Gera o build em modo de desenvolvimento
- `bun run lint` — Executa a verificação de código com ESLint
- `bun run typecheck` — Valida a tipagem TypeScript sem emitir arquivos (`tsc --noEmit`)
- `bun run typecheck:watch` — Valida a tipagem TypeScript em modo watch
- `bun run test` / `bun run test:watch` — Executa a suíte de testes com Vitest
- `bun run sitemap` — Regenera `sitemap.xml` e `robots.txt` sem realizar o build completo
- `bun run preview` — Visualização local do build de produção

## Estrutura de Pastas

```text
src/
├── components/ # Componentes reutilizáveis de UI (shadcn/ui, layout, etc.)
├── data/       # Dados estáticos (conteúdo do blog, cases, etc.)
├── i18n/       # Configuração e traduções (translations.ts, hooks)
├── lib/        # Utilitários, esquemas de SEO e helpers
├── pages/      # Páginas da aplicação e sub-rotas (Cases, Blog, Legal, etc.)
public/         # Ativos estáticos e arquivos de verificação
scripts/        # Scripts auxiliares (geração de sitemap e robots.txt)
```

## SEO & Estrutura Semântica

- **Hierarquia H1-H3**: Estrutura semântica rigorosa por página.
- **Hook `useSEO`**: Gerenciamento dinâmico de títulos, meta tags e tags `hreflang` para suporte multilíngue.
- **Dados Estruturados (`seoSchemas.ts`)**: Injeção de esquemas JSON-LD (Organization, LocalBusiness, WebSite, BreadcrumbList).
- **Sitemap & Robots**: Gerados dinamicamente na etapa de prebuild através de `scripts/generate-sitemap.ts`.

## Deploy & Infraestrutura

O projeto é publicado no **Cloudflare Workers** utilizando o arquivo de configuração `wrangler.jsonc`.
- **Roteamento SPA**: O fallback de Single Page Application é tratado diretamente nas rotas e diretivas do Cloudflare Workers para garantir navegação fluida e respostas adequadas a crawlers/spiders.

## Documentação Adicional

Para detalhes de arquitetura de produto e diretrizes de design, consulte:
- [PRODUCT.md](PRODUCT.md) — Posicionamento, proposta de valor e personas.
- [DESIGN.md](DESIGN.md) — Sistema de design, paleta de cores e princípios visuais.
