<template>
  <LayoutView icon="mdi-format-list-bulleted" title="Gerenciamento de filas">
    <template #content>
      <v-row>
        <v-col cols="12" class="d-flex justify-center flex-column align-center">
          <v-expansion-panels v-model="expansion">
            <queue-totem-panel
              v-for="(data, i) in items"
              v-model="items[i]"
              :form="formData"
            >
              <template #item:table>
                <v-data-table
                  :items="items[i].attendance_hours"
                  :headers="attendanceHourHeaders"
                  show-select
                  :item-value="(item) => item"
                  v-model="attendanceTypesSelected"
                  no-data-text="Adicione um novo horário"
                >
                  <template #top>
                    <v-toolbar>
                      <div
                        class="d-flex justify-space-between mx-1 w-100 align-center"
                      >
                        <div>
                          <v-expand-x-transition>
                            <v-btn
                              icon="mdi-delete"
                              variant="text"
                              color="primary"
                              v-if="
                                data.attendance_hours.length &&
                                attendanceTypesSelected.length
                              "
                              @click="removeSelectedAttendanceHours"
                            >
                            </v-btn>
                          </v-expand-x-transition>
                        </div>

                        <v-btn
                          variant="tonal"
                          color="primary"
                          @click="attendanceHourDialog = true"
                        >
                          Novo Horário
                        </v-btn>
                      </div>
                    </v-toolbar>
                  </template>

                  <template #item.weekday_iso="{ item }: any">
                    {{ getWeekDayLabel(item.weekday_iso) }}
                  </template>

                  <template #item.actions="{ item }">
                    <v-menu>
                      <template #activator="{ props }">
                        <v-btn
                          icon="mdi-dots-horizontal"
                          v-bind="props"
                          variant="text"
                          size="small"
                        >
                        </v-btn>
                      </template>

                      <v-list>
                        <v-list-item
                          link
                          @click="option.action(item)"
                          v-for="option in options"
                        >
                          <v-list-item-title>
                            {{ option.title }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </template>

                  <template #bottom> </template>
                </v-data-table>
              </template>

              <template #item:attendance_types="{ props, on }">
                <v-autocomplete
                  v-bind="props"
                  v-on="on"
                  v-model="data.attendance_types"
                >
                  <template #chip="{ props, item: { raw } }">
                    <v-chip
                      v-bind="props"
                      prepend-icon="mdi-connection"
                      @click="editAttendanceType(raw)"
                    >
                      {{ raw.integration_id }} -
                      {{ raw.data.name }}
                    </v-chip>
                  </template>
                </v-autocomplete>
              </template>
            </queue-totem-panel>
          </v-expansion-panels>

          <div class="mt-4">
            <v-badge color="warning" v-model="allQueueIsAdded">
              <template #badge>
                <v-tooltip>
                  <template #activator="{ props }">
                    <v-icon icon="mdi-alert" v-bind="props" />
                  </template>

                  <p>Todas as filas já foram mapeadas para este totem</p>
                </v-tooltip>
              </template>
              <v-btn
                class="mx-auto"
                color="secondary"
                :disabled="allQueueIsAdded"
                @click="nextItem"
              >
                Adicionar configuração da fila
              </v-btn>
            </v-badge>
          </div>
        </v-col>

        <v-col class="d-flex align-end justify-end">
          <v-btn
            variant="tonal"
            color="primary"
            @click="save"
            :disabled="isLoading"
            :loading="isLoading"
          >
            Salvar
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </LayoutView>

  <TotemAttendanceTypeDialog
    :attendanceTypes="currentQueueTotem.attendance_types"
    v-model="attendanceTypeDialog"
    v-model:attendanceType="attendanceType"
    @update="addAttendanceType($event)"
    @close="removeLastAttendanceType"
  />

  <TotemAttendanceHourDialog
    :attendanceHours="currentQueueTotem.attendance_hours"
    v-model="attendanceHourDialog"
    v-model:attendanceHour="attendanceHour"
    @update="addAttendanceHour"
  />
</template>

<script lang="ts" setup>
import LayoutView from "@/components/LayoutView.vue";
import { getQueues } from "@/modules/queue/repositories/queue.repository";
import { getAttendanceTypes } from "@/modules/totem/repositories/attendance-type.repository";
import {
  findTotem,
  updateQueueTotem,
} from "@/modules/totem/repositories/totem.repository";
import useAlertStore from "@/stores/alert";
import useSystemStore from "@/stores/system";
import { computed, onMounted, ref } from "vue";
import QueueTotemPanel from "../components/QueueTotemPanel.vue";
import TotemAttendanceHourDialog from "../components/TotemAttendanceHourDialog.vue";
import TotemAttendanceTypeDialog from "../components/TotemAttendanceTypeDialog.vue";

import { useRoute } from "vue-router";

const { setBreadcrumbs } = useSystemStore();

const route = useRoute();

interface QueueTotem {
  attendance_types: AttendanceType[];
  attendance_hours: AttendanceHour[];
  off_hours_message: string;
  data?: Queue;
  form: {
    value: boolean;
  };
}

const { openAlert } = useAlertStore();

const options = [
  {
    title: "Editar",
    action: (item: any) => {
      attendanceHour.value = { ...item };
      attendanceHourDialog.value = true;
    },
  },
  {
    title: "Remover",
    action: (item: any) => {
      currentQueueTotem.value.attendance_hours.splice(
        currentQueueTotem.value.attendance_hours.indexOf(item),
        1
      );
    },
  },
];

const attendanceHour = ref<AttendanceHour | { weekday_iso: number | null }>({
  start_time: "",
  end_time: "",
  weekday_iso: null,
});

const attendanceType = ref<AttendanceType>({
  data: null,
  integration_id: "",
  attendance_type_id: 0,
});

const expansion = ref<number | null>(null);

const queues = ref<Queue[]>([]);

const defaultQueueTotem: QueueTotem = {
  attendance_types: [],
  attendance_hours: [],
  off_hours_message: "",
  form: {
    value: false,
  },
};

const items = ref<QueueTotem[]>([]);

const attendanceHourHeaders = ref([
  {
    title: "Dia da semana",
    key: "weekday_iso",
  },
  {
    title: "Horário de início",
    key: "start_time",
  },
  {
    title: "Horário de término",
    key: "end_time",
  },
  {
    title: "",
    key: "actions",
    sortable: false,
  },
]);

const attendanceTypesSelected = ref<AttendanceHour[]>([]);

const isLoading = ref(false);

const attendanceTypeDialog = ref(false);

const attendanceHourDialog = ref(false);

const attendanceTypeCollection = ref([]);

const formData = ref<FormItem[]>([
  {
    label: "Fila",
    value: "data",
    component: "VAutocomplete",
    cols: {
      cols: "12",
    },
    on: {},
    props: {
      clearable: true,
      items: computed(() => {
        return queues.value.map((item) => {
          return {
            ...item,
            props: {
              disabled: items.value.some(
                (queueTotemItem) => queueTotemItem.data?.name == item.name
              ),
            },
          };
        });
      }),
      itemTitle: "name",
      returnObject: true,
    },
    required: true,
  },
  {
    label: "Tipo de Atendimento",
    value: "attendance_types",
    component: "VAutocomplete",
    cols: {
      cols: "12",
    },
    required: true,
    on: {
      "update:modelValue": (value: any[]) => {
        if (!value.length || expansion.value == null) return;

        const updatedAttendanceType =
          value.length < items.value[expansion.value]?.attendance_types?.length;

        if (updatedAttendanceType) return;

        attendanceType.value = { ...value.at(-1) };

        attendanceTypeDialog.value = true;
        return value;
      },
    },
    props: {
      items: attendanceTypeCollection,
      itemTitle: "data.name",
      returnObject: true,
      chips: true,
      closableChips: true,
      multiple: true,
    },
  },
  {
    label: "",
    value: "table",
    component: "VTextField",
    required: false,
    on: {},
  },
  {
    label: "Mensagem de Atendimento",
    value: "off_hours_message",
    component: "RichText",
    cols: {
      cols: "12",
    },
    required: true,
    on: {},
  },
]);

const currentQueueTotem = computed<QueueTotem>({
  get() {
    if (expansion.value == null) return { ...defaultQueueTotem };

    return items.value[expansion.value];
  },
  set(value: any) {
    if (expansion.value) items.value[expansion.value] = value;
  },
});

const totemId = computed<number>(() => {
  return parseInt(route.params.id as string);
});

const totem = ref<any>({});

const allQueueIsAdded = computed(() => {
  return queues.value.every((q: Queue) => {
    return items.value.some(
      (queueTotem: QueueTotem) => queueTotem.data?.id == q.id
    );
  });
});

function save() {
  const rawQueueTotemData = items.value.filter(
    (item) => !checkItem(item).length
  );

  const payload = rawQueueTotemData.map((item: QueueTotem) => {
    return {
      queue_id: item?.data?.id,
      off_hours_message: item.off_hours_message,
      attendance_types: item.attendance_types,
      attendance_hours: item.attendance_hours,
    };
  });
  isLoading.value = true;

  updateQueueTotem(totemId.value, { queues: payload })
    .catch((error) => {
      openAlert("Erro para atualizar Totem", error);
    })
    .finally(() => {
      isLoading.value = false;
    });
}

function editAttendanceType(item: AttendanceType) {
  attendanceType.value = { ...item };
  attendanceTypeDialog.value = true;
}

function addAttendanceType(data: AttendanceType) {
  const item: AttendanceType | undefined =
    currentQueueTotem.value.attendance_types.find(
      (type: any) =>
        type.attendance_type_id == attendanceType.value.attendance_type_id
    );

  if (!item) return;

  Object.assign(item, data);
}

function addAttendanceHour(item: AttendanceHour) {
  const attendanceHour = currentQueueTotem.value.attendance_hours.find(
    (i) => i.weekday_iso == item.weekday_iso
  );

  if (!attendanceHour)
    return currentQueueTotem.value.attendance_hours.push(item);

  Object.assign(attendanceHour, item);
}

function removeSelectedAttendanceHours() {
  currentQueueTotem.value.attendance_hours =
    currentQueueTotem.value.attendance_hours.filter((item: AttendanceHour) => {
      return !attendanceTypesSelected.value.includes(item);
    });

  attendanceTypesSelected.value = [...currentQueueTotem.value.attendance_hours];
}

function nextItem() {
  defaultQueueTotem.attendance_hours = [];

  items.value.push({ ...defaultQueueTotem });
  expansion.value = items.value.length - 1;
}

function checkItem(item: QueueTotem): string[] {
  const errors = [];
  if (!item.attendance_types.length)
    errors.push("Adicione um tipo de atendimento");

  if (!item.attendance_hours.length)
    errors.push("Adicione um horário de atendimento");

  if (!item?.form?.value) errors.push("Preencha o formulário");

  return errors;
}

function getWeekDayLabel(weekdayIso: number) {
  const daysOfWeek = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];
  return daysOfWeek[weekdayIso - 1];
}

function removeLastAttendanceType() {
  const attendanceTypes = currentQueueTotem.value.attendance_types;

  if (!attendanceTypes[attendanceTypes.length - 1]?.integration_id)
    currentQueueTotem.value.attendance_types.pop();
}

onMounted(() => {
  loadQueues();
  loadAttendanceTypes();

  loadQueueTotem();

  setBreadcrumbs([
    {
      title: "Totens",
      to: {
        name: "totem.view",
      },
    },
    {
      title: computed<string>(() => totem.value.name ?? `${totemId.value}`),
      to: {
        name: "totem.detail",
        params: { id: totemId.value },
      },
    },
    { title: "Gerenciamento de filas", to: "" },
  ]);
});

function loadQueues() {
  getQueues()
    .then((res: { data: Queue[] }) => {
      queues.value = res.data;
    })
    .catch((error) => openAlert("Erro para carregar as filas", error));
}

function loadQueueTotem() {
  findTotem(totemId.value)
    .then((res) => {
      totem.value = res.data;

      res.data.queues.forEach((queue: any) => {
        items.value.push({
          ...queue,
          form: {
            value: true,
          },
        });
      });
    })
    .catch((error) => {
      openAlert(`Erro para carregar Totem ${1}`, error);
    });
}

function loadAttendanceTypes() {
  getAttendanceTypes()
    .then((res: { data: any }) => {
      attendanceTypeCollection.value = res.data.map((item: any) => {
        return {
          data: {
            ...item,
          },
          attendance_type_id: item.id,
          integration_id: null,
        };
      });
    })
    .catch((error) => {
      openAlert("Erro para carregar tipo de atendimentos", error);
    });
}
</script>
