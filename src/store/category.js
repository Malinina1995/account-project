import firebase from "firebase";

export default {
    actions: {
        async createCategory({commit, dispatch}, {title, limit}) {
            try {
                const uid = await dispatch('getUid');
                const info = (await firebase.database().ref(`/users/${uid}/categories`).push({title, limit}))
                return {
                    title, limit, id: info.key
                }
            } catch (e) {
                commit('setError', e);
                throw e
            }
        },
        async getCategories({commit, dispatch}) {
            try {
                const uid = await dispatch('getUid');
                const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || [];

                return Object.keys(categories).map(key => ({...categories[key], id: key}))
            } catch (e) {
                commit('setError', e);
                throw e
            }
        },
        async updateCategory({commit, dispatch}, {title, limit, id}) {
            try {
                const uid = await dispatch('getUid');
                await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit})
            } catch (e) {
                commit('setError', e);
                throw e
            }
        }
    }
}
