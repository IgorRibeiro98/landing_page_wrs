<template>
  <div :class="{ 'h-100vh': !mobile }">
    <v-row justify="center" class="pa-4">
      <v-col cols="12" class="text-right">
        <h1 class="font-weight-bold text-h1 mb-15" style="line-height: 80%;">
          Construtores <br> de casas novas
        </h1>
      </v-col>
      <v-col cols="12" class="d-flex flex-column flex-grow-1">
        <v-carousel hide-delimiters height="100%" style="overflow: hidden;max-width: 100%">
          <v-carousel-item v-for="(item, i) in 5" :key="i" class="text-left">
            <v-img :src="`https://picsum.photos/800/300?random=${i}`" cover :height="mobile ? '200' : '500'"
              width="100%"></v-img>
          </v-carousel-item>
          <template #prev="{ props }">
            <v-btn color="white" v-bind="props" icon="mdi-chevron-left">
            </v-btn>
          </template>
          <template #next="{ props }">
            <v-btn color="white" v-bind="props" icon="mdi-chevron-right">
            </v-btn>
          </template>
        </v-carousel>
      </v-col>
    </v-row>
  </div>
  <div class="bg-secondary">
    <v-row class="pa-4">
      <v-col cols="12">
        <h2 class="text-h2">
          Nossos <br> serviços
        </h2>

      </v-col>
    </v-row>
  </div>
  <div class="bg-white">
    <v-row class="pa-4">
      <v-col>
        <h2 class="text-h2">
          Nossos <br> projetos
        </h2>
      </v-col>
    </v-row>
  </div>
  <v-row justify="space-evenly" class="py-4">
    <v-col cols="12" md="3" class="d-flex flex-column align-end">
      <v-img src="https://picsum.photos/800/300?random=1" height="400" width="100%" cover></v-img>
    </v-col>
    <v-col cols="12" md="6" class="d-flex align-center">
      <div>
        <h3 class="text-h3">
          Pronto para criar sua visão?
        </h3>
        <p>
          Tudo começa com uma ideia. Talvez você queira abrir um negócio. Talvez você queira transformar um passatempo
          em
          algo mais sério. Ou talvez você tenha um projeto criativo para compartilhar com o mundo.
        </p>
        <v-btn class="mt-4">Entre em contato</v-btn>
      </div>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();

</script>
