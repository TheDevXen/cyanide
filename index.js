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
bot.on('text', async(ctx) => {
	console.log(ctx)
})
bot.startPolling();
const config = {
    inputSize: 50,
    inputRange: 20,
    hiddenSizes:[20,20],
    outputSize: 10,
    learningRate: 0.01,
    decayRate: 0.999,
}

const brain = require('brain.js');
const fs = require('fs');
const net = new brain.recurrent.LSTM(config);
// console.log("Loading file...")
// fs.readFile('emotion.json', (err, data) => {
//   console.log(err)
//   if(!err) {
//     console.log("Loaded!")
//     net.fromJSON(JSON.parse(data));
//     rl.question('Enter:  ', (answer) => {
//       // TODO: Log the answer in a database
//       console.log("OUTPUT: "+net.run(answer));

//       rl.close();
//     });
//   }
// })
console.log("Training...");
const date = new Date();
var array = [];
fs.readFile('learned.json', (err, data) => {
	if(err) return console.log(err)
	if(data.toString() === '') {
		fs.readFile('eassy.txt', (err, data) => {
			if(!err){
				data = data.toString();
				array = data.split('.');
				console.log("Data Length: " + array.length)
				net.train(array, {
				                            // Defaults values --> expected validation
				      iterations: 20000,    // the maximum times to iterate the training data --> number greater than 0
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

			}
		}) 
	} else {

	}
});



console.log(`Trained in ${ (new Date() - date ) / 10} s`);
