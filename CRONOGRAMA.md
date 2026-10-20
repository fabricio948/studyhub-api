# Cronograma de Estudos: TypeScript, Fastify, REST, GraphQL e Prisma

> Documento vivo. A cada módulo concluído, atualize a tabela de status e o registro de progresso no final.

**Legenda:** ⬜ não iniciado | 🟨 em andamento | ✅ concluído

**Ponto de partida:** Linux Mint, com Node.js, Docker e VS Code já instalados. Nada será instalado do zero; no Módulo 1 apenas conferimos as versões.

---

## 1. Visão geral

| # | Módulo / Projeto | Foco principal | Entrega | Branch | Status |
|---|---|---|---|---|---|
| M1 | Ambiente de trabalho | TypeScript, ESLint, Prettier, `.vscode`, `.env` com Zod, Git/GitHub, Fastify mínimo | Repositório-base reutilizável | `module-1-ambiente` | ⬜ |
| M2 | HTTP e REST | Métodos, status codes, headers, idempotência, rotas e plugins do Fastify | Rotas de exemplo testadas com `curl` | `module-2-http-rest` | ⬜ |
| M3 | Camadas, MVC e SOLID | Controller, Service, Repository, injeção de dependência, SOLID | Esqueleto de arquitetura explicável | `module-3-arquitetura` | ⬜ |
| M4 | Banco de dados | Modelagem, relacionamentos, `onDelete`, soft delete, Prisma, MySQL no Docker | Modelagem no papel + migrations | `module-4-banco` | ⬜ |
| P1 | Projeto 1: To-do List (REST) | CRUD completo em camadas | API funcionando e testada | `project-1-todolist` | ⬜ |
| P2 | Projeto 2: Locadora de Veículos (REST) | Regras de negócio, status, transações, design patterns | API funcionando e testada | `project-2-locadora` | ⬜ |
| P3 | Projeto 3: Biblioteca (GraphQL) | Schema, resolvers, REST vs GraphQL | API GraphQL funcionando | `project-3-biblioteca-graphql` | ⬜ |
| M5 | IA | Prompts, Skills, MCP, RAG | Integração com uma das APIs | `module-5-ia` | ⬜ |

O tema do Projeto 3 (Biblioteca) pode ser trocado antes de chegarmos nele.

---

## 2. Como cada módulo funciona (estrutura fixa)

Todo módulo, do primeiro ao último, segue o mesmo roteiro. Isso mantém a sequência e o aprendizado.

| Parte | O que contém |
|---|---|
| 1. Objetivo | O que você sabe fazer ao final |
| 2. Teoria | Conceitos explicados antes de qualquer código |
| 3. Passo a passo | Pastas e arquivos criados pelo terminal; o código você digita manualmente no VS Code |
| 4. Comandos explicados | Cada comando de rodar/testar, com: o que faz, por que usamos e o que esperamos ver |
| 5. Dicas | Erros comuns e como diagnosticar |
| 6. Git detalhado | O que acontece em cada comando (área de trabalho, staging, commit, remoto) |
| 7. Checklist | Só avança para o próximo módulo com tudo marcado |
| 8. Registro | Data, dificuldades e o que revisar |

**Por que o código é digitado à mão:** digitar força a leitura de cada linha, e você percebe os erros de sintaxe e os nomes. O terminal cria a estrutura (`mkdir`, `touch`) para você praticar a navegação e entender a organização de pastas.

---

## 3. Regras de estudo

- Só avança de módulo quando o checklist estiver completo e tudo funcionando.
- Antes de cada configuração, as versões e a sintaxe são conferidas na documentação oficial.
- Sempre classes TypeScript, com uma responsabilidade por classe.
- Código em pequenos pedaços, cada um com explicação do que faz e por quê.
- Padrão de formatação: aspas duplas, ponto e vírgula, 2 espaços de indentação.
- Cada alteração relevante vira um commit no padrão Conventional Commits.
- Este `CRONOGRAMA.md` e o `README.md` são atualizados ao fim de cada módulo.

---

## 4. Foco constante (do M1 ao M5)

| Tema | Como aparece ao longo do estudo |
|---|---|
| Arquitetura de software | M1: organização de pastas. M3: camadas e MVC. Projetos: uma arquitetura definida e justificada por API |
| SOLID | M3: cada princípio com exemplo. Projetos: aplicado e revisado a cada refatoração |
| Design patterns | M3: Repository e injeção de dependência. P2: Strategy (cálculo de preço) e State (status do aluguel) |
| HTTP | M2: base. Todos os projetos: métodos, status codes e headers corretos |
| Modelagem de banco | M4: teoria. P1 e P2: aplicação. P3: reaproveitamento |
| IA | M5: prompts, Skills, MCP e RAG, aplicados a uma API que você já construiu |

---

## 5. Git: evolução por módulo

| Módulo | O que aprendemos de Git |
|---|---|
| M1 | `init`, `status`, `add`, `commit`, `log`, `remote`, `push`, `.gitignore`, o que são as áreas do Git |
| M2 | Branches, Pull Request no GitHub, `merge` |
| M3 | `git diff`, `git restore`, desfazer alterações com segurança |
| M4 | Commits pequenos e atômicos, `git revert` |
| P1 | Fluxo completo: branch → commits → PR → merge → deletar branch |
| P2 | Tags e releases, `git stash` |
| P3 | Resolução de conflitos, `git log` avançado |
| M5 | Revisão geral e boas práticas |

### Padrão de commits (Conventional Commits)

| Tipo | Quando usar | Exemplo |
|---|---|---|
| `feat` | Funcionalidade nova | `feat: adiciona rota de health` |
| `fix` | Correção de bug | `fix: corrige validação do .env` |
| `chore` | Configuração e ferramentas | `chore: configura eslint e prettier` |
| `docs` | README e documentação | `docs: atualiza cronograma do módulo 1` |
| `refactor` | Reorganizar sem mudar o comportamento | `refactor: separa controller do service` |
| `test` | Testes | `test: cobre criação de tarefa` |
| `style` | Formatação, sem mudança de lógica | `style: ajusta indentação` |

`fix` é apenas um dos tipos: só é usado quando existe um bug para corrigir.

---

## 6. Detalhe dos módulos

### M1: Ambiente de trabalho

**Objetivo:** ter um repositório-base configurado, versionado no GitHub e reutilizável.

**Teoria:**
- O que são Node.js, npm e `package.json`
- TypeScript: o que muda entre escrever em TS e rodar em JS; por que usar o modo `strict`
- ESLint (encontra erros e más práticas) vs Prettier (define o estilo): papéis diferentes, por que não brigam
- Variáveis de ambiente: por que o `.env` nunca vai para o Git e por que validar com Zod
- Git: área de trabalho, área de preparação (staging), repositório local e remoto

**Prática (em ordem):**
1. Conferir versões instaladas
2. Criar a pasta do projeto e iniciar o Git
3. `package.json` e `.gitignore`
4. TypeScript e `tsconfig.json`
5. Prettier
6. ESLint
7. `.vscode` (formatar ao salvar e extensões recomendadas)
8. `.env` e `.env.example` com validação Zod
9. Fastify mínimo (classe `App` e rota `GET /health`), se tudo acima estiver funcionando
10. README, primeiro push e primeiro Pull Request

**Checklist:**
- [ ] `node -v` e `npm -v` conferidos
- [ ] Projeto compila sem erros
- [ ] Lint e format rodam sem erros
- [ ] Salvar um arquivo no VS Code formata sozinho
- [ ] `.env` fora do Git, `.env.example` dentro
- [ ] Servidor sobe e `/health` responde
- [ ] Commits no padrão e branch enviada ao GitHub

---

### M2: HTTP e REST

**Teoria:** requisição e resposta, métodos (GET, POST, PUT, PATCH, DELETE), idempotência, status codes (2xx, 4xx, 5xx), headers, JSON, o que é REST e o que não é.
**Prática:** rotas no Fastify, testadas com `curl` (cada flag explicada), validação de entrada com Zod, tratamento de erros.
**Checklist:** cada rota devolve o status code correto; erros têm formato único.

### M3: Camadas, MVC e SOLID

**Teoria:** por que separar responsabilidades; MVC e onde ele se encaixa em uma API; Controller (`handle()`), Service (`execute()`), Repository; os 5 princípios SOLID com um exemplo cada; injeção de dependência.
**Prática:** reorganizar as rotas do M2 em camadas, sem mudar o comportamento.
**Checklist:** você explica, em voz alta, o papel de cada camada e aponta um princípio SOLID no código.

### M4: Banco de dados

**Teoria:** entidades, chaves primárias e estrangeiras, 1:1, 1:N, N:N, normalização básica, `onDelete` (Cascade, Restrict, SetNull), **quando excluir e quando desativar** (soft delete), índices, migrations.
**Prática:** MySQL no Docker, Prisma, modelagem desenhada no papel antes de virar código.
**Checklist:** primeiro o diagrama, depois o `schema.prisma`; migration aplicada; consulta funcionando.

### P1: To-do List (REST)

**Modelagem:** Usuário 1:N Tarefa; Tarefa N:N Tag; tarefa concluída é desativada (soft delete), não apagada.
**Entrega:** CRUD completo, em camadas, validado com Zod, persistido com Prisma.

### P2: Locadora de Veículos (REST)

**Modelagem:** Cliente, Veículo, Aluguel, Pagamento; veículo com status (disponível, alugado, manutenção).
**Teoria nova:** regras de negócio, transações, Strategy (cálculo do preço) e State (status do aluguel).
**Entrega:** API com regras de negócio testadas.

### P3: Biblioteca (GraphQL)

**Teoria:** schema, queries, mutations, resolvers; o problema que o GraphQL resolve em relação ao REST e quando ele não compensa.
**Entrega:** API GraphQL com os mesmos princípios de arquitetura dos projetos anteriores.

### M5: IA

**Teoria e prática:** engenharia de prompts, Skills, MCP (servidor que expõe uma API a um modelo) e RAG (busca de contexto antes de responder).
**Entrega:** uma funcionalidade de IA ligada a uma das APIs construídas.

---

## 7. Registro de progresso

| Data | Módulo | O que foi feito | Dificuldades | Revisar |
|---|---|---|---|---|
| | | | | |
