console.log('\033c');
const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });


// 
require('./config')
const telegraf = require('telegraf');
const bot = new telegraf(process.env.BOT_TOKEN, {
    username: process.env.BOT_USERNAME
});
bot.telegram.getMe().then((self) => {
	bot.self = self;
});
bot.startPolling();
const config = {
    inputSize: 50,
    inputRange: 20,
    hiddenSizes:[20,20],
    outputSize: 10,
    learningRate: 0.01,
    decayRate: 0.999,
}
bot.command('start', async(ctx) => {
	console.log('test')
	ctx.reply("Sorry, I am still learning.");
})
// bot.telegram.sendMessage( -1001193338541, 'Hi')
const brain = require('brain.js');
const fs = require('fs');
const net = new brain.recurrent.LSTM(config);

const date = new Date();

var array = [];
fs.readFile('learned.json', async (err, data) => {
	if(err) return console.log(err)
	if(data.toString() === '') {
		train();
	} else {
		console.log("Network already trained...");
		fs.readFile('learned.json', (err, data) => {
			data = data.toString();
			net.fromJSON(JSON.parse(data));
			boot();
		})
	}
});
 
const train = async (data) => {
   	net.train([
	  { input: 'I feel great about the world!', output: 'happy' },
	  { input: 'The world is a terrible place!', output: 'sad' },
	], {			                            // Defaults values --> expected validation
	      iterations: 1000,    // the maximum times to iterate the training data --> number greater than 0
	      errorThresh: 0.1,   // the acceptable error percentage from training data --> number between 0 and 1
	      log: true,           // true to use console.log, when a function is supplied it is used --> Either true or a function
	      logPeriod: 10,        // iterations between logging out --> number greater than 0
	      learningRate: 1,    // scales with delta to effect training rate --> number between 0 and 1
	      momentum: 1,        // scales with next layer's change value --> number between 0 and 1
	      callback: null,       // a periodic call back that can be triggered while training --> null or function
	      callbackPeriod: 10,   // the number of iterations through the training data between callback calls --> number greater than 0
	      timeout: Infinity     // the max number of milliseconds to train for --> number greater than 0
	});

	fs.writeFile('learned.json', JSON.stringify(net.toJSON()), (err) => {
	  if(!err) console.log("File Written");
	});
	console.log(`Trained in ${ (new Date() - date ) / 1000} s`);

	boot();
}
const boot = async () => {
	bot.on('message', async(ctx) => {
		const text = ctx.message.text;
		console.log("Running: "+text)
		if (ctx.message.reply_to_message) {
            if (typeof text !== 'undefined' && !text.match(/^[a-zA-Z0-9]/i)) return;
            if (ctx.message.reply_to_message.from.id === bot.self.id) {
            	var res;
            	if(typeof text === 'undefined') return;
            	try {
            		res = net.run(text);
            		ctx.reply(res, {parse_mode: null})
            	} catch(e) {
            		console.log(e)
            		ctx.reply("Sorry, I dont know that.")
            	}
            	console.log(res)
        	}
        }
	});
	bot.command('start', async(ctx) => {
		ctx.reply(`Hi, ${ctx.from.first_name}. I am up and running`);
	})
}