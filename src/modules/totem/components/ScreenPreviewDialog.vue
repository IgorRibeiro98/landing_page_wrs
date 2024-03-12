<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title class="d-flex align-center bg-primary">
        <h2>{{ actualScreen.name }}</h2>
        <v-spacer />
        <v-btn icon="mdi-close" variant="plain" @click="dialog = false"></v-btn>
      </v-card-title>
      <v-carousel v-model="activePreviewIndex">
        <v-carousel-item v-for="screen in screens">
          <component
            class="pointer-none"
            v-model="data"
            :is="components[screen.component]"
          />
        </v-carousel-item>
      </v-carousel>
    </v-card>
  </v-dialog>
</template>
<script lang="ts" setup>
import { ReactiveProps } from '@/helpers/vue';
import { components } from '@/modules/patient/helpers/totem-components';
import { data } from '@/modules/patient/views/default-data';
import { computed } from 'vue';
interface Props {
  screens: Screens[],
  modelValue: boolean,
  actualScreenIndex: number,
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'update:actualScreenIndex', value: number): void;
}>()
const reactiveProp = new ReactiveProps(props, emit)

const [
  dialog, activePreviewIndex
] = reactiveProp.many(['modelValue', 'actualScreenIndex']);

const actualScreen = computed(() => props.screens[activePreviewIndex.value]);
</script>
