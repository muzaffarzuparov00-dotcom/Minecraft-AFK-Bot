const bedrock = require('bedrock-protocol');

const serverHost = 'Uzlegend2.aternos.me';
const serverPort = 50273; // Aternos Bedrock portingiz
const botUsername = 'AFK_Bot';

function startBedrockBot() {
    console.log('🚀 Bedrock (1.21.0) serverga ulanish boshlandi...');

    const client = bedrock.createClient({
        host: serverHost,
        port: serverPort,
        username: botUsername,
        offline: true,       // Cracked (litsenziyasiz) serverlar uchun
        version: '1.21.0'    // Serveringizning aniq Bedrock versiyasi
    });

    client.on('join', () => {
        console.log(`✅ ${botUsername} Bedrock serverga muvaffaqiyatli kirdi va AFK turibdi!`);
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

// GitHub Actions jarayoni to'xtab qolmasligi uchun keep-alive
setInterval(() => {}, 10000);

                
