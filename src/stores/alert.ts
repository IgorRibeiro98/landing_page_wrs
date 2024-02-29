import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const alertStore = defineStore('alert', () => {
  const alert = ref({
    display: false,
    title: '',
    text: ''
  })

  function openAlert(title: string, text: string | AxiosError) {
    if (text instanceof AxiosError) {
      const data = text.response?.data as any;

      text = data.message as string ?? 'Erro desconhecido'
    }
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
