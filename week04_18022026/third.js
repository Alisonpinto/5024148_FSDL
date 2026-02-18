// test3.js

// OBJECT
let student = {
    name: "Alison",
    branch: "IT",
    year: 2,
    introduce: function() {
        console.log("Hi I am " + this.name + " from " + this.branch);
    }
};

student.introduce();


// CLASS
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log("Hello, my name is " + this.name);
    }
}

// CREATE OBJECT FROM CLASS
let p1 = new Person("Alison", 20);
p1.greet();
