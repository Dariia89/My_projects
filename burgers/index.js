function checkForm() {
    document.querySelector("#count").addEventListener("click", () => {
        let burger = new Hamburger("size", "stuffing", "topping");
        burger.renderResult();
    })
}

class BurgerFeatures {
    constructor(elem) {
        this.name = elem.value;
        this.price = +elem.dataset["price"];
        this.cal = +elem.dataset["cal"];
    }
}

class Hamburger {
    constructor(size, stuffing, topping) { 
        this.size = new BurgerFeatures(this.getIngridients(size));
        this.stuffing = new BurgerFeatures(this.getIngridients(stuffing));
        this.toppings = this.getToppings(topping);
        this.totalPrice = this.calculatePrice();
        this.totalCal = this.calculateCal();
    }
    getToppings(name) {    
        let result = [];
        this.findAllToppings(name).forEach(elem => result.push(new BurgerFeatures(elem)));
        return result;
    }
    findAllToppings(name) {
        return [...document.querySelectorAll(`input[name=${name}]:checked`)];
    }
    getIngridients(name) {              
        return document.querySelector(`input[name=${name}]:checked`);
    }
    calculatePrice() {      
        let totalPrice = this.size.price + this.stuffing.price;
        this.toppings.forEach( (topping) => {
            totalPrice += topping.price;
        });    
        return totalPrice;
    }
    calculateCal() {   
        let totalCal = this.size.cal + this.stuffing.cal;
        this.toppings.forEach( (topping) => {
            totalCal += topping.cal;
        });    
        return totalCal;
    }
    render() {
        return `<div id="prcal">
                    <span id="price">Стоимость вашего бургера: ${this.totalPrice}</span><br>
                    <span id="calories">Количество ккал:  ${this.totalCal}</span>
                </div>`
    }
    renderResult() {
        document.querySelector("#result").innerHTML = "";
        return document.querySelector("#result").innerHTML = this.render();
    }
  }

checkForm();