<template>
    <v-row align-content="center" class="fill-height">
      <v-col cols="12" class="text-center">
        <v-btn
          size="x-large"
          @click="$router.push({
            name: 'home'
          })"
          variant="text"
        >
          Voltar
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        class="mt-auto d-flex justify-center"
      >
        <v-img
          :src="Image404"
          max-width="600"
        />
      </v-col>
      <v-col
        cols="12"
        class="d-flex justify-center"
      >
        <h1 class="display-3">Página não encontrada</h1>
        <!-- <h3 :class="$vuetify.breakpoint.xsOnly ? 'body-1' : 'display-1'">Página não encontrada</h3> -->
      </v-col>
    </v-row>
  </template>
  
  <script lang="ts" setup>
  import Image404 from '@/assets/note-found.svg'
  </script>