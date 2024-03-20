<template>
  <Dialog
    :loading="loading"
    v-model="dialog"
    width="400"
    :form="formDialog"
    ref="dialogRef"
    @close="emit('close')"
  >
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from "@/components/Dialog.vue";

import { computed, ref } from "vue";

const props = defineProps<{
  attendanceTypes: AttendanceType[];
  attendanceType: AttendanceType;
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (event: "update:attendanceType", value: AttendanceType): void;
  (event: "update:modelValue", value: boolean): void;
  (event: "close"): void;
  (event: "update", value: AttendanceType): void;
}>();

const attendanceType = computed({
  get() {
    return props.attendanceType;
  },
  set(value: any) {
    emit("update:attendanceType", { ...value });
  },
});

const dialogRef = ref();

const dialog = computed({
  get() {
    return props.modelValue;
  },
  set(value: boolean) {
    emit("update:modelValue", value);
  },
});

const loading = ref(false);

const formDialog = ref<FormDialog>({
  title: "Vincular fila de atendimento",
  form: {
    value: attendanceType,
    inputs: [
      {
        component: "VTextField",
        label: "ID Integração",
        value: "integration_id",
        required: true,
        on: {},
        props: {
          autofocus: true,
        },
      },
    ],
  },
  submit: () => {
    emit("update", {
      ...attendanceType.value,
    });

    dialogRef.value.reset();
    dialog.value = false;
  },
});
</script>
