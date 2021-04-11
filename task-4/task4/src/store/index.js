import { makeAutoObservable } from 'mobx';

console.log (history);

// const default_value = health = 50, hungry = 50, thrist = 50, stamina = 50;
const DEFAULT_VALUE = 50;

class Store {
    /** Здоровье */
    health = DEFAULT_VALUE;
    /** Голод */
    hungry = DEFAULT_VALUE;
    /** Жажда */
    thrist = DEFAULT_VALUE;
    /** Усталость */
    stamina = DEFAULT_VALUE;
    

    history = []

    shownHistory = false;
    

    constructor() {
        makeAutoObservable(this);
    }

    get isDead() {
        function checkForDead(value) {
            return value >= 100 || value <= 0;
        }      

        return checkForDead(this.health) || checkForDead(this.hungry) || checkForDead(this.thrist) || checkForDead(this.stamina);
    }

    restart() {
        this.health = this.hungry = this.thrist = this.stamina = DEFAULT_VALUE;
        this.history = [];
    }
    eat() {
        this.hungry -= 10;
        this.health += 5;
        this.history.push('Вы поели');
    }

    drink() {
        this.thrist -= 15;
        this.hungry += 5;
        this.history.push('Вы попили')
    }

    sleep() {
        this.stamina -= 20;
        this.hungry += 5;
        this.thrist += 10;
        this.health += 5;
        this.history.push('Вы отдохнули')
    }

    work() {
        this.stamina += 20;
        this.hungry += 10;
        this.thrist += 15;
        this.health -= 5;
        this.history.push('Вы поработали(зачем?)')
    }
}

const store = new Store();

export default store;