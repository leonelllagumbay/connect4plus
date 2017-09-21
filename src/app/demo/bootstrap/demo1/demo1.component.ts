import { Component, OnInit, Input } from '@angular/core';
//import * as $ from 'jquery';
import {NgbModule, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

const now = new Date();
const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.scss']
})
export class Demo1Component implements OnInit {

  // Typeahead
  public model2: any;

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
        
  ngOnInit() {
    
  }
  
  ngAfterViewInit() {
    
  }

  @Input()
  public alerts: Array<IAlert> = [];

  private backup: Array<IAlert>;

  constructor() {
    this.alerts.push({
      id: 1,
      type: 'success',
      message: 'This is an success alert',
    }, {
      id: 2,
      type: 'info',
      message: 'This is an info alert',
    }, {
      id: 3,
      type: 'warning',
      message: 'This is a warning alert',
    }, {
      id: 4,
      type: 'danger',
      message: 'This is a danger alert',
    }, {
      id: 5,
      type: 'primary',
      message: 'This is a primary alert',
    }, {
      id: 6,
      type: 'secondary',
      message: 'This is a secondary alert',
    }, {
      id: 7,
      type: 'light',
      message: 'This is a light alert',
    }, {
      id: 8,
      type: 'dark',
      message: 'This is a dark alert',
    });
    this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));
  }

  public closeAlert(alert: IAlert) {
    console.log("alert", alert);
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
    
  }

  public reset() {
    this.alerts = this.backup.map((alert: IAlert) => Object.assign({}, alert));
  }
  
  // Datepicker
  model: NgbDateStruct;
  date: {year: number, month: number};

  selectToday() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }
  
  // Rating
  currentRate = 3.14;
  
  // Timepicker
  time = {hour: 13, minute: 30};
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}


// let, Block Scope
{
  console.log('This is a block scope');
} // This is not part of the block scope

// global scope
// var b = 0;
// function scope

// function hello() {
//   var a = 'function';
//   (function() {
//     var a = 'block';
//   })();
// }
// hello();
// console.log('hello ', a); // Cannot find name 'a'


// IIFE (Immediately Invoked Function Expression
// no block level scope for javascript  { var a = ""; } // a is defined here

// var a = '0';
// (function() { 
//   console.log('inside a is ', a);
//   var a = 'block';
// })(); // a will be different here ( 0 )
// console.log('value of a is ', a);



// Using let for block level scope

// var funcs = [];
// for (var i = 0; i < 5; i += 1) {
//   var y = i;
//   funcs.push(function() {
//     console.log('y here is ', y);
//   });
//   console.log('y now is ', y);
// }

// funcs.forEach(function(func) {
//   func();
// });


// const.
// "const" is a new keyword which declares a variable as constant over time.
// Immediately initialized with a value

const STATUS = 0;

// Block Scoping
// both let and const create variables that are block-scoped

// Immutable variable
// variable created by let and var are mutable (can change over time)
// variable created by const are immutable (can't point to another thing later on)


// const foo = {};
// foo = {} // TypeError: Assignment to constant variable



// const foo = {};
// foo['prop'] = 'Moo';
// console.log('however this works', foo);


// If we want the value of foo to be immutable we have to freeze it using

// const foo = Object.freeze({});
// foo['prop'] = 'Moo';
// console.log('Cannot add prop', foo);

// Template Strings
// Single line
let single = 'be single';
console.log('single value is ', single);

// Multiline strings
// let more = 'abc ' +
//             'def' +
//             'ghi';
// console.error('multiline the hard way ', more);

// In ES6, we can use the 'back tick' (`) character
// let more = `
//   hello
//   world
//   my
//   name
//   is
// `;
// console.error('multiline the easy way ', more);

// Variable Substitution using ${variable_name}
// Template strings are a small change to JavaScript in ES6 but the convenience
// of multi-line strings and variable substitution is substantial
// let name = 'Onel';
// let multi = `
//   hello
//   world
//   my
//   name
//   is
//   ${name}
// `;
// console.error('Using variable substitution ', multi);

// // Fat Arrow Functions
// setTimeout(function() { // anonymous function bcoz it doesnt have a name
//   console.warn('setTimeout called');
// }, 1000);
// setTimeout( () => {
//   console.warn('setTimeout called using fat arrow syntax');
// }, 5000);


// Arguments
// let add = function(a, b) {
//   return a + b;
// }

// Can now be written as
// let

// this
// const obj = {
//   name: 'Maria',
//   sayLater: function() {
//     console.warn('Her name is ', `${this.name}`);
//   }
// }
// obj.sayLater();

// Now lets imagine that we log the message using the setTimeout function
// const obj = {
//    name: 'Maria',
//    sayLater: function() {
//     setTimeout(function() {
//       console.warn(`Her name is ${this.name}`);
//     }, 1000);
//    }
//  }
//  obj.sayLater(); // undefined/empty
 // The reason for this is that the value of this in a function depends
// on how the function is called.
// The value of this is the calling context
// One solution is to assign this to self var like let self = this
// Another is to use the fat arrow

// const obj = {
//   name: 'Maria',
//   sayLater: function() {
//   setTimeout(() => {
//     console.log(`Timed out fat arrow ${this.name}`); // this points to obj
//   }, 1000);
//   }
// }
// obj.sayLater(); // undefined/empty

// Destructuring
// is a way of extracting values into variables from data stored in objects
// and arrays with ease.

// >> Object Destructuring
// const obj = {
//   first: 'First',
//   last: 'Last',
//   age: 80
// }
// // let f = obj.first;

// const {first: f, last: L} = obj;
// console.warn('with destructuring ', f, L);

// Shortcut
// const {first, last} = obj;
// console.warn('with destructuring shortcut ', first, last);

// >> Array Destructuring
// const arr = ['a', 'b'];
// const [x, y] = arr;
// console.log('Array destructuring ', x, y);

// >> Function Parameter Destructuring
// Typically if we want to pass multiple params to a function,
// with maybe some optional parameters, we would pass it in as an object

// >> For Of (looping mechanism in ES6)

// for (let i = 0; i < 10; i++) {
//   console.warn('output is ', i);
// }

// const array = [1, 2, 4];
// array.forEach(function (value) {
//   console.log('array output ', value);
// });
// It's slightly shorter but has a few downsides
// We can't break out of this loop using a break or move to next
// iteration with continue
// You can't return from the enclosing function using a return statement

// For In (loop is designed for iterating over an object properties
// const obj = {
//   a: 1,
//   b: 2
// }
// for (let prop in obj) {
//   if (prop) {
//     console.warn('The prop is ', prop); // prop is a string not a number even if used in an array
//   }
// }

// >> For-of loop (new syntax from ES6), loop is for looping over the values in an array
// const array = [10, 20, 30];
// for (let value of array) {
//   console.warn('For of value is ', value);
// }

// > This is the most concise way of looping through array elements
// > It avoids all the pitfalls of for-in
// > It works with break, continue, and return


// >> Map & Set
// >> Using Object as a Map
// In ES5
// const obj = {
//   key: 'value',
//   a: 1
// }
// console.warn('output', obj.a);
// console.warn('output', obj['key']);

// > Inherited Objects
// const base = {a: 1, b: 2};
// let obj2 = Object.create(base);
// obj2['c'] = 3;
// for (let prop in obj2) {
//   console.warn('prop', prop);
// }

// Object.create creates a new objects who's prototype points to the
// passed base object. If it can't find a requested property on obj2,
// javascript tries to search the base object for the same property
// ES5 hasOwnProperty

// >> Map
// is a new data structure introduced in ES6 which lets you map keys to
// values without the drawbacks of using Objects.
const map = new Map();
// We can then add entries by using the set method
map.set('A', 1);
map.set('B', 200);
map.set('C', 3);

// Chainable
const map2 = new Map()
.set('A', 1)
.set('B', 2);

// Map with an array of key-value pairs
const map3 = new Map([
  ['A', 1],
  ['B', 2]
])

// Extract a value
 console.warn('Map value ', map.get('B'));

// Check persistence
// console.warn('Check persistence ', map.has('A'));
// console.warn('Check persistence ', map.has('a'));

// map.delete('A');
// console.warn('Map A size', map.size);

// Empty an entire Map
// map.clear();
// console.log('Size after clearing map A ', map.size);

// >> Looping over a Map
// let map = new Map([
//   ['APPLE', 1],
//   ['ORANGE', 2],
//   ['MANGOE', 3]
// ]);

// for (let entry of Array.from(map.keys())) {
//   console.warn('key', entry);
// }

// for (let value of Array.from(map.values())) {
//   console.warn('value', value);
// }

// for (let [key, value] of Array.from(map)) {
//   console.warn('entry', value);
// }

// >> Set
// are a bit like maps but they only store keys not key-value pairs.
let set = new Set();
set.add('APPLE');
set.add('ORANGE');
set.add('APPLE'); // Sets can only store unique values, so this line of code has no effect
console.warn('set', set);

// chainable
// let set = new Set(['APPLE', 'ORANGE', 'MANGO']);
// check value is in a set
// set.has('APPLE');
// delete a set
// set.delete('APPLE');
// console.log('set modified', set, set.size);
// Empty the entire set with the clear method
// set.clear();
// console.log('set cleared', set, set.size);


// >> Looping over a Set
// let set = new Set();
// set.add('APPLE');
// set.add('ORANGE');
// set.add('APPLE'); // Sets can only store unique values, so this line of code has no effect

// for (let entry of Array.from(set)) {
//   console.log('set entry ', entry);
// }

// !Similar to Maps, Sets also record the order in which elements
// are inserted, it then replays that order when looping.
// Map and Set are great additions to JavaScript in ES6
// We no longer have to deal with Map and Sets poor cousin the
// Object and it's many drawbacks.


// >> Promises
// > When you execute a task synchronously, you wait for it to finish
// befor moving on to the next line of ocde.
// > When you execute a task asynchronously, the program moves to the next
// line of code before the task finished.

// > Callbacks
// One way to program asynchronoulsy is to use callbacks.
// We pass to an asynchronous function a function which it will call
// when the task is completed.
// It's called a callback function, cb for short,
// because it calls-you-back.

// >> Promises API
// In ES6 we have an alternative mechanism built into the language called
// a promise. A promise is a placeholder for a future value.

// let promise = new Promise((resolve, reject) => {
// });
// resolve and reject are in fact functions themselves

// > We pass to Promise an inner function that takes two arguments 
// (resolve, reject).
// > resolve and reject are in fact functions themselves
// > Inside this inner function we perform our asynchronous processing 
// and then when we are ready we call resolve()

// let promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.warn('Async work complete');
//     resolve();
//   }, 1000);
// });

// >> We usually return this promise from a function
// function doAsyncTask() {
//   const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log('Async work complete');
//       if ('not error') {
//         resolve('data test');
//       } else {
//         reject();
//       }
//     }, 3000);
//   });
//   return promise;
// }

// >> Promise Notifications
// We can get notified when a promise resolves by attaching a success
// handler to its then function
// doAsyncTask().then(() => console.warn('Task completed'));

// doAsyncTask().then(
//   (d) => console.warn('Task Completed!', d),
//   () => console.error('Task Errored :(')
// )

// >> Any values we pass to the resolve and reject function are passed
// along to the error and success handlers.

// >> Chaining
// We can also connect a series of then handler together in a chain
// function doAsyncTask() {
//   let promise = Promise.resolve('done');
//   return promise;
// }

// doAsyncTask().then(
//   (val) => console.warn('Task Complete!', val),
//   (err) => console.warn('Task Errored', err)
// ).then(
//   (val) => console.warn('Second', val),
//   (err) => console.warn(err)
// ).then(
//   (val) => console.warn('Thired', val),
//   (err) => console.warn('Thired err ', err)
// );

// Promises pass an error along the chain till it finds an error
// handler. So we don't need to define an error handler
// for each then function, we can just add one at the end.


// >> Summary
// > Promises are far cleaner solution to writing
//   asynchronous code than callbacks



// >> Class & Interface
// How do we write object-oriented code in ES6
// JavaScript has a prototype-based, object-oriented programming model.
// (Prototype chain or Prototype pattern)
// TypeScript supports ES6 class syntax but also  adds some other features
// like access modifiers and interfaces.
// So in this case, we'll be writing TypeScript rather than pure ES6

// >> Class
// A class is a blueprint for creating objects with specific functions 
// and  properties already attached to it

// class Person {
//   firstName: '';
//   lastnName: '';
//   constructor(firstName, lastName) {
//     this.firstName = firstName;
//   }
//   whoAreYou() {
//     return `Hi I'm ${this.firstName}`;
//   }
// }
// let onel = new Person('Onel', 'Adizas');
// console.warn('onel', onel.whoAreYou());

// >> Class Instance
// class Student extends Person {
//   constructor(F, L, public course) {
//     super(F, L);
//     this.course = course;
//   }
//   whoAreYou() {
//     return `${super.whoAreYou()} and i'm studying ${this.course}`;
//   }
// }

// let onel2 =  new Student('Onel', 'Adizas', 'Angular 4');
// console.warn('onel 2 ', onel2);
// console.warn('onel2.whoAreYou ', onel2.whoAreYou());

// >> Access Modifiers
// TypeScript adds some nice functionality on top of ES6 classes, namely
// function and property visibility via access modifiers.

// class Person {
//   private firstName: '';
//   private lastnName: '';
//   constructor(firstName, lastName) {
//     this.firstName = firstName;
//   }
//   whoAreYou() {
//   return `Hi I'm ${this.firstName}`;
//   }
// }

// class Student extends Person {

//   constructor(F, L, public course) { // Constructor shortcut
//     super(F, L);
//     this.course = course;
//   }
//   whoAreYou() {
//     return `${super.whoAreYou()} and i'm studying ${this.course}`;
//   }
//   test() {
//     console.log(this.firstName); // would print an error
//   }
// }

// public : This is the default and means its visible everywhere
// private : Only member functions of the class it's declared can see this.
// protected : Only the class it's declared in and any class that inherits
//            from that class can see this.

// > We can also use this as constructor shortcut
// class Person {
//   constructor(private firstName, private lastName) {
//     this.firstName = firstName;
//   }
//   whoAreYou() {
//   return `Hi I'm ${this.firstName}`;
//   }
// }


// >> Interfaces
// Interface are explained as that they describe a set of rules the
// class has to follow, a contract it has to adhere to.

// interface Human {
//   name: string;
//   hasName?: Function;
//   isLate?(time: Date): Function
// }

// class Person implements Human {
//   name: string;
//   age: number;
// }

// > Since interfaces are all about the public interface of a class they
// can't have access modifiers, the properties above have to be public.

// >> Note
// Under the hood we are still using prototype based inheritance but the 
// syntax is easier to understand and more familiar for developers who 
// are coming from other languages.


// >> Decorators
// in Angular we can decorate a class with extra info using 
// the @ syntax

// @Component({
//   selector: 'app-thing-comp',
//   template: `foo`
// })
// class MyComponent {
// }

// > This is a new feature that will probably make it into the ES7 of
// JavaScript. The functionality is available in TypeScript.
// > It allows us to decorate classes and functions, similar to annotations
//  in java, C++, and C#.
// They are just functions that can be used to add meta-data,
// properties or functions to the thing
// they are attached to.

// >> Simple no-argument decorator

// @course
// class Person {
//   // ...
// }

// function course(target) { // @couse is just a function
//   Object.defineProperty(target.prototype, 'course', {value: () => 'Angular 4'})
// }

// >> Decorators with arguments
// @Course({
//   course: 'Angular 4'
// })
// class Person2 {
//   // ...
// }
// function Course(config) {
//   return function(target) {
//   Object.defineProperty(
//     target.prototype, 'course',
//     {value: () => config.course}
//   )
//   }
// }

// >> Modules
// >> Module Loading
// By default javascript doesn't have a module system like other language,
// e.g. Java or C# This means that if you wanted to call a function in
//  some other file, you have to remember
//  to explicity load that file via script tags before you call the
//  function.

// Other languages have a module loading system, if you wanted to use some
// code from another file	you would type something like
//   import foo from bar;
//   foo();

// >> ES6 Modules
// ES6 took the best of the existing module systems and introduced 
// this concept on a language level. We can configure TypeScript to use 
// other module loaders,

// >> Exporting
// util.ts
// function square(x) {
//   return Math.pow(x, 2);
// }
// function cow() {
//   console.log('Mooooo!!!');
// }
// export {square, cow}; // {square: square, cow: cow} without destructuring

// We declare some function in a file.
// By using the export keyword we say which of those functions can be
// exported, and therefore imported and used in other modules.



// >> Importing
// script.ts
// import {square, cow} from './somewhere'; // We again use the destructuring syntax
// // or a working one
// import { Output } from '@angular/core';

// >> Aliases
// We may want to import a function with one name but then use it via another name.
// Perhaps to avoid name collisions or just to have a more convenient naming

// import {square as sqr} from './somewhere'; // not working import

// Import everything in a file (a working import)
// import * as $ from 'jquery';



// >> Alternative export syntax
// We can also export functions,  variables, classes as they are defined by
// prepended the word export to the front of their declarations
// export function square(x) {
//   return Math.pow(x, 2);
// }

// export class AppComponent {
//   title = 'Quotable quotes';
// }

// >> Default exports
// If a module defines one export which is the most common, we can take
// advantage of the default export syntax
// export default function square(x) {
//   return Math.pow(x, 2);
// }

// > And then when we import it we don't need to use {}
// import square from './utils';
// > Or, if we want to import the default export as well as some other exports

// import square, { cow } from './utils';

// >> With ES6 modules we finally have a mechanism for letting the language
// deal with loading of dependant files for us.
// This isn't baked into javascript engines yet.
// So to solve this problem in Angular 4  we
// still use the ES6 module loading syntax but leave it to
// TypeScript to transpile to CommonJS, SystemJS, or WhateverLoaderJS

// >> Types
// > Transpile-time type checking
// > Supported types

// let decimal: number = 6;

// let done: boolean = false;

// let color: string = 'blue';

// let list: number[] = [1, 2, 4];

// let list2: Array<number> = [1, 2, 4];

// let fun: Function = () => console.log("Hello");

// function returnNumber(): number {
//   return 1;
// }

// enum Direction { // set of named values.
//   Up,
//   Down,
//   Left,
//   Right
// }

// class Person {};

// let person: Person;

// let people: Person[];

// let notsure: any = 1;

// function returnNothing(): void {
//   console.log("Void");
// }
// let value: any = 'ERNI Mhilimmines';

// let length: number = (<string>value).length;

// class Audio {}
// class Video {}
// class Post<T> { // <T> is the generic syntax and T is the type variable.
//   content: any
// }
// Then we can use T wherever we would use a type
// class Pos2t<T> {
//   content: T;
// }

// let videoPost: Post<Video>; // If we want to create a specific type of Post

// Original types
// let answer;
// answer = 'NaN';

// Type Inference
// TypeScript will try to guess
// let ans = 42;
// ans = "42"; // Error: not assignable to type number

// Ambient type definition (external libraries) not to cover


// Function Overloads
// class Person {
//   constructor() {
//   }
//   add(arg1: string, arg2: string): string;
//   add(arg1: number, arg2: number): number;
//   add(arg1: boolean, arg2: boolean): boolean;
//   add(arg1: any, arg2: any): any {
//     return arg1 + arg2;
//   }
// }
// console.warn('add 1 and 1', new Person().add(1, 1));
// console.warn('add "1" and "1"', new Person().add('1', '1'));
// console.warn('add true and false', new Person().add(true, true));

// // Union types
// let arg1: string | number | boolean;
// arg1 = 'test';

// Generics
// Generics are a way of writing code that will deal with any type
// of object but still maintain the object type integrity.
// What happens if a block of code needs to work with any type of object?

// Generic syntax
// this will work with any type of object but still ensure that the type integrity is kept in place
// class Concatenator< T > {
//   concatenateArray(inputArray: Array< T >): string {
//     let returnString = '';

//     for (let i = 0; i < inputArray.length; i++) {
//       if (i > 0) {
//         returnString += ',';
//       }
//       returnString += inputArray[i].toString();
//     }
//     return returnString;
//   }
// }

// // Instantiating generic classes

// const stringConcatenator = new Concatenator<string>();
// const numberConcatenator = new Concatenator<number>();

// const stringArray: string[] = ['first', 'second', 'third'];
// const numberArray:  number[] = [1, 2, 3];

// console.warn('string result ', stringConcatenator.concatenateArray(stringArray));
// console.warn('number result ', numberConcatenator.concatenateArray(numberArray));



