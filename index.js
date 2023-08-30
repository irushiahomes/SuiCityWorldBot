const { Client, Intents } = require('discord.js');
const client = new Client({
    disableEveryone: true, 
    intents: [ 
        Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ],
    ws: { properties: { $browser: "Discord iOS" } }
});

const prefix = "sui!" // ここはコマンドの接頭辞です。好きなものに変更しましょう
const token = "" // 自分のDiscordTokenを入力してください
// 起動した際に行う処理
client.on('ready', () => {
    console.log(`${client.user.tag}でログインしました`)
        // ステータスを設定
    // ステータスを設定
    client.user.setPresence({
        activities: [{ name: 'みんなGBANしちゃうぞ💕', type: 'PLAYING' }],
        status: 'idle'
    });
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    if (message.content.startsWith(`${prefix}gban`)) {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply('あなたに権限がありません');

        const gbanId = args[1]; // インデックスを修正
        const reason = args.slice(2).join(' '); // インデックスを修正
        if (!gbanId) return message.reply('GbanIDを入力してください');
        if (!reason) return message.reply('理由を入力してください');

        client.guilds.cache.forEach(g => {
            try {
                g.members.ban(gbanId, { reason });
                console.log(g.name + "でのGBANに成功しました");
            } catch (e) {
                console.log(g.name + "でのGBANの執行に失敗しました。\n" + e);
            }
        });

        message.reply('Gbanを執行しました'); // メッセージはループの外に移動
    }
});



client.login(token)
