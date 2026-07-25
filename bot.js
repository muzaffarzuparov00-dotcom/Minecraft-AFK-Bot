const bedrock = require('bedrock-protocol');
const config = require('./config.json');

function startBedrockBot() {
    console.log(`🚀 [${new Date().toLocaleTimeString()}] ${config.serverHost}:${config.serverPort} ga ulanish harakati...`);

    const client = bedrock.createClient({
        host: config.serverHost,
        port: config.serverPort,
        username: config.botUsername,
        offline: true,
        connectTimeout: 15000, // 15 soniyada ulanmasa taym-aut beradi
        version: '1.21.0'
    });

    client.on('spawn', () => {
        console.log(`✅ ${config.botUsername} SERVERGA kirdi va o'yinda paydo bo'ldi!`);
    });

    client.on('join', () => {
        console.log(`📡 Server bilan bog'lanish o'rnatildi...`);
    });

    client.on('disconnect', (reason) => {
        console.log('⛔ Bot uzildi:', reason, '- 10 soniyadan keyin qayta ulanadi...');
        setTimeout(startBedrockBot, 10000);
    });

    client.on('error', (err) => {
        console.log('⚠️ Ulanishda xatolik:', err.message || err);
        // Osilib qolmasligi uchun xato bo'lsa darhol qayta ulanadi
        setTimeout(startBedrockBot, 10000);
    });
}

startBedrockBot();

setInterval(() => {}, 10000);
