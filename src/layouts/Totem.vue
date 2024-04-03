<template>
    <v-main class="layout-container">
        <div class="top-container">
            <router-view />
        </div>
    </v-main>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.layout-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.top-container {
    flex-grow: 1;
    flex-shrink: 1;
    overflow: auto;
}

.bottom-container {
    flex-grow: 0;
    flex-shrink: 0;
    overflow: auto
}
</style>