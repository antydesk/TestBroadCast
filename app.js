import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: import.meta.env.VITE_BROADCASTER,
    key: import.meta.env.VITE_PUSHER_KEY,
    wsHost: import.meta.env.VITE_WS_HOST,
    wsPort: parseInt(import.meta.env.VITE_WS_PORT),
    forceTLS: import.meta.env.VITE_FORCE_TLS === 'true',
    disableStats: import.meta.env.VITE_DISABLE_STATS === 'true',
});

const channelName = import.meta.env.VITE_CHANNEL;
const eventName = import.meta.env.VITE_EVENT;

window.Echo.channel(channelName)
    .listen(eventName, e => {
        console.log('Raw event:', e);

        const container = document.getElementById('event-container');
        if (!container) return;

        let parsedData;

        // 1. Если e.data есть и это строка (похоже на JSON)
        if (e?.data && typeof e.data === 'string') {
            try {
                parsedData = JSON.parse(e.data); // пробуем распарсить e.data
            } catch (error) {
                parsedData = { note: 'data was a string but not JSON', raw: e.data };
            }
        }

        // 2. Если e — это объект с ключами (типичный Laravel Broadcast)
        else if (typeof e === 'object' && e !== null) {
            parsedData = e;
        }

        // 3. Всё остальное — просто выводим как есть
        else {
            parsedData = { note: 'Unknown event format', raw: e };
        }

        // Выводим в DOM
        const eventDiv = document.createElement('div');
        eventDiv.style.border = '1px solid #ccc';
        eventDiv.style.padding = '10px';
        eventDiv.style.margin = '10px 0';
        eventDiv.style.background = '#f0f0f0';
        eventDiv.style.fontFamily = 'monospace';

        eventDiv.innerHTML = `<strong>Channel:</strong> ${channelName}<br><pre>${JSON.stringify(parsedData, null, 2)}</pre>`;

        container.appendChild(eventDiv);
    });


