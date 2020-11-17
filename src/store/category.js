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
        }
    }
}
