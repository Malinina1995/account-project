<template>
    <div>
        <div class="page-title">
            <h3>Категории</h3>
        </div>
        <section>
            <Loader v-if="loading"/>
            <div class="row" v-else>
                <CategoryCreate @created="addNewCategory"/>
                <CategoryEdit
                        v-if="categories.length"
                        :categories="categories"
                        :key="categories.length + updateCount"
                        @update="updateCategoryData"/>
                <p class="center" v-else>Категорий пока нет, но вы можете добавить их :)</p>
            </div>
        </section>
    </div>
</template>

<script>
    import CategoryCreate from '@/components/CategoryCreate';
    import CategoryEdit from "@/components/CategoryEdit";
    import { mapActions } from 'vuex';

    export default {
        name: 'categories',
        data() {
            return {
                categories: [],
                loading: true,
                updateCount: 0
            }
        },
        async mounted() {
            this.categories = await this.getCategories();
            this.loading = false;
        },
        components: {CategoryEdit, CategoryCreate},
        methods: {
            ...mapActions([
                'getCategories'
            ]),
            addNewCategory(category) {
                this.categories.push(category)
            },
            updateCategoryData(category) {
                const idx = this.categories.findIndex(c => c.id === category.id);
                this.categories[idx] = category;
                this.updateCount++;
            }
        }
    }
</script>
