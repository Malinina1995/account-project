import firebase from "firebase";

export default {
    actions: {
        async createRecord({dispatch, commit}, record) {
            try {
                const uid = await dispatch('getUid');
                const info = await firebase.database().ref(`/users/${uid}/records`).push(record);
                return info
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        }
    }
}
