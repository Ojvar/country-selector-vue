let CountrySelector = {
    name: "CountrySelector",

    store: CountrySelectorStore,

    props: {
        value: {
            type: Object,
            default: () => ({
                country: null,
                province: null,
                city: null,
            }),
        },
    },

    data: () => ({
        inputValue: {
            country: null,
            province: null,
            city: null,
        },
    }),

    computed: {
        countries() {
            return this.$store.getters.countries;
        },
        provinces() {
            return this.$store.getters.provinces;
        },
        cities() {
            return this.$store.getters.cities;
        },

        selectedCountry() {
            return this.$store.getters.selectedCountry;
        },
        selectedProvince() {
            return this.$store.getters.selectedProvince;
        },
        selectedCity() {
            return this.$store.getters.selectedCity;
        },
    },

    /**
     * Created
     */
    async created() {
        await this.$store.dispatch("loadCountries");
    },

    watch: {
        value(newValue) {
            this.$nextTick(() => {
                this.$store.dispatch("updateState", newValue);
            });
        },

        selectedCountry(newValue) {
            const name = (newValue || {}).name;
            Vue.set(this.inputValue, "country", name);
        },
        selectedProvince(newValue) {
            const name = (newValue || {}).name;
            Vue.set(this.inputValue, "province", name);
        },
        selectedCity(newValue) {
            const name = (newValue || {}).name;
            Vue.set(this.inputValue, "city", name);
        },
    },

    methods: {
        /**
         * On country selected
         */
        onCountrySelected(country) {
            country = country || {};
            this.$store.dispatch("selectCountryByCode", country.code);
            this.emitUpdateValue();
        },

        /**
         * On province selected
         */
        onProvinceSelected(province) {
            province = province || {};
            this.$store.dispatch("selectProvinceByCode", province.code);
            this.emitUpdateValue();
        },

        /**
         * On city selected
         */
        onCitySelected(city) {
            city = city || {};
            this.$store.dispatch("selectCityByCode", city.code);
            this.emitUpdateValue();
        },

        /**
         * On city selected
         */
        async emitUpdateValue() {
            this.$emit("input", {
                country: this.selectedCountry
                    ? this.selectedCountry.code
                    : null,
                province: this.selectedProvince
                    ? this.selectedProvince.code
                    : null,
                city: this.selectedCity ? this.inputValue.city.code : null,
            });
        },
    },

    template: `
    <div>
        <pre>
            {{ selectedCountry  }}
            {{ selectedProvince }}
            {{ selectedCity }}
        </pre>

        <b-autocomplete
            v-model="inputValue.country"
            field="name"
            @select="onCountrySelected"
            :data="countries"
        ></b-autocomplete>
        <b-autocomplete
            v-model="inputValue.province"
            field="name"
            @select="onProvinceSelected"
            :data="provinces"
        ></b-autocomplete>
        <b-autocomplete
            v-model="inputValue.city"
            field="name"
            @select="onCitySelected"
            :data="cities"
        ></b-autocomplete>
    </div>
    `,
};
