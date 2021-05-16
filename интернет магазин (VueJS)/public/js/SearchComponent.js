const search = {
    data() {
        return {
            userSearch: ''
        }
    },
    template: ` <form action="#" class="search form-container" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                    <input class="search-field" v-model="userSearch" type="search" placeholder="Search for item...">
                    <button class="search-btn"></button><i class="fas fa-search"></i></button>
                </form>
    `
};