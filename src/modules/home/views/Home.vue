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
        <h2 class="text-h3">
          Nossos <br> serviços
        </h2>
      </v-col>
      <v-col cols="12" md="3" v-for="(item) in infoData">
        <InfoCard :info-data="item" />
      </v-col>
      <v-col cols="12" class="mb-10">
        <ContactButton />
      </v-col>
    </v-row>
  </div>
  <div class="bg-white">
    <v-row class="pa-4">
      <v-col cols="12">
        <h2 class="text-h3">
          Nossos <br> projetos
        </h2>
      </v-col>
      <v-col cols="12">
        <v-slide-group v-model="model" class="pa-4" center-active show-arrows>
          <v-slide-group-item v-for="img in images" v-slot="{ isSelected, toggle }">
            <v-card width="300" height="400" class="mx-10" @click="toggle">
              <v-img :src="img" height="100%" width="100%" cover>
              </v-img>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
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
        <ContactButton></ContactButton>

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
          <v-img src="https://picsum.photos/800/300?random=1" height="400" :width="mobile ? '100%' : '70%'" cover
            class="mb-10"></v-img>
          <p>
            Tudo começa com uma ideia. Talvez você queira abrir um negócio. Talvez você queira transformar um passatempo
            em algo mais sério. Ou talvez você tenha um projeto criativo para divulgar ao mundo. Seja o que for, o modo
            de
            contar sua história on-line faz toda a diferença.
          </p>
          <p>
            Não se preocupe em parecer profissional. Seja você mesmo. Existem mais de 1,5 bilhão de sites, mas a sua
            história é o diferencial que separa você dos outros. Se você ler as palavras em voz alta e não se sentir
            identificado, isso significa que o texto ainda precisa ser trabalhado.
          </p>
        </v-col>
        <v-col cols="12" md="5">
          <v-img src="https://picsum.photos/800/300?random=1" height="600" width="100%" cover></v-img>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div class="bg-primary">
    <v-row class="pa-4">
      <v-col cols="12">
        <h3 class="text-h3">
          {{ contactData.title }}
        </h3>
        <p>
          {{ contactData.street }}
        </p>
        <p>
          {{ contactData.phone }} <br>
          {{ contactData.email }}
        </p>
        <ContactButton></ContactButton>
      </v-col>

    </v-row>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";
import InfoCard from "@/modules/home/components/InfoCard.vue";
import ContactButton from "@/components/ContactButton.vue";
const { mobile } = useDisplay();

const model = ref(null);

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

const contactData = ref({
  title: "Fale conosco",
  street: "Rua dos bobos, 0, Diadema, SP 09929-222",
  phone: "(11) 99999-9999",
  email: "teste@teste.com.br"
});

const images = ref([
  'https://picsum.photos/800/300?random=1',
  'https://picsum.photos/800/300?random=2',
  'https://picsum.photos/800/300?random=3',
  'https://picsum.photos/800/300?random=4',
  'https://picsum.photos/800/300?random=5',
  'https://picsum.photos/800/300?random=6',
  'https://picsum.photos/800/300?random=7',
  'https://picsum.photos/800/300?random=8',
])
</script>
<style></style>
