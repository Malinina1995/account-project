<template>
    <div class="col s12 m6 l4">
        <div class="card light-blue bill-card">
            <div class="card-content white-text">
                <span class="card-title">Счет в валюте</span>

                <p
                        v-for="cur in currencies"
                        :key="cur"
                        class="currency-line">
                    <span>{{ getCurrency(cur) | currency(cur) }}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: "HomeBill",
        props: [
            'rates'
        ],
        data() {
            return {
                currencies: ['RUB', 'USD', 'EUR']
            }
        },
        computed: {
            ...mapGetters([
                'info'
            ]),
            base() {
                return this.info.bill / (this.rates['RUB'] / this.rates['EUR'])
            }
        },
        methods: {
            getCurrency(cur) {
                return Math.floor(this.base * this.rates[cur])
            }
        }
    }
</script>

<style scoped>

</style>
