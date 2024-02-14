import { defineStore } from "pinia";
import { ref } from "vue";

import logo from '@/assets/logo.png'

export const systemStore = defineStore('system', () => {
    const state = ref({
        logo
    })

    return {
        state
    }
})

export default systemStore