
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// 665856759:AAGDLP9ux5AgFScbdhMAQwOLxM6VWajExEk

console.log('\033c');

const brain = require('brain.js');
const fs = require('fs');
const net = new brain.recurrent.LSTM();
console.log("Loading file...")
fs.readFile('emotion.json', (err, data) => {
  console.log(err)
  if(!err) {
    console.log("Loaded!")
    net.fromJSON(JSON.parse(data));
    rl.question('Enter:  ', (answer) => {
      // TODO: Log the answer in a database
      console.log("OUTPUT: "+net.run(answer));

      rl.close();
    });
  }
})
// console.log("Training...");
// const date = new Date();
// net.train([
//   "how are you",
//   "i am fine",
//   "will you go there",
//   "i dont know",
//   "welcome",
//   "hello"
  
// ], {
//                             // Defaults values --> expected validation
//       iterations: 1000,    // the maximum times to iterate the training data --> number greater than 0
//       errorThresh: 1.0,   // the acceptable error percentage from training data --> number between 0 and 1
//       log: true,           // true to use console.log, when a function is supplied it is used --> Either true or a function
//       logPeriod: 10,        // iterations between logging out --> number greater than 0
//       learningRate: 1,    // scales with delta to effect training rate --> number between 0 and 1
//       momentum: 1,        // scales with next layer's change value --> number between 0 and 1
//       callback: null,       // a periodic call back that can be triggered while training --> null or function
//       callbackPeriod: 10,   // the number of iterations through the training data between callback calls --> number greater than 0
//       timeout: Infinity     // the max number of milliseconds to train for --> number greater than 0
// });
// fs.writeFile('emotion.json', JSON.stringify(net.toJSON()), (err) => {
//   if(!err) console.log("File Written");
// });

// console.log(`Trained in ${new Date() - date}ms`);
