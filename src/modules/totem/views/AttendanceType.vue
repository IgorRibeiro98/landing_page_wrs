<template>
  <LayoutView title="Tipo de Atendimento" icon="mdi-sitemap">
    <template #action>
      <v-btn color="primary" flat @click="dialog = true" v-if="authorization.acl('attendance_type.view')"> Novo </v-btn>
    </template>

    <template #content>
      <v-data-table
        :headers="headers"
        :items="attendanceTypes"
        :loading="isLoading"
        :items-per-page="-1"
        @dblclick:row="setAttendanceType"
      >
        <template #item.icon="{ item }">
          <div class="d-flex justify-start">
            <img :src="item.icon" height="30" />
          </div>
        </template>

        <template #bottom> </template>

        <template #[`item.actions`]="{ item }">
          <v-menu>
            <template #activator="{ props }">
              <v-btn icon="mdi-dots-horizontal" variant="text" v-bind="props" v-if="authorization.acl('attendance_type.update|attendance_type.delete')">
              </v-btn>
            </template>

            <v-list>
              <template v-for="option in options">
                <v-list-item
                  v-if="authorization.acl(option.acl)"
                  link
                  @click="option.action(item)"
                >
                  <v-list-item-title>
                    {{ option.title }}
                  </v-list-item-title>
                </v-list-item>
              </template>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </template>
  </LayoutView>

  <AttendanceTypeDialog
    v-model="dialog"
    v-model:item="data"
    @submit="loadAttendanceTypes"
  />
</template>

<script lang="ts" setup>
import LayoutView from "@/components/LayoutView.vue";
import useAlertStore from "@/stores/alert";
import useSystemStore from "@/stores/system";
import { onMounted, ref, type Ref } from "vue";

import authorization from "@/plugins/authorization";

import AttendanceTypeDialog from "@/modules/totem/components/dialog/AttendanceTypeDialog.vue";

const dialog = ref(false);

const { closeAlert, openConfirmAlert } = useAlertStore();
const { setBreadcrumbs } = useSystemStore();

import {
  deleteAttendanceType,
  getAttendanceTypes,
} from "@/modules/totem/repositories/attendance-type.repository";

import defaultData from "@/modules/totem/default-values";

function setAttendanceType(
  _: MouseEvent,
  { item }: { item: AttendanceTypeData }
) {
  data.value = structuredClone({ ...item });
}

const isLoading = ref(false);

const data = ref<AttendanceTypeData>(
  structuredClone(defaultData.attendanceType)
);

const headers: any = ref([
  { align: "start", title: "Nome", value: "name" },
  { align: "start", title: "Icone", value: "icon" },
  { align: "start", title: "Descrição", value: "description" },
  { align: "start", title: "", value: "actions" },
]);

const options = ref<any>([
  {
    title: "Editar",
    acl: 'attendance_type.update',
    action: (item: AttendanceTypeData) => {
      data.value = { ...item };
      dialog.value = true;
    },
  },
  {
    title: "Excluir",
    acl: 'attendance_type.delete',
    action: (item: AttendanceTypeData) => {
      openConfirmAlert(
        {
          title: "Remover Tipo de Atendimento",
          text: `Deseja realmente remover o item <span class="text-no-wrap bg-primary pa-1 rounded"> ${item.name}</span>?`,
        },
        (loading: Ref<boolean>) => {
          loading.value = true;

          deleteAttendanceType(item.id!).finally(() => {
            loading.value = false;
            closeAlert();
            loadAttendanceTypes(false);
          });
        }
      );
    },
  },
]);

const attendanceTypes = ref<AttendanceTypeData[]>([]);

function loadAttendanceTypes(mustLoading = false) {
  if (mustLoading) isLoading.value = true;

  getAttendanceTypes()
    .then((response) => {
      attendanceTypes.value = response.data;
    })
    .finally(() => {
      isLoading.value = false;
    });
}

onMounted(() => {
  loadAttendanceTypes(true);
  setBreadcrumbs([
    {
      title: "Tipo de Atendimento",
      to: {
        name: "attendance-type.view",
      },
    },
  ]);
});
</script>
