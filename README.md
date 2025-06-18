
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
- Подписываемся на канал `VITE_CHANNEL`.
- Слушаем событие `VITE_EVENT`.
- При получении события в элемент с id `event-container` добавляется новый блок с данными.
- Если данные приходят в формате JSON строки — происходит парсинг, иначе — выводим как есть.

---

## Структура проекта

```
├── app.js          # Основной js-файл с настройками Laravel Echo
├── index.html      # Главная html-страница
├── package.json    # Конфигурация npm
├── vite.config.js  # Настройки Vite
├── .env            # Переменные окружения (не добавлять в репозиторий)
└── node_modules/   # Зависимости (игнорируются git)
```

---

## Полезные команды

- `npm install` — установка npm-зависимостей
- `npm run dev` — запуск дев-сервера Vite с хот-релоадом

---

## Важные моменты

- В Laravel Broadcasting для Laravel Echo важно, чтобы в переменной `VITE_EVENT` был точный event name с точкой в начале — например, `.ProductStatusEvent`.
- Канал и событие должны совпадать с теми, что рассылает Laravel backend.
- Переменные `VITE_WS_HOST` и `VITE_WS_PORT` должны указывать на ваш WebSocket сервер (например, Pusher/Reverb или локальный WebSocket).

---

## Лицензия

MIT

---
