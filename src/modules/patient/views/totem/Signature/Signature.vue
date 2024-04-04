<template>
  assinatura
  <v-btn @click="emit('next')">proxima</v-btn>
</template>
<script lang="ts" setup>
import { AlertProps } from "@patient/types";

interface Emit {
  (event: "alert", options: AlertProps): void;
  (event: "next"): void;
}

const emit = defineEmits<Emit>();

</script>
