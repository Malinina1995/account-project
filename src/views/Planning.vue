<template>
    <div>
        <div class="page-title">
            <h3>Планирование</h3>
            <h4>{{info.bill | currency('RUB')}}</h4>
        </div>

        <Loader v-if="loading"/>

        <p class="center" v-else-if="!categories.length">
            Категорий пока нет.
            <router-link to="/categories">Добавить категорию.</router-link>
        </p>

        <section v-else>
            <div v-for="c in categories" :key="c.id">
                <p>
                    <strong>{{ c.title }}:</strong>
                    {{ c.spend | currency('RUB') }} из {{c.limit | currency('RUB')}}
                </p>
                <div class="progress" v-tooltip="c.tooltipText">
                    <div
                            class="determinate"
                            :class="c.progressColor"
                            :style="{width: c.progressPercent + '%'}"
                    ></div>
                </div>
            </div>
        </section>
    </div>
</template>


<script>
    import {mapActions, mapGetters} from 'vuex';
    import currencyFilter from '../filters/currency.filter'

    export default {
        name: 'planning',
        data() {
            return {
                loading: true,
                categories: []
            }
        },
        async mounted() {
            const categories = await this.getCategories();
            const records = await this.fetchCategories();
            this.loading = false;

            this.categories = categories.map(cat => {
                const spend = records
                    .filter(r => r.categoryId === cat.id)
                    .filter(r => r.type === 'outcome')
                    .reduce((total, rec) => {
                        return total += rec.amount;
                    }, 0)

                const percent = 100 * spend / cat.limit;
                const progressPercent = percent > 100 ? 100 : percent;
                const progressColor = percent < 60
                    ? 'green'
                    : percent < 100
                        ? 'yellow'
                        : 'red'

                const tooltipValue = cat.limit - spend;
                const tooltipText = tooltipValue < 0
                    ? `Вы потратили на ${currencyFilter(Math.abs(tooltipValue))} больше, чем планировали :(`
                    : tooltipValue > 0
                    ? `Вы еще можете потратить ${currencyFilter(tooltipValue)}`
                        : 'Вы потратили сколько планировали!'

                return {
                    ...cat,
                    progressColor,
                    progressPercent,
                    spend,
                    tooltipText
                }
            })
        },
        computed: {
            ...mapGetters([
                'info'
            ]),
        },

        methods: {

            ...mapActions([
                'getCategories',
                'fetchCategories'
            ])
        }
    }
</script>
