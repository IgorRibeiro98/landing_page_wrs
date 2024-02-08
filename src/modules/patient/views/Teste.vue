<template>
    <div class="top bg-warning">
        <v-text-field label="teste">

        </v-text-field>

        <v-text-field label="teste">

        </v-text-field>

        <v-text-field label="teste">

        </v-text-field>
        <v-text-field label="teste">

        </v-text-field>
        <v-text-field label="teste">

        </v-text-field>
        <v-text-field label="teste">

        </v-text-field>
    </div>

    <div class="bottom bg-primary">
        <VirtualKeyboard />
    </div>
</template>

<script lang="ts" setup>

import VirtualKeyboard from '@/components/VirtualKeyboard.vue'
</script>

<style scoped>
.layout-container {
    display: flex;
    flex-direction: column;
    height: 100vh
}


.top {
    flex-grow: 1;
    flex-shrink: 1;
    overflow: auto;
}

.bottom {
    flex-grow: 0;
    flex-shrink: 0;
    overflow: auto
}
</style>