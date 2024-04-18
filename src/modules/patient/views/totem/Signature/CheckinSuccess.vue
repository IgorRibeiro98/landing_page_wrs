<template>
  <div class="fill-height d-flex align-center">
    <div>
      <v-img height="112" :src="checkCircle" class="mb-4"></v-img>
      <h1 class="text-success text-center">
        Você realizou o check-in rápido! :)
      </h1>

      <p class="text-center">
        Com esse benefício você não precisa mais enfrentar filas, basta aguardar
        ser chamado por seu médico pelo painel.
      </p>
      
      <Timer hide-number :timer="20" class="mt-4" @end="$emit('next')"/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import checkCircle from '@/assets/icons/check-circle.svg'
import Timer from '@patient/components/Timer.vue'

defineEmits<{
  (event: 'next'): void
}>()
</script>
