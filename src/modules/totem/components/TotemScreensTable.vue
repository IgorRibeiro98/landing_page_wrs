<template>
  <v-data-table :items="screens" :headers="headers" @click:item="" :items-per-page="-1">
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

    <template #item.traits="{item}">
      {{item.traits.length ? item.traits.length : '-'}}
    </template>

    <template #item.fields="{item}">
      {{ item.fields.length ? item.fields.length : '-' }}
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
const route: any = useRoute();

const totemId = computed<string>(() => route.params.id as string);

const dialog = ref<boolean>(false);
const activePreviewIndex = ref<number>(0);
const headers = [
  { title: "ID", align: "start" ,value: "id", width: '5%'},
  { title: "Nome", align: "start" , value: "data.name", width: '20%'},
  { title: "Descrição", align: "start", value: "data.description", width: '20%'},
  { title: "Funcionalidades", align: "start", value: "traits", sortable: true, width: '5%'},
  { title: "Campos", align: "start" , value: "fields", sortable: true, width: '5%'},
  { title: "", align: "start" ,value: "actions", sortable: false, width: '5%'},
];
const actualScreen = computed(() => {
  return props.screens[activePreviewIndex.value];
});
function openPreview(index: number) {
  dialog.value = true;
  activePreviewIndex.value = index;
}

</script>
