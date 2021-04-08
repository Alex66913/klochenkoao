import { makeAutoObservable } from 'mobx';

console.log (history);
class Store {
    /** Здоровье */
    health = 50;
    /** Голод */
    hungry = 50;
    /** Жажда */
    thrist = 50;
    /** Усталость */
    stamina = 50;

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
        this.health = 50;
        this.hungry = 50;
        this.thrist = 50;
        this.stamina = 50;
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