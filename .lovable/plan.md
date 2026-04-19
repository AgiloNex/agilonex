

## Plano: Renomear para "Agilo Nex" + Seletor de Idioma

### 1. Renomear empresa: NexusTech → Agilo Nex
Atualizar a marca em todos os componentes:
- `Header.tsx` — logo "Agilo<span>Nex</span>"
- `Footer.tsx` — "Agilo Nex Solutions"
- `index.html` — title e meta description
- `AboutSection.tsx`, `HeroSection.tsx` (se mencionarem o nome)

### 2. Seletor de idioma compacto no Header
Pequeno dropdown ao lado do botão "Fale Conosco" com 3 idiomas:
- 🇧🇷 PT (padrão)
- 🇺🇸 EN
- 🇪🇸 ES

**Visual:** botão minimalista com ícone `Globe` (lucide) + código do idioma atual (ex: "PT"), abrindo um menu pequeno via `DropdownMenu` (shadcn) já presente no projeto. Aparece tanto no desktop quanto no menu mobile.

### 3. Sistema de tradução (i18n)
Implementar tradução real do conteúdo (não só visual), pois a ideia é substituir o Google Tradutor:

- Criar `src/i18n/translations.ts` com objetos `pt`, `en`, `es` contendo todos os textos das seções (hero, sobre, serviços, como funciona, benefícios, portfólio, CTA, contato, footer, header).
- Criar `src/i18n/LanguageContext.tsx` — Context API com:
  - estado `language` ('pt' | 'en' | 'es')
  - função `setLanguage`
  - função `t(key)` para buscar texto
  - persistência em `localStorage`
- Envolver `App.tsx` com `LanguageProvider`.
- Atualizar cada seção (`HeroSection`, `AboutSection`, `ServicesSection`, `HowItWorksSection`, `BenefitsSection`, `PortfolioSection`, `CtaSection`, `ContactSection`, `Header`, `Footer`) para consumir `useLanguage()` e usar `t('chave.subchave')` em vez de strings fixas.
- Atualizar `<html lang>` dinamicamente conforme idioma selecionado.

### 4. Estrutura do seletor

```text
Desktop Header:
[Logo Agilo Nex]    [Sobre] [Serviços] ...    [🌐 PT ▾] [Fale Conosco]
                                                  │
                                                  ├─ 🇧🇷 Português
                                                  ├─ 🇺🇸 English
                                                  └─ 🇪🇸 Español
```

No mobile, o seletor aparece dentro do menu hamburguer, acima do botão "Fale Conosco".

### Arquivos a criar
- `src/i18n/translations.ts`
- `src/i18n/LanguageContext.tsx`
- `src/components/LanguageSwitcher.tsx`

### Arquivos a editar
- `src/App.tsx` (LanguageProvider)
- `src/components/Header.tsx` (logo + LanguageSwitcher)
- `src/components/Footer.tsx` (logo)
- `src/components/HeroSection.tsx`
- `src/components/AboutSection.tsx`
- `src/components/ServicesSection.tsx`
- `src/components/HowItWorksSection.tsx`
- `src/components/BenefitsSection.tsx`
- `src/components/PortfolioSection.tsx`
- `src/components/CtaSection.tsx`
- `src/components/ContactSection.tsx`
- `index.html` (title/meta)

