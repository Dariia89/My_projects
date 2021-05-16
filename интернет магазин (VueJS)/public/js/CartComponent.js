const cartItem = {
    props: ['cart-item'],
    template: `<div class="cart-item">
                    <div class="acc-info">
                    <div class="acc-item-block">
                        <img :src="cartItem.image" alt="item" class="acc-item-img">   
                        <div class="acc-item-info">
                            <h5 class="acc-item-name">{{ cartItem.title }}</h5>
                            <img src="img/acc_rate.png" alt="rating" class="item-rate">
                            <span class="acc-item-price">{{ cartItem.quantity }} &#215; &dollar;{{ cartItem.price }}</span> 
                        </div>
                    </div>
                    <i class="fas fa-times-circle del-btn" @click="$root.$refs.cart.removeProduct(cartItem)"></i>
                </div>        
            </div>
        `
};

const cart = {
    components: { 'cart-item': cartItem },
    data() {
        return {
            cartUrl: 'getBasket.json',
            show: false,
            cartProducts: []
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
              for (let el of data.contents) {
                this.$data.cartProducts.push(el);
              }
            });
    },
    methods: {
        countSum() {
            let sum = 0;
            this.cartProducts.forEach( product => sum += product.price * product.quantity);
                return sum;
        },
        addProduct(product) {
            let foundProduct = this.cartProducts.find(item => item.id === product.id);
            if (foundProduct) {
                this.$parent.putJson(`/api/cart/${foundProduct.id}`, {quantity: 1})
                    .then(data => {
                        if (data.result === 1) {
                            foundProduct.quantity++;
                        }
                    })
            } else {
                let newProduct = Object.assign({quantity: 1}, product);
                this.$parent.postJson(`/api/cart`, newProduct)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartProducts.push(newProduct);
                        }
                    })
            }
        },
        removeProduct(product) {
            if ( product.quantity > 1 ) {
                this.$parent.putJson( `/api/cart/${product.id}`, {quantity: -1})
                    .then( data => {
                        if ( data.result ) {
                            product.quantity--;
                        }
                    });
            } else {
                this.$parent.deleteJson( `/api/cart/${product.id}`, product)
                    .then( data => {
                        if ( data.result ) {
                            this.cartProducts.splice( this.cartProducts.indexOf(product), 1);
                        } else {
                            console.log('error');
                        }
                    })
            }
        }
    },
    template: `
        <div>
            <button id="basket-btn" type="button" @click="show = !show"><img src="img/cart.png" alt="basket"></button>
            <div class="account-drop" v-show="show"> 
                <div v-if="!cartProducts.length">Your cart is empty</div>
                <cart-item class="acc-goods" v-for="product of cartProducts" v-bind:key="product.id" :cart-item="product">
                </cart-item>
                <div class="acc-total">
                    <div class="acc-total-text">TOTAL</div>
                    <div class="acc-total-price">&dollar;{{ this.countSum() }}</div>
                </div>
                <a href="checkout.html" class="acc-checkout">CHECKOUT</a>
                <a href="shopping-cart.html" class="acc-cart">GO TO CART</a>
            </div>
        </div>
    `
};

