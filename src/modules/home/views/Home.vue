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
      <v-col cols="12" md="3" v-for="(item) in infoData">
        <InfoCard :info-data="item" />
      </v-col>
    </v-row>
  </div>
  <div class="bg-white">
    <v-row class="pa-4">
      <v-col cols="12">
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
        <v-btn rounded class="mt-4">Entre em contato</v-btn>
      </div>
    </v-col>
  </v-row>
  <div class="bg-white">
    <v-container>
      <v-row justify="space-between" class="pa-4">
        <v-col cols="12" class="text-center">
          <h2 class="text-h2 py-4">
            Construindo casas novas <br> desde 1985
          </h2>
        </v-col>
        <v-col cols="12" md="5">
          <v-img src="https://picsum.photos/800/300?random=1" height="400" :width="mobile ? '100%': '70%'" cover class="mb-10"></v-img>
          <p>
            Tudo começa com uma ideia. Talvez você queira abrir um negócio. Talvez você queira transformar um passatempo em algo mais sério. Ou talvez você tenha um projeto criativo para divulgar ao mundo. Seja o que for, o modo de contar sua história on-line faz toda a diferença.
          </p>
          <p>
            Não se preocupe em parecer profissional. Seja você mesmo. Existem mais de 1,5 bilhão de sites, mas a sua história é o diferencial que separa você dos outros. Se você ler as palavras em voz alta e não se sentir identificado, isso significa que o texto ainda precisa ser trabalhado.
          </p>
        </v-col>
        <v-col cols="12" md="5">
          <v-img src="https://picsum.photos/800/300?random=1" height="600" width="100%" cover></v-img>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";
import InfoCard from "@/modules/home/components/InfoCard.vue";
const { mobile } = useDisplay();

const infoData = ref<InfoData[]>([
  {
    title: "Decks e pátios",
    description: "Construímos a casa dos seus sonhos com qualidade e segurança.",
    icon: "mdi-home",
  },
  {
    title: "Áreas externas",
    description: "Tudo começa com uma ideia. Talvez você queira abrir um negócio.",
    icon: "mdi-wrench",
  },
  {
    title: "Adições personalizadas",
    description: "Tudo começa com uma ideia. Talvez você queira abrir um negócio.",
    icon: "mdi-hammer-screwdriver",
  },
  {
    title: "Construção verde",
    description: "Tudo começa com uma ideia. Talvez você queira abrir um negócio.",
    icon: "mdi-hammer-screwdriver",
  },

]);
</script>
<style>

</style>
