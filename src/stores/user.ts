import { defineStore } from "pinia";
import { computed, ref } from 'vue';

import { introspect } from '@/modules/auth/repositories/auth.repository';

export const useAuthStore = defineStore('user', () => {

    const emptyUser = {
        id: 0,
        name: '',
        email: '',
        email_verified_at: null,
        tenant_id: '',
        created_at: '',
        updated_at: '',
        scopes_count: 0,
        slugs: [],
    }

    const authUser = ref(JSON.parse(localStorage.getItem('user') || JSON.stringify(emptyUser)) as User);

    const user = computed(() => {
        return authUser.value;
    })

    function setAuthUser(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
        authUser.value = user
    }

    function loadUser() {
        if (!localStorage.getItem('accessToken')) return

        introspect()
            .then(res => {
                setAuthUser(res.data)
            })
    }

    return { authUser, user, setAuthUser, loadUser }

})

export default useAuthStore;