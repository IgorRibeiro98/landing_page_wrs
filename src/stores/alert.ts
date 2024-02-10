import { defineStore } from "pinia";
import { ref } from "vue";

export const alertStore = defineStore('alert', () => {
    const alert = ref({
        display: false,
        title: '',
        text: ''
    })

    function openAlert(title: string, text: string) {
        alert.value = {
            display: true,
            title,
            text
        }
    }

    return {
        alert,

        openAlert
    }
})

export default alertStore