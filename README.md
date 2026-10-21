# StudyHub API

Projeto de estudo de TypeScript, Fastify, REST, GraphQL e Prisma,
construído em módulos. Cada módulo tem sua teoria e seus commits.

## Tecnologias

| Ferramenta | Função                                |
| ---------- | ------------------------------------- |
| Node.js 24 | Executa o JavaScript                  |
| TypeScript | Tipagem estática, com `strict` ligado |
| Fastify 5  | Servidor HTTP                         |
| Zod 4      | Validação das variáveis de ambiente   |
| ESLint 10  | Qualidade do código                   |
| Prettier 3 | Formatação do código                  |
| tsx        | Execução de TypeScript com recarga    |

## Como rodar

```bash
git clone git@github.com:fabricio948/studyhub-api.git
cd studyhub-api
npm install
cp .env.example .env
npm run dev
```

Teste a rota de saúde:

```bash
curl -i http://127.0.0.1:3333/health
```

## Scripts

| Script               | O que faz                                       |
| -------------------- | ----------------------------------------------- |
| `npm run dev`        | Roda o TypeScript direto, reiniciando ao salvar |
| `npm run build`      | Compila `src/` para `dist/`                     |
| `npm start`          | Roda o código compilado                         |
| `npm run start:safe` | Corrige, verifica, compila e roda               |
| `npm run check`      | Confere tipos, lint e formatação                |
| `npm run fix`        | Aplica as correções do ESLint e do Prettier     |

## Estrutura

```
src/
├── index.ts                    # Inicia a aplicação
├── app.ts                      # Classe App: servidor e rotas
├── config/env.ts               # Validação do .env com Zod
└── modules/health/             # Rota GET /health
```

## Padrão de commits

Conventional Commits: `feat`, `fix`, `chore`, `docs`, `style`,
`refactor` e `test`.

## Progresso

O acompanhamento dos módulos está em [CRONOGRAMA.md](CRONOGRAMA.md).
