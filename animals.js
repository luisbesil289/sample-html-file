class Animal {
    constructor(name, gender, legs) {
        this.name = name;
        this.gender = gender;
        this.legs = legs;
    }

    speak() {
        console.log(`${this.name} makes a noise.`);
    }

    isMale() {
        return (this.gender === 'M');
    }

    isFemale() {
        return (this.gender === 'F');
    }
}