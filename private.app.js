import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: import.meta.env.VITE_BROADCASTER, // например: "pusher" или "reverb"
    key: import.meta.env.VITE_PUSHER_KEY || '',     // оставь пустым, если Reverb
    wsHost: import.meta.env.VITE_WS_HOST,
    wsPort: parseInt(import.meta.env.VITE_WS_PORT),
    forceTLS: import.meta.env.VITE_FORCE_TLS === 'true',
    disableStats: import.meta.env.VITE_DISABLE_STATS === 'true',

    // 👇 для авторизации приватных каналов
    authEndpoint: import.meta.env.VITE_AUTH_ENDPOINT || 'http://localhost:8000/broadcasting/auth',
    auth: {
        headers: {
            Authorization: 'Bearer ' + import.meta.env.VITE_ACCESS_TOKEN
        }
    }
});

// 👇 Приватный канал и имя события
const privateChannel = import.meta.env.VITE_PRIVATE_CHANNEL; // например: product.private.status.117
const eventName = import.meta.env.VITE_PRIVATE_EVENT;        // например: .ProductStatusPrivateEvent

// 👇 Подписка на приватный канал
window.Echo.private(privateChannel)
    .listen(eventName, (e) => {
        console.log('Received private event:', e);

        const container = document.getElementById('event-container');
        if (!container) return;

        let parsedData;

        if (e?.data && typeof e.data === 'string') {
            try {
                parsedData = JSON.parse(e.data);
            } catch (error) {
                parsedData = { note: 'data was a string but not JSON', raw: e.data };
            }
        } else if (typeof e === 'object' && e !== null) {
            parsedData = e;
        } else {
            parsedData = { note: 'Unknown event format', raw: e };
        }

        const eventDiv = document.createElement('div');
        eventDiv.style.border = '1px solid #ccc';
        eventDiv.style.padding = '10px';
        eventDiv.style.margin = '10px 0';
        eventDiv.style.background = '#f0f0f0';
        eventDiv.style.fontFamily = 'monospace';

        eventDiv.innerHTML = `
            <strong>Private Channel:</strong> ${privateChannel}<br>
            <pre>${JSON.stringify(parsedData, null, 2)}</pre>
        `;
        container.appendChild(eventDiv);
    });
