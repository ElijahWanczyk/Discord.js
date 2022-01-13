const { Client, MessageEmbed } = require('discord.js');
const config = require('./config');
const commands = require('./help');

let bot = new Client({
  fetchAllMembers: true, // Remove this if the bot is in large guilds.
  presence: {
    status: 'online',
    activity: {
      name: `${config.prefix}help or hp`,
      type: 'PLAYING'
    }
  }
});

bot.on('ready', () => console.log(`Logged in as ${bot.user.tag}.`));

bot.on('message', async message => {
  // Check for command
  if (message.content.startsWith(config.prefix)) {
    let args = message.content.slice(config.prefix.length).split(' ');
    let command = args.shift().toLowerCase();

    switch (command) {
      case 'ping':
        let msg = await message.reply('Pinging...');
        await msg.edit(`PONG! Message round-trip took ${Date.now() - msg.createdTimestamp}ms.`)
        break;
      
      case 'pong':
        let gsm = await message.reply('Ponging...');
        await gsm.edit(`PING! https://bit.ly/3mo5YM4`)
        break;

      case 'rick':
        let mgs = await message.reply('Ricking...');
        await mgs.edit(`bit.ly/31CzAhy`)
        break;       

      case 'stickbug':
        let mesg = await message.reply('Bugging...');
        await mesg.edit(`bit.ly/3ye6vF9`)
        break;       
      
      case 'info':
        let info = await message.reply('Created on ??/??/20??, and created by Discorduser#0000!'); // put the date as what month/day/year or day/month/year you made the bot, and put your discord username and tag.
        break;       

      case 'say':
      case 'repeat':
        if (args.length > 0)
          message.channel.send(args.join(' '));
        else
          message.reply('You did not send a message with the repeat or say command, cancelling command.')
        break

      /* Unless you know what you're doing, don't change this command. */
      case 'hp':
      case 'help':
        let embed =  new MessageEmbed()
          .setTitle('HELP MENU')
          .setColor('GREEN')
          .setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
          .setThumbnail(bot.user.displayAvatarURL());
        if (!args[0])
          embed
            .setDescription(Object.keys(commands).map(command => `\`${command.padEnd(Object.keys(commands).reduce((a, b) => b.length > a.length ? b : a, '').length)}\` :: ${commands[command].description}`).join('\n'));
        else {
          if (Object.keys(commands).includes(args[0].toLowerCase()) || Object.keys(commands).map(c => commands[c].aliases || []).flat().includes(args[0].toLowerCase())) {
            let command = Object.keys(commands).includes(args[0].toLowerCase())? args[0].toLowerCase() : Object.keys(commands).find(c => commands[c].aliases && commands[c].aliases.includes(args[0].toLowerCase()));
            embed
              .setTitle(`COMMAND - ${command}`)

            if (commands[command].aliases)
              embed.addField('Command aliases', `\`${commands[command].aliases.join('`, `')}\``);
            embed
              .addField('DESCRIPTION', commands[command].description)
              .addField('FORMAT', `\`\`\`${config.prefix}${commands[command].format}\`\`\``);
          } else {
            embed
              .setColor('RED')
              .setDescription('This command does not exist. Please use the help command without specifying any commands to list them all.');
          }
        }
        message.channel.send(embed);
        break;
    }
  }
});

require('./server')();
bot.login(config.token);
