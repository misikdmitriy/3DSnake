// jshint esversion: 6

class Food {
    constructor() {}

    get parts() {
        return [this];
    }
}

class GoodFood extends Food {}
class PoisonFood extends Food {}