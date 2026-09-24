# Sprint Demo: интернет-магазин на Node.js

![CI](https://github.com/Reevan8899/sprint-demo-nodejs/actions/workflows/pr-check.yml/badge.svg)

Учебная индивидуальная имитация Scrum-спринта. Автор: Reevan8899.
Node.js 24+, без внешних зависимостей. Данные хранятся в памяти до завершения процесса.

## Функциональность
### Каталог
Три товара с ценами и поиск по ID.

## Запуск
```bash
npm ci
npm run check
npm test
npm run coverage
npm run demo
```

`demo` станет доступен после интеграции всех фич. Это учебная библиотека с CLI-демонстрацией, не веб-магазин.

## Процесс
`feature/* -> sprint-1 -> main`. Фичи объединяются через Pull Request.
Цель и критерии: [docs/sprint-1-goal.md](docs/sprint-1-goal.md).
