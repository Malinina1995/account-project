<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>Редактировать</h4>
            </div>

            <form @submit.prevent="editHandler">
                <div class="input-field">
                    <select ref="select" v-model="current">
                        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{cat.title}}</option>
                    </select>
                    <label>Выберите категорию</label>
                </div>

                <div class="input-field">
                    <input
                            id="name"
                            type="text"
                            v-model="title"
                            :class="{invalid: $v.title.$dirty && !$v.title.required}"
                    >
                    <label for="name">Название</label>
                    <span class="helper-text invalid" v-if="$v.title.$dirty && !$v.title.required">Поле обязательно для заполнения</span>
                </div>

                <div class="input-field">
                    <input
                            id="limit"
                            type="number"
                            v-model.number="limit"
                            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
                    >
                    <label for="limit">Лимит</label>
                    <span class="helper-text invalid" v-if="$v.limit.$dirty && !$v.limit.minValue">Минимальное значение {{$v.limit.$params.minValue.min}}</span>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                    Обновить
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import {required, minValue} from 'vuelidate/lib/validators';
    import { mapActions } from 'vuex';

    export default {
        name: "CategoryEdit",
        props: ['categories'],
        data() {
            return {
                select: null,
                title: '',
                limit: 100,
                current: null
            }
        },
        validations: {
            title: {required},
            limit: {minValue: minValue(100)}
        },
        watch: {
            current(value) {
                const { title, limit } = this.categories.find(i => i.id === value);
                this.title = title;
                this.limit = limit;
            }
        },
        created() {
            const { id, title, limit } = this.categories[0];
            this.current = id;
            this.title = title;
            this.limit = limit;
        },
        mounted() {
            this.select = M.FormSelect.init(this.$refs.select);
            M.updateTextFields()
        },
        destroyed() {
            if (this.select && this.select.destroy) {
                this.select.destroy()
            }
        },
        methods: {
            ...mapActions([
                'updateCategory'
            ]),
            async editHandler() {
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return
                }
                try {
                    const categoryData = {
                        id: this.current,
                        title: this.title,
                        limit: this.limit
                    };
                    await this.updateCategory(categoryData)
                    this.$message(`Категория успешно изменена`)
                    this.$emit('update', categoryData)
                } catch (e) {

                }
            }
        }
    }
</script>

<style scoped>

</style>
