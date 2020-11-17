<template>
    <div>
        <Loader v-if="loading"/>
        <div class="app-main-layout" v-else>
            <Navbar @toggleSidebar="isOpen = !isOpen"/>
            <Sidebar v-model="isOpen"/>

            <main class="app-content" :class="{full: !isOpen}">
                <div class="app-page">
                    <router-view/>
                </div>
            </main>

            <div class="fixed-action-btn">
                <router-link class="btn-floating btn-large blue" to="/record">
                    <i class="large material-icons">add</i>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from "../components/app/Navbar";
    import Sidebar from "../components/app/Sidebar";
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: "MainLayout",
        data() {
            return {
                isOpen: true,
                loading: true
            }
        },
        async mounted() {
            if (!Object.keys(this.info).length) {
                await this.fetchInfo()
            }
            this.loading = false
        },
        computed: {
            ...mapGetters([
                'info'
            ])
        },
        components: {
            Navbar, Sidebar
        },
        methods: {
            ...mapActions([
                'fetchInfo'
            ])
        }
    }
</script>

<style scoped>

</style>
