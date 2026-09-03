# LGPD: os riscos reais e como a gente constrói software que respeita a lei

A LGPD (Lei 13.709/2018) não é burocracia. É lei. E quem ignora paga caro — no bolso e na reputação.

Aqui a gente explica direto: o que acontece se você não se adequa, o que a lei pede na prática e como nosso time desenvolve software **dentro da LGPD desde o primeiro commit**.

---

## Por que se preocupar agora?

**Multas de verdade**  
Até 2% do faturamento bruto (teto de R$ 50 mi por infração). A ANPD já multou. Vai multar mais.

**Reputação vai pro brejo**  
Vazou dado? Cliente perde a confiança. Parceiro pensa duas vezes antes de fechar contrato. Concorrente que já está adequado leva a vaga.

**Processo judicial**  
Titular de dado pode processar por dano moral e material. Ação civil pública também existe.

**Perde competitividade**  
Licitação pública, contrato B2B, parceria internacional — tudo pede conformidade. Quem não tem, fica de fora.

---

## O que a LGPD exige (traduzido para dev)

| Princípio | No código significa |
|-----------|---------------------|
| Finalidade | Só coleta o que precisa pro que prometeu |
| Adequação | Tratamento compatível com o que foi avisado |
| Necessidade | Não guarda "por precaução" — minimização |
| Livre acesso | API pro usuário ver, corrigir, baixar, apagar |
| Qualidade | Dado certo, atualizado, relevante |
| Transparência | Privacy policy legível, termos acessíveis |
| Segurança | Criptografia, controle de acesso, log de auditoria, plano de incidente |
| Prevenção | Privacy by Design e by Default |
| Não discriminação | Não usa dado pra discriminar ilegalmente |
| Responsabilização | Documenta decisões, mantém ROPA, tem DPO |

---

## Como a gente faz na prática

### 1. Privacy by Design de verdade
- Schema enxuto: só campo essencial
- Pseudonimização e anonimização no banco, na API, nos logs
- DPIA (avaliação de impacto) pra feature de risco

### 2. Consentimento granular, não "aceito tudo"
- Separado por finalidade: marketing, analytics, operacional
- Revogável a qualquer momento
- Audit trail imutável: quem consentiu, quando, qual versão do termo, IP

### 3. Direitos do titular viram endpoint
```
GET  /me/data        → portabilidade (JSON/CSV)
PATCH /me/data       → correção
DELETE /me/data      → exclusão com cascade seguro
POST /me/consent/withdraw → revoga consentimento
```

### 4. Segurança em camadas
- AES-256 em repouso, TLS 1.3 no trânsito
- Secrets no Vault / AWS Secrets Manager — **nunca no código**
- RBAC + ABAC (menor privilégio sempre)
- Log de acesso a dado sensível imutável (WORM) + SIEM

### 5. Governança que roda sozinha
- Data mapping automatizado: sabe onde cada dado pessoal mora
- Retenção e exclusão por TTL + jobs agendados
- Pentest periódico + varredura de segredo no CI/CD

### 6. ROPA viva
- Registro de atividades de tratamento versionado no repo
- Atualizado a cada release que mexe em dado pessoal

### 7. Cultura, não checklist
- Onboarding de LGPD pra todo dev (4h + recertificação anual)
- Code review tem checklist de privacidade
- Simulação de incidente trimestral

---

## Checklist pra sua próxima feature

```
[ ] DPIA feita se risco alto
[ ] Schema só com o necessário
[ ] Consentimento granular funcionando
[ ] Endpoints de direitos do titular testados
[ ] Criptografia em repouso e trânsito
[ ] Log de auditoria sem vazar dado sensível
[ ] Retenção/exclusão automática configurada
[ ] ROPA atualizada
[ ] Code review com checklist de privacidade aprovado
[ ] Testes cobrindo consentimento e exclusão
```

---

## Resumo

Software que respeita privacidade **não trava entrega**. Código limpo, auditável, confiável.

A gente trata conformidade como **feature**, não como correção de bug. Cada linha passa pelo crivo de privacidade antes de subir.

---

### Precisa adequar seu produto sem parar o roadmap?

**Chama a gente.** Ajudamos times de produto e engenharia a botar Privacy by Design pra rodar — da modelagem ao deploy.

📧 **contato@digitalgrowthpartners.com.br**  
🌐 **digitalgrowthpartners.com.br**

---

*Informação geral, não substitui assessoria jurídica.*