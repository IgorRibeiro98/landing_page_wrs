<template>
  <v-app>
    <v-layout class="rounded rounded-md">
      <router-view />
    </v-layout>
    <Alert />
  </v-app>
</template>

<script lang="ts" setup>
import Alert from '@/components/Alert.vue'
</script>
