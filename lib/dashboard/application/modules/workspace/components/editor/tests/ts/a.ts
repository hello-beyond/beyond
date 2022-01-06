import {B} from './b';

class A {

    #b = new B();

    constructor() {

        console.log(this.#b);
    }

}