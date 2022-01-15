const Game = require('./lib/Game');

new Game().initializeGame();


// MORE ES6 THAT DIDN'T MAKE IT IN THIS MODULE --


// Array destructuring:
// const [first, second] = ['first item', 'second item'];



// Rest operator:
// const {name, ...details} = {name: 'Diane', occupation: 'Developer', location: 'USA'};



// Asynchronous promises:
// new Promise((resolve, reject) => {
//  setTimeout(() => {
//    resolve('success');
//  }, 2000);
// });



// CLASS KEYWORD:
// class Car {
//     constructor(make, model) {
//       this.make = make;
//       this.model = model;
//     }
  
//     honk() {
//       console.log('beep beep');
//     }
//   }
  
//   // car objects are still created and used the same way
//   const car = new Car('Honda', 'Civic');
//   car.honk();