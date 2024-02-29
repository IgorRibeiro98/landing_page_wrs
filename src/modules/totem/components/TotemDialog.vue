<template>
  <Dialog
    :loading="loading"
    v-model="dialog"
    width="400"
    :form="formDialog"
  ></Dialog>
</template>
<script lang="ts" setup>
import Dialog from "@/components/Dialog.vue";
import { createTotem } from "@/modules/totem/repositories/totem.repository";
import useAlertStore from "@/stores/alert";
import { computed, ref } from "vue";
const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
  (event: "save"): void;
}>();

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
const { openAlert } = useAlertStore();

const totem = ref<TotemItem>({
  id: 0,
  name: "",
  description: "",
  screens_count: 0,
  queues_count: 0,
  updated_at: "",
});
const loading = ref<boolean>(false);

const formDialog = ref<FormDialog>({
  title: "Adicionar Totem",
  form: {
    value: totem,
    inputs: [
      {
        component: "VTextField",
        value: "name",
        label: "Nome",
        required: true,
      },
      {
        component: "VTextarea",
        value: "description",
        label: "Descrição",
        required: true,
      },
    ],
  },
  submit: () => save(),
});

function save() {
  loading.value = true;
  createTotem(totem.value)
    .then(() => {
      dialog.value = false;
      emit("save");
    })
    .catch((err) => {
      openAlert("Falha ao salvar totem", err);
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>
