<template>
  <SubScreen v-model="screen" :subScreens="subScreens">
    assinatura
    <v-btn block @click="screen = 'FaceRecognition'">Biometria facial</v-btn>
    <v-btn block @click="screen = 'SendToken'">Token via SMS ou App</v-btn>
  </SubScreen>
</template>
<script lang="ts" setup>
import SubScreen from "@/modules/patient/components/SubScreen.vue";
import { AlertProps } from "@patient/types";
import { onMounted, ref } from "vue";
interface Emit {
  (event: "alert", options: AlertProps): void;
  (event: "next"): void;
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
