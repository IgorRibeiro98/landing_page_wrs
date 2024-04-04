<template>
  <v-dialog v-model="dialog" persistent width="900" class="totem">
    <v-card class="pa-5" width="900">
      <v-card-title class="px-0">
        <h1>
          {{ title }}
        </h1>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text class="px-0">
        <h2 v-html="textToShow">
        </h2>
      </v-card-text>

      <v-card-actions class="d-flex justify-center pa-0" v-if="action.type == 'choise'">
        <v-btn variant="outlined" rounded @click="action.callback(false); dialog = false">
            {{action.rejectLabel}}
        </v-btn>
        <v-btn variant="tonal" rounded color="primary" @click="action.callback(true); dialog = false">
            {{action.acceptLabel}}
        </v-btn>
      </v-card-actions>

      <v-card-actions v-else class="pa-0 d-flex justify-center">
        <v-btn variant="text" color="primary" @click="dialog = false">
          {{ action.label }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import { AlertProps } from "@patient/types";

interface Props extends AlertProps {
  modelValue: boolean
} 

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
}>();

const dialog = computed({
  get() {
    return props.modelValue;
  },
  set(value: boolean) {
    emit("update:modelValue", value);
  },
});

const textToShow = computed(() => {
  return props.text instanceof Error ? props.text.message : props.text;
});
</script>
