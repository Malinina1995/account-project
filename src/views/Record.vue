<template>
    <div>
        <div class="page-title">
            <h3>Новая запись</h3>
        </div>

        <Loader v-if="loading"/>

        <p class="center" v-else-if="!categories.length">
            Категорий пока нет.
            <router-link to="/categories">Добавить категорию.</router-link>
        </p>

        <form class="form" v-else @submit.prevent="createHandler">
            <div class="input-field">
                <select ref="select" v-model="category">
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.title }}</option>
                </select>
                <label>Выберите категорию</label>
            </div>

            <p>
                <label>
                    <input
                            class="with-gap"
                            name="type"
                            type="radio"
                            value="income"
                            v-model="type"
                    />
                    <span>Доход</span>
                </label>
            </p>

            <p>
                <label>
                    <input
                            class="with-gap"
                            name="type"
                            type="radio"
                            value="outcome"
                            v-model="type"
                    />
                    <span>Расход</span>
                </label>
            </p>

            <div class="input-field">
                <input
                        id="amount"
                        type="number"
                        v-model.number="amount"
                        :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
                >
                <label for="amount">Сумма</label>
                <span class="helper-text invalid" v-if="$v.amount.$dirty && !$v.amount.minValue">Сумма не может быть меньше {{ $v.amount.$params.minValue.min }}</span>
            </div>

            <div class="input-field">
                <input
                        id="description"
                        type="text"
                        v-model.trim="desc"
                        :class="{invalid: $v.desc.$dirty && !$v.desc.required}"
                >
                <label for="description">Описание</label>
                <span v-if="$v.desc.$dirty && !$v.desc.required"
                      class="helper-text invalid">Введите описание</span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                Создать
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import {required, minValue} from 'vuelidate/lib/validators'

    export default {
        name: 'record',
        data() {
            return {
                loading: true,
                categories: [],
                select: null,
                category: null,
                type: 'outcome',
                amount: 1,
                desc: ''
            }
        },
        validations: {
            amount: {minValue: minValue(1)},
            desc: {required}
        },
        async mounted() {
            this.categories = await this.getCategories();
            this.loading = false;

            if (this.categories.length) {
                this.category = this.categories[0].id
            }

            setTimeout(() => {
                this.select = M.FormSelect.init(this.$refs.select);
                M.updateTextFields()
            }, 0);
        },
        destroyed() {
            if (this.select && this.select.destroy) {
                this.select.destroy()
            }
        },
        computed: {
            ...mapGetters([
                'info'
            ]),
            canCreate() {
                if (this.type === 'income') {
                    return true;
                } else {
                    return this.info.bill >= this.amount
                }
            }
        },
        methods: {
            ...mapActions([
                'getCategories',
                'createRecord',
                'updateBill'
            ]),
            async createHandler() {
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return
                }

                if (this.canCreate) {
                    try {
                        const record = await this.createRecord({
                            categoryId: this.category,
                            type: this.type,
                            amount: this.amount,
                            desc: this.desc,
                            data: new Date().toJSON()
                        })

                        const bill = this.type === 'income'
                            ? this.info.bill + this.amount
                            : this.info.bill - this.amount

                        await this.updateBill({bill})

                        this.category = this.categories[0].id;
                        this.type = 'outcome';
                        this.amount = 1;
                        this.desc = '';
                        this.$v.$reset();
                        this.$message('Новая запись успешно создана')
                    } catch (e) {

                    }
                } else {
                    this.$message(`Для совершения данной операции не хватает ${this.amount - this.info.bill}`);
                }
            }
        }

    }
</script>
