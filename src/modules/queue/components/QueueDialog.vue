<template>
  <Dialog :loading="loading" v-model="dialog" width="400" v-model:form="formDialog">
  </Dialog>
</template>
<script lang="ts" setup>

import Dialog from "@/components/Dialog.vue";
import { createQueue, updateQueue } from "@/modules/queue/repositories/queue.repository";
import useAlertStore from "@/stores/alert";
import { AxiosError } from "axios";
import { computed, ref } from "vue";

const { openAlert } = useAlertStore();

const props = defineProps<{
  modelValue: boolean;
  queue: Queue & { icon?: File[] }
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
  (event: "update:queue", value: boolean): void;
  (event: "save"): void;
}>();

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const iconWasEddited = ref<boolean>(false);
const icon = ref<File[]>([])

const loading = ref<boolean>(false);

const queue = computed<any>({
  get: () => {
    getIconFromURL(props.queue.icon_src)
    return props.queue
  },
  set: (value) => {
    emit("update:queue", value)
  }
})

const formDialog = ref<FormDialog>({
  title: "Adicionar Fila",
  form: {
    value: queue,
    inputs: [
      {
        component: "VTextField",
        value: "name",
        label: "Nome",
        required: true,
        on: {}
      },
      {
        component: "VFileInput",
        value: "icon",
        label: "Ícone",
        required: true,
        on: {
          change: () => iconWasEddited.value = true
        },
        props: {
          accept: "image/*",
          multiple: false,
          chips: true,
        }
      },
      {
        component: "VTextarea",
        value: "description",
        label: "Descrição",
        required: true,
        on: {}
      },
    ],
  },
  submit: () => save(),
});

function save() {
  loading.value = true;

  const { icon_src, ...payload } = queue.value;

  const formData = new FormData()

  Object.entries(payload).forEach(([key, value]: any) => {
    formData.append(key, value)
  })

  if (iconWasEddited.value)
    formData.set('icon_src', icon.value[0])

  const queuePromise = props?.queue?.id ? updateQueue(props.queue.id, formData) : createQueue(formData);

  queuePromise
    .then(() => {
      dialog.value = false;
      emit("save");
    })
    .catch((err: AxiosError) => {
      openAlert("Falha na requisição", err);
    })
    .finally(() => {
      loading.value = false;
    });
}

async function getIconFromURL(url: string) {
  const response = await fetch(url, { method: 'GET', mode: "no-cors" })

  const data = await response.blob();

  const fileName = url.match(/[^/]*$/)?.[0]

  props.queue.icon = [new File([data], fileName ?? 'Não identificado', { type: response.headers.get('Content-Type') as string })]
}
</script>
  