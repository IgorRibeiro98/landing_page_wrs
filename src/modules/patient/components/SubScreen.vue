<template>
  <KeepAlive v-show="currentScreen">
    <component @to="screenName = $event" :is="currentScreen"></component>
  </KeepAlive>
  <div v-show="currentScreen === false">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  modelValue: string;
  subScreens: Record<string, any>;
}
interface Emit {
  (event: "update:modelValue", value: string): void;
}

const emit = defineEmits<Emit>();

const screenName = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});

const props = defineProps<Props>();
const currentScreen = computed(() => {
  return props.subScreens[screenName.value] || false;
});
</script>
