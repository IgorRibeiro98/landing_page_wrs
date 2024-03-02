<template>
    <v-breadcrumbs class="pa-0" :items="breadcrumbs">
        <template v-slot:divider>
            <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
    </v-breadcrumbs>

</template>
<script setup lang="ts">
import useSystemStore from '@/stores/system';
import { storeToRefs } from 'pinia';

const {
  breadcrumbs,
} = storeToRefs(useSystemStore())

const store = useSystemStore();
</script>
<style scoped lang="scss">
:deep(.v-breadcrumbs-item) {
    padding-left: 0;
    padding-right: 0;
}
</style>
