import { defineStore } from "pinia";
import { ref } from "vue";

import logo from '@/assets/logo.png'

export default defineStore('system', () => {
    const state = ref({
        logo
    })

    return {
        state
    }
})