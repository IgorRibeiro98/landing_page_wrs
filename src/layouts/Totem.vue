<template>
    <v-main class="fill-height" fluid>
        <div class="layout-container fill-height">
            <v-container class="top-container" fluid>
                <router-view />
            </v-container>

            <VirtualKeyboard class="bottom-container" />
        </div>
    </v-main>
</template>

<script lang="ts" setup>
import VirtualKeyboard from '@/components/VirtualKeyboard.vue'
</script>

<style scoped>
.layout-container {
    display: flex;
    flex-direction: column;
}

.top-container {
    flex-grow: 1;
    overflow: auto;
}

.bottom-container {
    flex-shrink: 0;
}
</style>