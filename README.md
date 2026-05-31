# AgiloNex

Site institucional da AgiloNex, uma empresa de automação com IA para pequenos negócios locais no Brasil.

O projeto foi construído com foco em conversão, clareza e experiência mobile-first, usando um tema dark profissional e componentes interativos para demonstrar o valor da automação na prática.

## Stack

- React 18
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- React Router

## Principais recursos

- Hero com CTA para WhatsApp
- Seção de processo com timeline animada
- Apresentação de preços e benefícios
- Demonstração interativa de chatbot
- Calculadora de ROI em tempo real
- Seções por nicho:
  - salão
  - clínica
  - restaurante
  - loja
- FAQ com acordeão
- Páginas institucionais:
  - LGPD
  - Termos de Uso
- Botão flutuante do WhatsApp

## Rotas

- `/` - página inicial
- `/lgpd` - política de privacidade e LGPD
- `/termos-de-uso` - termos de uso
- `*` - página 404

## Estrutura da home

A página principal exibe as seções nesta ordem:

1. Header
2. Hero
3. Processo
4. Planos
5. Sobre
6. Serviços
7. Como funciona
8. Benefícios
9. Portfólio
10. Chat demo
11. Calculadora de ROI
12. Nichos
13. FAQ
14. CTA final
15. Contato
16. Footer

## Scripts

```bash
npm run dev
```
Inicia o servidor de desenvolvimento.

```bash
npm run build
```
Gera a build de produção.

```bash
npm run preview
```
Pré-visualiza a build localmente.

```bash
npm run lint
```
Executa o ESLint no projeto.

```bash
npm run test
```
Executa os testes com Vitest.

## Desenvolvimento

1. Instale as dependências:

```bash
npm install
```

2. Inicie o ambiente local:

```bash
npm run dev
```

3. Abra a aplicação no navegador indicado pelo Vite.

## Observações

- O site usa links de WhatsApp para conversão e contato rápido.
- As páginas de LGPD e Termos de Uso foram criadas como base institucional e podem ser ajustadas com revisão jurídica.
- O projeto já inclui componentes animados e seções comerciais voltadas para demonstração do valor da IA em negócios locais.
