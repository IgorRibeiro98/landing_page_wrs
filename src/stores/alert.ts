import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { Ref } from "vue";
import { ref } from "vue";

export const alertStore = defineStore('alert', () => {

  interface Alert {
    display: boolean,
    title: string,
    text: string,
    options: {
      type: 'confirm' | 'alert',
      callback: (loading: Ref<boolean>) => void,
    }
  }

  interface ConfirmAlertOptions {
    title: string,
    text: string,
  }

  const alert = ref<Alert>({
    display: false,
    title: '',
    text: '',
    options: {
      type: 'confirm',
      callback: (loading: Ref<boolean>) => { }
    }
  })

  function openAlert(title: string, text: string | AxiosError) {
    if (text instanceof AxiosError) {
      const data = text.response?.data as any;

      text = data.message as string ?? 'Erro desconhecido'
    }

    alert.value = {
      display: true,
      title,
      text,
      options: {
        type: 'alert',
        callback: (loading: Ref<boolean>) => { }
      }
    }
  }

  function openConfirmAlert({
    title,
    text
  }: ConfirmAlertOptions, callback: (loading: Ref<boolean>) => void) {

    alert.value = {
      display: true,
      title,
      text,
      options: {
        type: 'confirm',
        callback
      }
    }
  }

  function openDeleteAlert(callback: (loading: Ref<boolean>) => void, options?: ConfirmAlertOptions) {
    openConfirmAlert(Object.assign(options ?? {},{
      title: 'Deletar',
      text: 'Tem certeza que deseja excluir? está ação é irreversível.'
    }), callback)
  }

  function closeAlert() {
    alert.value.display = false
  }

  return {
    alert,

    openAlert,
    closeAlert,
    openConfirmAlert,
    openDeleteAlert
  }
})

export default alertStore
