<template>
    <v-card>
        <v-card-title>
            <v-img :src="infoData.img"></v-img>
        </v-card-title>
        <v-card-text>
            <h6>{{ infoData.title }}</h6>
            <p>{{ infoData.description }}</p>
        </v-card-text>
    </v-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';

interface Props {
    infoData: InfoData
}
</script>
<style scoped lang="scss"></style>