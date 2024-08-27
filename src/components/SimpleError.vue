<template>
  <v-sheet class="d-flex justify-center align-center" height="100%">
    <div>
      <v-icon size="150" color="red">{{ props.icon }}</v-icon>
      <p class="text-h5">{{ props.message }}</p>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
  const props = defineProps<{
    message: string;
    icon: string;
  }>();
</script>
