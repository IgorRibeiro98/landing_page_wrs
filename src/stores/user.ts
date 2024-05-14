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
        user.scopes = [
            'totem.view',
            'totem.create',
            'totem.update',
            'totem.delete',

            'totem.queue.view',
            'totem.queue.create',
            'totem.queue.update',
            'totem.queue.delete',

            'totem.screen.view',
            'totem.screen.create',
            'totem.screen.update',
            'totem.screen.delete',

            'queue.view',
            'queue.create',
            'queue.update',
            'queue.delete',

            'attendance_type.view',
            'attendance_type.create',
            'attendance_type.update',
            'attendance_type.delete'
        ]
        localStorage.setItem('user', JSON.stringify(user));
        authUser.value = user
    }

    return { authUser, user, setAuthUser }

})

export default useAuthStore;