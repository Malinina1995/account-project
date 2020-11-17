<template>
    <div class="col s12 m6 l8">
        <div class="card orange darken-3 bill-card">
            <div class="card-content white-text">
                <div class="card-header">
                    <span class="card-title">Курс валют</span>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Валюта</th>
                            <th>Курс</th>
                            <th>Дата</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="cur in currencies" :key="cur">
                            <td>{{cur}}</td>
                            <td>{{ Math.floor(rates['RUB'] / rates[cur]) }}</td>
                            <td>{{dateNow | date('date')}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomeCurrency",
        props: ['date', 'rates'],
        data() {
            return {
                currencies: ['RUB', 'USD', 'EUR']
            }
        },
        computed: {
            dateNow() {
                return new Date(this.date)
            }
        }
    }
</script>

<style scoped>

</style>
