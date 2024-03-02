<template>
  <Dialog :loading="loading" v-model="dialog" width="400" :form="formDialog" @clock="emit('close')"></Dialog>
</template>
<script lang="ts" setup>
import Dialog from "@/components/Dialog.vue";
import { createTotem, updateTotem } from "@/modules/totem/repositories/totem.repository";
import useAlertStore from "@/stores/alert";
import { computed, ref } from "vue";
const props = defineProps<{
  modelValue: boolean;
  totem: TotemItem;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
  (event: "update:totem", value: TotemItem): void;
  (event: "save"): void;
  (event: "close"): void;
}>();

const internalTotem = computed({
  get: () => props.totem,
  set: (value) => emit("update:totem", value),
});
const isUpdate = computed(() => {
  return internalTotem.value.id !== 0
})

const title = computed(() => {
  return isUpdate.value ? "Editar Totem" : "Adicionar Totem"
})

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
const { openAlert } = useAlertStore();


const loading = ref<boolean>(false);

const formDialog = ref<FormDialog>({
  title,
  form: {
    value: internalTotem,
    inputs: [
      {
        component: "VTextField",
        value: "name",
        label: "Nome",
        required: true,
        on: {}
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
  const promise = isUpdate.value
    ? updateTotem(internalTotem.value.id, internalTotem.value)
    : createTotem(internalTotem.value);
  promise
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
