<template>
  <v-container class="text-right">
    <h1 class="font-weight-bold" style="font-size: 7vw;line-height: 75%;">
      Construtores <br> de casas novas
    </h1>
  </v-container>
  <v-carousel hide-delimiters class="mt-10">
    <v-carousel-item v-for="(item, i) in 5" :key="i" class="text-left">
      <v-img
        style="margin-left: 10%;"
        :src="`https://picsum.photos/800/300?random=${i}`"
        cover
        height="800"
        width="1000"
      ></v-img>
    </v-carousel-item>
  </v-carousel>
</template>
<script setup lang="ts">
</script>
