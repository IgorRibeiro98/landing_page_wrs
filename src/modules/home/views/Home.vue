<template>
  <v-row justify="center" class="pa-4">
    <v-col cols="12" md="10" class="text-right text-right">
      <h1 class="font-weight-bold text-h1" style="line-height: 80%;">
        Construtores <br> de casas novas
      </h1>
    </v-col>
    <v-col cols="12">
      <v-carousel hide-delimiters class="pt-5" height="100%" style="overflow: hidden;max-width: 100%">
        <v-carousel-item v-for="(item, i) in 5" :key="i" class="text-left">
          <v-img :src="`https://picsum.photos/800/300?random=${i}`" cover :height="mobile ? '200' : '500'"
            width="100%"></v-img>
        </v-carousel-item>
        <template #prev="{ props }">
          <v-btn icon color="white" v-bind="props">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </template>
        <template #next="{ props }">
          <v-btn icon color="white" v-bind="props">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </template>
      </v-carousel>
    </v-col>
  </v-row>
  <div class="bg-secondary">
    <v-row class="pa-4">
      <v-col>
        <h2 class="text-h2">
          Nossos <br> serviços
        </h2>
      </v-col>
    </v-row>
  </div>
</template>
<script setup lang="ts">
import { useDisplay } from "vuetify";
import { computed } from "vue";

const { mobile } = useDisplay();

</script>
