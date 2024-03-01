import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { Ref } from "vue";
import { ref } from "vue";

export const alertStore = defineStore('alert', () => {

  interface Options {
    confirm: boolean,
    onConfirm: (loading: Ref<boolean>) => void  
  }
  const alert = ref({
    display: false,
    title: '',
    text: '',
    options: {
      confirm: false,
      onConfirm: (loading: Ref<boolean>) => { }
    }
  })

  function openAlert(title: string, text: string | AxiosError, options: Options| null = null) {
    if (text instanceof AxiosError) {
      const data = text.response?.data as any;

      text = data.message as string ?? 'Erro desconhecido'
    }

    alert.value = {
      display: true,
      title,
      text,
      options: options ?? {
        confirm: false,
        onConfirm: () => { }
      }
    }
  }

  function closeAlert() {
    alert.value.display = false
  }

  return {
    alert,

    openAlert,
    closeAlert
  }
})

export default alertStore
