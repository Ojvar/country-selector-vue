Vue.use(Vuex);

const CountrySelectorStore = new Vuex.Store({
    state: () => ({
        countries: [],
        provinces: [],
        cities: [],

        selectedCountry: null,
        selectedProvince: null,
        selectedCity: null,
    }),

    getters: {
        countries(state) {
            return state.countries;
        },
        provinces(state) {
            return state.provinces;
        },
        cities(state) {
            return state.cities;
        },
        selectedCountry(state) {
            return state.selectedCountry;
        },
        selectedProvince(state) {
            return state.selectedProvince;
        },
        selectedCity(state) {
            return state.selectedCity;
        },
    },

    mutations: {
        /**
         * Set countries
         */
        setCountries(state, payload) {
            Vue.set(state, "countries", payload);
        },

        /**
         * Set provinces
         */
        setProvinces(state, payload) {
            Vue.set(state, "provinces", payload);
        },

        /**
         * Set cities
         */
        setCities(state, payload) {
            Vue.set(state, "cities", payload);
        },

        /**
         * Clear countries
         */
        clearCountries(state, payload) {
            Vue.set(state, "countries", []);
        },

        /**
         * Clear provinces
         */
        clearProvinces(state, payload) {
            Vue.set(state, "provinces", []);
        },

        /**
         * Clear cities
         */
        clearCities(state, payload) {
            Vue.set(state, "cities", []);
        },

        /**
         * Set selectedCountry
         */
        setSelectedCountry(state, payload) {
            Vue.set(state, "selectedCountry", payload);
        },

        /**
         * Clear selectedCountry
         */
        clearSelectedCountry(state) {
            Vue.set(state, "selectedCountry", null);
        },

        /**
         * Set selectedProvince
         */
        setSelectedProvince(state, payload) {
            Vue.set(state, "selectedProvince", payload);
        },

        /**
         * Clear selectedProvince
         */
        clearSelectedProvince(state) {
            Vue.set(state, "selectedProvince", null);
        },

        /**
         * Set selectedCity
         */
        setSelectedCity(state, payload) {
            Vue.set(state, "selectedCity", payload);
        },

        /**
         * Clear selectedCity
         */
        clearSelectedCity(state) {
            Vue.set(state, "selectedCity", null);
        },
    },

    actions: {
        /**
         * Update state
         */
        updateState(context, state) {
            context.dispatch("selectCountryByCode", state.country);
            context.dispatch("selectProvinceByCode", state.province);
            context.dispatch("selectCityByCode", state.city);
        },

        /**
         * Load countries list
         */
        async loadCountries(context) {
            context.commit("setCountries", __countires);
        },

        /**
         * Load provinces list
         */
        async loadProvinces(context) {
            const selectedCountry = context.getters.selectedCountry;

            if (selectedCountry) {
                context.commit(
                    "setProvinces",
                    __provinces[selectedCountry.code] || []
                );
            }
        },

        /**
         * Load cities list
         */
        async loadCities(context) {
            const selectedProvince = context.getters.selectedProvince;

            if (selectedProvince) {
                context.commit(
                    "setCities",
                    __cities[selectedProvince.code] || []
                );
            }
        },

        /**
         * Clear selected country
         */
        async clearSelectedCountry(context) {
            /* Unset selected country */
            context.commit("clearSelectedCountry");

            /* Unset selected province */
            context.commit("clearProvinces");
            context.dispatch("clearSelectedProvince");
        },

        /**
         * Clear selected province
         */
        async clearSelectedProvince(context) {
            context.commit("clearSelectedProvince");

            context.commit("clearCities");
            context.dispatch("clearSelectedCity");
        },

        /**
         * Clear selected city
         */
        async clearSelectedCity(context) {
            context.commit("clearSelectedCity");
        },

        /**
         * Select a country
         */
        async selectCountryByCode(context, payload) {
            const selectedCountry = context.getters.selectedCountry;

            if (!selectedCountry || selectedCountry.code != payload) {
                /* Clear selected province */
                context.dispatch("clearSelectedCountry");

                /* Find new Country item */
                const newCountry = context.getters.countries.find(
                    (x) => x.code == payload
                );

                /* Set new item */
                context.commit("setSelectedCountry", newCountry);
                context.dispatch("loadProvinces", payload);
            }
        },

        /**
         * Select a province
         */
        async selectProvinceByCode(context, payload) {
            const selectedProvince = context.getters.selectedProvince;

            if (!selectedProvince || selectedProvince.code != payload) {
                /* Clear selected province */
                context.dispatch("clearSelectedProvince");

                /* Select new province */
                const newProvince = context.getters.provinces.find(
                    (x) => x.code == payload
                );

                context.commit("setSelectedProvince", newProvince);
                context.dispatch("loadCities", payload);
            }
        },

        /**
         * Select a city
         */
        async selectCityByCode(context, payload) {
            const selectedCity = context.getters.selectedCity;

            if (!selectedCity || selectedCity.code != payload) {
                const newCity = context.getters.cities.find(
                    (x) => x.code == payload
                );

                context.commit("setSelectedCity", newCity);
            }
        },
    },
});

const __countires = [
    { code: "001", name: "Iran" },
    { code: "002", name: "Iraq" },
    { code: "003", name: "USA" },
    { code: "004", name: "Kanada" },
];

const __provinces = {
    "001": [
        { code: "011", name: "Qazvin" },
        { code: "012", name: "Tehran" },
        { code: "013", name: "Karaj" },
        { code: "014", name: "Isfehan" },
    ],
};

const __cities = {
    "011": [
        { code: "111", name: "Qazvin" },
        { code: "112", name: "Alvand" },
        { code: "113", name: "Zibashahr" },
    ],
};
