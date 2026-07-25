const bedrock = require('bedrock-protocol');
const config = require('./config.json');

function startBedrockBot() {
    console.log('🚀 Bedrock (1.21.0) serverga ulanish boshlandi...');

    const client = bedrock.createClient({
        host: config.serverHost,
        port: config.serverPort,
        username: config.botUsername,
        offline: true,       // Cracked serverlar uchun
        version: '1.21.0'    // Serveringizning Bedrock versiyasi
    });

    client.on('join', () => {
        console.log(`✅ ${config.botUsername} Bedrock serverga muvaffaqiyatli kirdi!`);
    });

    client.on('text', (packet) => {
        if (packet.message) {
            console.log(`[CHAT]: ${packet.message}`);
        }
    });

    client.on('disconnect', (reason) => {
        console.log('⛔ Bot uzildi:', reason, '- 10 soniyadan keyin qayta ulanadi...');
        setTimeout(startBedrockBot, 10000);
    });

    client.on('error', (err) => {
        console.log('⚠️ Xatolik:', err.message || err);
    });
}

startBedrockBot();

// GitHub Actions o'chib ketmasligi uchun keep-alive
setInterval(() => {}, 10000);
