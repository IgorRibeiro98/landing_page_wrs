import { defineStore } from "pinia";
import { computed, ref } from 'vue';

import { introspect } from '@/modules/auth/repositories/auth.repository';
import authorization from "@/plugins/authorization";

export const useAuthStore = defineStore('user', () => {

    const emptyUser: User = {
        id: 0,
        name: '',
        email: '',
        email_verified_at: null,
        tenant_id: '',
        created_at: '',
        updated_at: '',
        scopes_count: 0,
        slugs: [],
        role: {},
        tenants: []
    }

    const authUser = ref(JSON.parse(localStorage.getItem('user') || JSON.stringify(emptyUser)) as User);

    const user = computed(() => {
        return authUser.value;
    })

    function setAuthUser(user: User) {
        localStorage.setItem('user', JSON.stringify(user));

        if (user.slugs) {
            authorization.setScopesByUser(user);
        }
        authUser.value = user
    }

    function loadUser() {
        if (!localStorage.getItem('accessToken')) return

        return introspect()
            .then(res => {
                setAuthUser(res.data)
            })
    }

    return { authUser, user, setAuthUser, loadUser }

})

export default useAuthStore;
