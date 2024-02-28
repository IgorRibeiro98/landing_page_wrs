<template>
  <v-sheet color="white" rounded>
    <v-row>
      <v-col class="d-flex align-center">
        <h1>
          <v-icon icon="mdi-monitor-vertical"></v-icon> Totens
        </h1>

        <v-spacer></v-spacer>
        <v-btn color="primary" flat>
          Novo
        </v-btn>
      </v-col>

      <v-col cols="12">
        <v-data-table :headers="headers" :items="items">

          <template #[`item.name`]="{ item }">
            <RouterLink :to="{ name: 'totem.view' }">
              {{ item.name }}
            </RouterLink>
          </template>
          <template #[`item.queues_count`]="{ item }">
            <v-icon icon="mdi-format-list-bulleted">
            </v-icon>
            {{ item.queues_count }}
          </template>

          <template #[`item.screens_count`]="{ item }">
            <v-icon icon="mdi-monitor">
            </v-icon>
            {{ item.screens_count }}
          </template>

          <template #[`item.updated_at`]="{ item }">
            <v-icon icon="mdi-calendar"></v-icon>
            {{ new Date(item.updated_at).toLocaleString() }}
          </template>

          <template #bottom>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'

const headers: any = [
  { title: 'ID', value: 'id', align: 'start', width: '5%' },
  { title: 'Nome', value: 'name', align: 'start', width: '20%' },
  { title: 'Descrição', value: 'description', align: 'start', width: '20%' },
  { title: 'Filas', value: 'queues_count', align: 'start', width: '5%' },
  { title: 'Telas', value: 'screens_count', align: 'start', width: '5%' },
  { title: 'Última atualização', value: 'updated_at', align: 'start', width: '15%' }
]

const items = [
  {
    "id": 1,
    "name": "Internação TESTE",
    "description": "Totem avançado da internação apenas com fluxo padrão",
    "created_at": "2024-02-27T21:42:43.000000Z",
    "updated_at": "2024-02-27T21:42:43.000000Z",
    "queues_count": 5,
    "screens_count": 5
  },
  {
    "id": 1,
    "name": "Internação TESTE",
    "description": "Totem avançado da internação apenas com fluxo padrão",
    "created_at": "2024-02-27T21:42:43.000000Z",
    "updated_at": "2024-02-27T21:42:43.000000Z",
    "queues_count": 5,
    "screens_count": 5
  }
]
</script>
