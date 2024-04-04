<template>
 <Dialog
    v-model="dialog"
    title="Tipo de Atendimento"
    hide-actions
    @close="clear"
  >
    <template #content>
      <AttendanceTypeForm
        ref="form"
        v-model="data"
        @cancel="dialog = false"
        @submit="dialog = false; emit('submit')"
      />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import AttendanceTypeForm from "@/modules/totem/components/form/AttendanceTypeForm.vue";

import { computed } from 'vue';

import defaultData from "@/modules/totem/default-values";

interface Props {
    modelValue: boolean;
    item: AttendanceTypeData
}

interface Emit {
    (event: 'update:modelValue', payload: boolean): void
    (event: 'update:item', payload: AttendanceTypeData): void
    (event: 'submit'): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emit>()

const data = computed({
    get() {
        return props.item
    },
    set: (value: AttendanceTypeData) => emit('update:item', value)
})

const dialog = computed({
    get() {
        return props.modelValue
    },
    set: (value: boolean) => emit('update:modelValue', value)
})

function clear() {
    data.value = structuredClone(defaultData.attendanceType);
}

</script>