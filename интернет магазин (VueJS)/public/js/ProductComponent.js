const product = {
    props: ['product'],
    template: `
               <div class="feat-item pr-item">
                   <img :src="product.image" alt="item" class="feat-img pr-img">
                   <div class="item-name">{{ product.title }}</div>
                   <div class="item-price">&dollar;{{ product.price }}</div>
                       <button class="buy-btn pr-btn-buy" @click="$root.$refs.cart.addProduct(product)">
                           <span class="pr-btn-buy-text">Add to cart</span>
                       </button>
               </div>`
};

const products = {
    components: {product},
    data() {
        return {
            catalogUrl: 'catalogData.json',
            products: [],
            filtered: [],
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for(let el of data) {
                    this.$data.products.push(el);
                    this.$data.filtered.push(el);
                }
            });
    },
    methods: {
        filter(userSearch) {
            const regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.title));
        },
    },
    template: ` <section class="products products-container">
                    <product v-for="item of filtered" v-bind:key="item.id" :product="item"></product>
                </section>`
 };

