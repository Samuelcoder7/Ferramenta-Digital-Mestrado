
  # Projeto RADAR

# Projeto RADAR — (Roteiro de Apoio e Direcionamento para o Atendimento de Pessoas em Situação de Rua)

> Ferramenta digital para apoiar voluntários, ONGs e instituições que atuam com a população em situação de rua.

O Projeto RADAR (Roteiro de Apoio e Direcionamento para o Atendimento de Pessoas em Situação de Rua) é uma aplicação web desenvolvida para facilitar diagnósticos interativos, registrar perfis, gerar relatórios e oferecer métricas que ajudem no planejamento de ações sociais mais assertivas e baseadas em dados.

## 🌍 Objetivo Geral

Desenvolver uma plataforma interativa capaz de identificar, registrar e analisar informações sobre as necessidades prioritárias das pessoas em situação de rua, auxiliando organizações e voluntários a planejarem ações mais efetivas e humanas.

## 💡 Funcionalidades principais

- Diagnóstico Interativo: questionário digital que gera relatórios automáticos e personalizados.
- Perfil de Usuário (Voluntário): área para visualizar histórico, gráficos e progresso.
- Interface acessível e humanizada: design responsivo com foco em empatia social e usabilidade.
- Painel de Impacto Social: métricas e estatísticas das ações realizadas.
- Módulo de Feedback: canal para melhorar continuamente a ferramenta.

## 🎨 Identidade visual e diretrizes de estilo

Paleta de cores base:

- Verde-escuro: #1B4332 — equilíbrio e acolhimento
- Azul: #1E6091 — confiança e empatia
- Laranja: #F77F00 — energia e ação
- Cinza-claro: #F1F1F1 — leveza e legibilidade
- Marrom-terra: #7C5838 — calor humano
- Branco: #FFFFFF — contraste e clareza

Tipografia sugerida:

- Títulos: Poppins / Nunito Sans
- Textos: Open Sans / Roboto

Estilo geral: minimalista, responsivo e acolhedor, com margens generosas, ícones sutis e ilustrações flat que transmitam empatia e inclusão.

## 🧱 Estrutura do projeto (ajustada ao repositório atual)

Raiz do projeto (exemplo resumido):

```
index.html
package.json
vite.config.ts
README.md
src/
  ├─ main.tsx
  ├─ App.tsx
  ├─ index.css
  ├─ assets/
  ├─ components/
  │   ├─ Header.tsx
  │   ├─ Footer.tsx
  │   ├─ Hero.tsx
  │   ├─ DiagnosticPage.tsx
  │   ├─ ProfilePage.tsx
  │   └─ ui/ (componentes reutilizáveis)
  └─ styles/
      └─ globals.css
```

Observações:

- As páginas e componentes estão em `src/components/` (várias páginas .tsx e componentes UI).
- Estilos globais estão em `src/styles/globals.css` e `src/index.css`.
- O projeto usa Vite como bundler/dev server.

## 🧰 Tecnologias utilizadas

- Vite (dev server e build)
- React (biblioteca de UI)
- TypeScript (arquivos .tsx presentes)
- Radix UI (conjunto de primitives: acordeões, diálogos, popovers etc.)
- Recharts / outras libs de visualização de dados
- CSS (arquivo global e modular) — possível uso de utilitários/integrações (ver `package.json`)
- Figma (projeto de UI/identidade visual)

Dependências notáveis (ver `package.json`): Radix UI, lucide-react, react-hook-form, embla-carousel-react, recharts, sonner, entre outras.

## ⚙️ Scripts úteis

Os scripts disponíveis (conforme `package.json`):

- npm run dev  — inicia o servidor de desenvolvimento (Vite)
- npm run build — gera o build de produção

Como rodar localmente (Windows / PowerShell):

```powershell
# instalar dependências
npm install

# iniciar servidor de desenvolvimento
npm run dev

# para gerar build de produção
npm run build

# (opcional) pré-visualizar build gerado
# npx vite preview
```

Se você usa outro gerenciador (yarn, pnpm), adapte os comandos conforme necessário.

## ✅ Requisitos de acessibilidade e usabilidade

- Preferir marcação semântica (header, main, nav, footer, form, fieldset, legend).
- Garantir contraste de cores e tamanho de fonte legível.
- Navegabilidade por teclado e suporte a leitores de tela (aria-labels, roles, estados).
- Formulários com validação e mensagens de erro claras e amigáveis.

## 🤝 Como contribuir

Contribuições são muito bem-vindas — este é um projeto de caráter social e colaborativo. Sugestões comuns:

1. Abra uma issue descrevendo o problema ou a sugestão.
2. Faça um fork e crie uma branch com um nome claro: `feat/nome-da-funcionalidade` ou `fix/descritivo`.
3. Execute os passos abaixo para testar localmente, faça suas alterações e crie um Pull Request.

Checklist para PRs:

- Descrição curta do que foi implementado.
- Prints ou GIFs demonstrando a UI, quando aplicável.
- Passos para testar (se necessário).
- Evidência de acessibilidade (teclas, leitores, contrastes) quando afetar a interface.

## 🛠️ Guia rápido para manter consistência

- Use componentes de `src/components/ui` para elementos reutilizáveis.
- Mantenha CSS modular e prefira classes semânticas.
- Documente novas dependências no `package.json` e explique o propósito no PR.

## 📜 Licença

Este projeto está licenciado pela licença MIT — uso educacional e social é incentivado.

## 📬 Contato

Coordenação: Projeto RADAR

E-mail: contato@projetoradar.org

Site oficial: Em desenvolvimento

---


