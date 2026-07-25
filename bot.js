const mineflayer = require('mineflayer');

// Server ma'lumotlari to'g'ridan-to'g me'yorlandi
const config = {
    serverHost: 'Uzlegend2.aternos.me',
    serverPort: 50273,
    botUsername: 'AFK_Bot',
    botChunk: 2
};

function startBot() {
    const bot = mineflayer.createBot({
        host: config.serverHost,
        port: config.serverPort,
        username: config.botUsername,
        auth: 'offline',
        version: false,
        viewDistance: config.botChunk
    });

    let movementPhase = 0;
    const STEP_INTERVAL = 1500;
    const STEP_SPEED = 1;
    const JUMP_DURATION = 500;

    bot.on('spawn', () => {
        setTimeout(() => {
            bot.setControlState('sneak', true);
            console.log(`✅ ${config.botUsername} is Ready and online!`);
        }, 3000);

        setTimeout(movementCycle, STEP_INTERVAL);
    });

    function movementCycle() {
        if (!bot.entity) return;

        switch (movementPhase) {
            case 0:
                bot.setControlState('forward', true);
                bot.setControlState('back', false);
                bot.setControlState('jump', false);
                break;
            case 1:
                bot.setControlState('forward', false);
                bot.setControlState('back', true);
                bot.setControlState('jump', false);
                break;
            case 2:
                bot.setControlState('forward', false);
                bot.setControlState('back', false);
                bot.setControlState('jump', true);
                setTimeout(() => {
                    bot.setControlState('jump', false);
                }, JUMP_DURATION);
                break;
            case 3:
                bot.setControlState('forward', false);
                bot.setControlState('back', false);
                bot.setControlState('jump', false);
                break;
        }

        movementPhase = (movementPhase + 1) % 4;
        setTimeout(movementCycle, STEP_INTERVAL);
    }

    bot.on('error', (err) => {
        console.error('⚠️ Error:', err.message);
    });

    bot.on('end', () => {
        console.log('⛔ Bot Disconnected! 10 soniyadan keyin qayta ulanadi...');
        setTimeout(startBot, 10000);
    });
}

startBot();

// Jarayon GitHub Actions'da yopilib ketmasligi uchun keep-alive
setInterval(() => {}, 10000);
