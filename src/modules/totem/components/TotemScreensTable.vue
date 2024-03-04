<template>
  <v-data-table :items="screens" :headers="headers" @click:item="">
    <template #item.data.name="{ item }">
      <RouterLink :to="{ name: 'screen.detail', params: {id: totemId, screenId: item.id}}">
        {{ item.data.name }}
      </RouterLink>
    </template>
    <template #item.actions="{ item, index }">
      <v-btn icon variant="flat" @click="openPreview(index)">
        <v-icon> mdi-eye-outline </v-icon>
      </v-btn>
    </template>
    <template #bottom> </template>
  </v-data-table>
  <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="d-flex align-center bg-primary">
          <h2>{{ actualScreen.data.name }}</h2>
          <v-spacer/>
          <v-btn icon="mdi-close" variant="plain" @click="dialog = false"></v-btn>
        </v-card-title>
        <v-carousel v-model="activePreviewIndex">
          <v-carousel-item v-for="screen in screens">
              <component class="pointer-none" v-model="data" :is="components[screen.data.component]" />
          </v-carousel-item>
        </v-carousel>
      </v-card>
  </v-dialog>
</template>
<script lang="ts" setup>
import { components } from '@/modules/patient/helpers/totem-components';
import { data } from '@/modules/patient/views/default-data';
import { computed, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
interface Props {
  screens: ScreenTotem[];
}
const props = defineProps<Props>();
const route = useRoute();
const totemId = route.params.id
const dialog = ref<boolean>(false);
const activePreviewIndex = ref<number>(0);
const headers = [
  { title: "ID", value: "id" },
  { title: "Nome", value: "data.name"},
  { title: "Descrição", value: "data.description" },
  { title: "", value: "actions", sortable: false },
];
const actualScreen = computed(() => {
  return props.screens[activePreviewIndex.value];
});
function openPreview(index: number) {
  dialog.value = true;
  activePreviewIndex.value = index;
}
</script>
