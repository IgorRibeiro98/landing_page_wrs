import { defineStore } from "pinia";
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('user', () => {

    const emptyUser = {
        id: '',
        name: '',
        email: '',
        email_verified_at: null,
        tenant_id: '',
        created_at: '',
        updated_at: '',
        scopes_count: 0,
        scopes: [],
    }

    const authUser = ref(JSON.parse(localStorage.getItem('user') || JSON.stringify(emptyUser)) as User);

    const user = computed(() => {
        return authUser.value;
    })

    function setAuthUser(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
        authUser.value = user
    }

    return { authUser, user, setAuthUser }

})

export default useAuthStore;