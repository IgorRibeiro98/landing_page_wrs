<template>
  <div>
    ATESTE
    <v-btn block @click="emit('to', 'ABC')">proxima subtela</v-btn>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
interface Emit {
  (event: "to", value: string): void;
}
interface Props {
  subScreens: Record<string, any>;
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();
const screen = ref("")

onMounted(() => {
})
</script>
