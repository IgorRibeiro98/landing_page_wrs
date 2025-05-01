<template>
    <v-card width="100%" height="100%">
        <v-card-title>
            <v-icon class="text-h2">
                {{ infoData.icon }}
            </v-icon>
        </v-card-title>
        <v-card-text class="py-10"></v-card-text>
        <v-card-text>
            <h2>{{ infoData.title }}</h2>
            <p>{{ infoData.description }}</p>
        </v-card-text>
    </v-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';

interface Props {
    infoData: InfoData
}

const props = defineProps<Props>();
</script>
<style scoped lang="scss"></style>