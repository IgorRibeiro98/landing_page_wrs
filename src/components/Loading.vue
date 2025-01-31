<template>
  <v-dialog v-model="display" persistent fullscreen class="totem">
      <BaseLayout class="bg-white">
          <div class="d-flex align-center justify-center flex-column fill-height">
              <v-sheet width="auto" class="pa-4">
                  <h1 class="d-flex justify-center font-weight-bold">
                      {{ text }}
                      <div class="d-flex">
                          <div class="dot dot1">.</div>
                          <div class="dot dot2">.</div>
                          <div class="dot dot3">.</div>
                      </div>
                  </h1>
              </v-sheet>
              <div style="width: 50%">
                  <v-progress-linear indeterminate color="primary" rounded height="6">
                  </v-progress-linear>
              </div>
          </div>
      </BaseLayout>
  </v-dialog>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import BaseLayout from '@/components/BaseLayout.vue'

const props = defineProps<{
  modelValue: boolean,
  text?: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', payload: boolean): void
}>()

const display = computed({
  get() {
      return props.modelValue;
  },
  set(value: boolean) {
      emit('update:modelValue', value)
  },
});

</script>

<style scoped>
@keyframes spin {
  from {
      transform: rotate(0deg);
  }

  to {
      transform: rotate(360deg);
  }
}

.dot {
  animation: bounce 0.5s infinite alternate;
}

.dot1 {
  animation-delay: 0.2s;
}

.dot2 {
  animation-delay: 0.4s;
}

.dot3 {
  animation-delay: 0.6s;
}

@keyframes bounce {
  from {
      transform: translateY(0);
  }

  to {
      transform: translateY(-2px);
  }
}
</style>
