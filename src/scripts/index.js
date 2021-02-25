"use strict";

/* Turn on DEBUG */
Vue.config.devtools = true;

/* Setup new Vue */
new Vue({
    el: "#app",

    components: {
        CountrySelector,
    },

    data: {
        birthPlace: {
            country: "",
            province: "",
            city: "",
        },
    },

    methods: {
        changeDate() {
            Vue.set(this, "birthPlace", {
                country: "001",
                province: "011",
                city: "111",
            });
        },
    },
});
