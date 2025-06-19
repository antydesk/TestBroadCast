
# Laravel Reverb Test (Vite + Laravel Echo + Pusher)

Простой проект для тестирования подписки на события Laravel Broadcasting с помощью Laravel Echo и Pusher (Reverb), построенный на Vite.

---

## Описание

Этот проект подключается к реальному времени через WebSocket, слушает событие из Laravel (broadcast event) и отображает полученные данные в браузере.

---

## Установка

1. Клонируйте репозиторий:

```bash
git clone https://github.com/antydesk/TestBroadCast.git
cd TestBroadCast
```

2. Установите зависимости:

```bash
npm install
```

3. Создайте файл `.env` в корне проекта и заполните переменные окружения:

```env
VITE_BROADCASTER=reverb
VITE_PUSHER_KEY=
VITE_WS_HOST=localhost
VITE_WS_PORT=8080
VITE_FORCE_TLS=false
VITE_DISABLE_STATS=true

VITE_CHANNEL=product.status.117

# ⚠️ Важно: точка в начале VITE_EVENT обязательна для Echo!
VITE_EVENT=.ProductStatusEvent

VITE_PRIVATE_CHANNEL=product.private.status.117
VITE_PRIVATE_EVENT=.ProductStatusPrivateEvent

VITE_ACCESS_TOKEN=

VITE_AUTH_ENDPOINT=http://localhost:8000/broadcasting/auth
```

---

## Запуск

```bash
npm run dev
```

По умолчанию сервер Vite запустится на [http://localhost:3000](http://localhost:3000)

---

## Как работает

- В `app.js` создается экземпляр Laravel Echo с настройками из `.env`.
- Подписываемся на публичный канал `VITE_CHANNEL` и слушаем событие `VITE_EVENT`.
- В private.app.js создается отдельный экземпляр Echo для подписки на приватный канал `VITE_PRIVATE_CHANNEL` с событием `VITE_PRIVATE_EVENT`.
- При получении события в элемент с id `event-container` добавляется новый блок с данными.
- Если данные приходят в формате JSON строки — происходит парсинг, иначе — выводим как есть.

---

## Структура проекта

```
├── app.js              # Основной js-файл с настройками Laravel Echo
├── private.app.js      # JS-файл для работы с приватными каналами (если используется)
├── index.html          # Главная HTML-страница
├── LICENSE             # Лицензия проекта
├── package.json        # Конфигурация npm
├── package-lock.json   # Lock-файл зависимостей npm
├── README.md           # Документация проекта
├── vite.config.js      # Настройки Vite
├── .env                # Переменные окружения (не добавлять в репозиторий)
├── .env.example        # Пример файла с переменными окружения
├── .gitignore          # Файл для игнорирования в git
└── node_modules/       # Зависимости (игнорируются git)
```

---

## Полезные команды

- `npm install` — установка npm-зависимостей
- `npm run dev` — запуск дев-сервера Vite с хот-релоадом

---

## Важные моменты

- В Laravel Broadcasting для Laravel Echo важно, чтобы в переменной `VITE_EVENT` и `VITE_PRIVATE_EVENT` был точный event name с точкой в начале — например, `.ProductStatusEvent`.
- Канал и событие должны совпадать с теми, что рассылает Laravel backend.
- Переменные `VITE_WS_HOST` и `VITE_WS_PORT` должны указывать на ваш WebSocket сервер (например, Pusher/Reverb или локальный WebSocket).
- Для приватных каналов обязательно корректно настроить `VITE_AUTH_ENDPOINT` и передавать актуальный `VITE_ACCESS_TOKEN`.

---

## Лицензия

MIT

---
