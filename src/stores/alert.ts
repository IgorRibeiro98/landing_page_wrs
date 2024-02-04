import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore('alert', (): any => {
    const alert = ref({
        display: false,
        title: '',
        text: ''
    })

    return {
        alert
    }
})