class Dog extends Animal {
    constructor(name, gender) {
        // super calls the constructor of the parent Class.
        super(name, gender, 4); 
    }

    speak() {
        console.log(`${this.name} barks.`);
    }
}