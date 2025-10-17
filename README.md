# Teddy Web - App de Gestão de Clientes

---

## 📝 Sobre o Projeto

O **Teddy Web** é uma aplicação React (Vite + TypeScript) para gerenciar clientes. O usuário informa seu nome na tela inicial e navega para a lista de clientes, onde é possível cadastrar, editar, selecionar e excluir clientes, além de visualizar os clientes selecionados em uma outra tela.

Este projeto foi desenvolvido contemplando os seguintes requisitos:

## Tecnologias obrigatórias
- React + Vite (última versão)
- TypeScript
- Aplicação responsiva (mobile-first)
- Docker (para containerizar o front)
- Deploy na Vercel

---

## 📱 Funcionalidades Principais

- Tela inicial com input para o usuário informar seu nome (com validações).
- Lista de clientes com **paginação** e controle de tamanho de página.
- **Cadastro** de clientes via modal com validações.
- **Edição** de clientes via modal.
- **Exclusão** de clientes com modal de confirmação.
- Visualização dos **clientes selecionados** em página dedicada.
- Navegação fluida entre telas com **React Router**.
- Componentes reutilizáveis.

---

## 🛠 Tecnologias e Ferramentas

- **React** + **Vite**
- **TypeScript**
- **React Router**
- **LocalStorage** para persistência de dados (username e clientes selecionados)
- **Tailwind CSS** v4
- **Axios**
- **TanStack Query (React Query)** para cache e gerenciamento de requisições
- **Vitest** + **Testing Library** para testes
- **ESLint**
- **Docker** + **Nginx** (produção)
- **Vercel** (deploy)
- **Git** para controle de versão

---

## 🏗️ Estrutura do Projeto

```plaintext
/src
  App.tsx
  Routes.tsx
  index.css
  main.tsx
  /api
    api.ts              # Configuração do Axios (baseURL, headers)
  /assets
    /img                # Imagens usadas na UI
  /components
    /Header
    /ClientCard
    /Pagination
    /SelectedClientCard
    /modals             # Modais de criação e exclusão
  /context
    SelectedClientsContext.tsx  # Contexto de seleção de clientes
  /pages
    /Home
    /Login
    /SelectedClients
  /types
    client.ts
  /utils
    currency.ts
```

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js (>= 18)
- npm (ou outro gerenciador de preferência)

### Instalação

```bash
git clone https://github.com/Michel-O-Cordeiro/teste-teddy.git
cd teste-teddy
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

### Build de produção

```bash
npm run build
```

### Preview do build

```bash
npm run preview
```

---

## 🧪 Testes e Lint

Executar testes (Vitest):

```bash
npm test
```

Testes em modo run único:

```bash
npm run test -- --run
```

Lint:

```bash
npm run lint
```

Setup de testes: `src/test/setup.ts` com `@testing-library/jest-dom/vitest`. Teste de Login cobre navegação, validações e persistência.

---

## ⚙️ Decisões Técnicas

- **Componentização:** Cada componente/tela possui responsabilidade única (ex.: `ClientCard`, `Pagination`, `Header`, modais).
- **Estado:** `useState` e `useEffect` para lógica local; 
- **Context API** (`SelectedClientsContext`) para seleção de clientes global com `useMemo`.
- **Estilos:** **Tailwind CSS v4** via `@import "tailwindcss"` em `index.css`, fonte Inter com pesos **400** e **700** para tipografia consistente.
- **Navegação:** **react-router-dom** com rotas para `Login`, `Home` e `SelectedClients`.
- **UX:** Feedbacks visuais de sucesso/erro; modais para criar/editar/deletar; paginação e controle de página.
- **Qualidade:** **ESLint** com regras recomendadas para JS/TS e React.
- **Requisições e cache:** **TanStack Query** para queries/mutações e invalidations de `["users"]`

---

