<template>
  <LayoutView icon="mdi-format-list-bulleted" title="Vincular Fila">
    <template #content>
      <v-row>
        <v-col cols="12" class="d-flex justify-center flex-column align-center">
          <v-expansion-panels v-model="expansion">
            <!-- <v-expansion-panel>
                            <v-expansion-panel-title>

                            </v-expansion-panel-title>

                            <v-expansion-panel-text>
                                <v-form v-model="formIsValid" @submit.prevent="addItem()">

                                    <v-row dense>
                                        <v-col cols="12">
                                            <FormBuilder :form="form" v-model="payload"
                                                @update:modelValue="payload.queue = $event">
                                                <template #item:attendance_types="{ props, on }">
                                                    <v-autocomplete v-bind="props" v-on="on"
                                                        v-model="payload.attendance_types">

                                                        <template #chip="chipProps">
                                                            <v-chip v-bind="chipProps.props" prepend-icon="mdi-connection">
                                                                {{ chipProps.item.raw.integration_id }} - {{
                                                                    chipProps.item.title }}
                                                            </v-chip>
                                                        </template>

</v-autocomplete>
</template>
</FormBuilder>
</v-col>

<v-col cols="12" class="d-flex flex-column align-center">
    <v-data-table :items="payload.attendance_hours" :headers="attendanceHourHeaders" show-select
        :item-value="item => item" v-model="attendanceTypesSelected" no-data-text="Adicione um novo horário">
        <template #top>
                                                    <v-toolbar>
                                                        <div class="d-flex justify-space-between mx-1 w-100 align-center">
                                                            <div>
                                                                <v-expand-x-transition>
                                                                    <v-btn icon="mdi-delete" variant="text" color="primary"
                                                                        v-if="payload.attendance_hours.length && attendanceTypesSelected.length"
                                                                        @click="removeSelectedAttendanceTypes">
                                                                    </v-btn>
                                                                </v-expand-x-transition>

                                                            </div>

                                                            <v-btn variant="tonal" color="primary"
                                                                @click="attendanceHourDialog = true">
                                                                Novo Horário
                                                            </v-btn>
                                                        </div>
                                                    </v-toolbar>
                                                </template>

        <template #item.weekday_iso="{ item }">
                                                    {{ getWeekDayLabel(item.weekday_iso) }}
                                                </template>

        <template #item.actions="{ item }">
                                                    <v-menu>
                                                        <template #activator="{ props }">
                                                            <v-btn icon="mdi-dots-horizontal" v-bind="props" variant="text"
                                                                size="small">
                                                            </v-btn>
                                                        </template>

        <v-list>
            <v-list-item link @click="option.action(item)" v-for="option in options">
                <v-list-item-title>
                    {{ option.title }}
                </v-list-item-title>
            </v-list-item>
        </v-list>
        </v-menu>
        </template>

        <template #bottom>
                                                </template>
    </v-data-table>
</v-col>

<v-col cols="12" class="d-flex justify-end">
    <v-btn color="primary" variant="tonal" type="submit">
        Adicionar
    </v-btn>
</v-col>
</v-row>
</v-form>
</v-expansion-panel-text>
</v-expansion-panel> -->

            <v-expansion-panel v-for="(data, i) in items">
              <v-expansion-panel-title>
                {{ i == 0 ? "" : data.queue.name }}
              </v-expansion-panel-title>

              <v-expansion-panel-text>
                <v-form v-model="items[i].form.valid">
                  <v-row dense>
                    <v-col cols="12">
                      <FormBuilder
                        :form="form"
                        v-model="items[i]"
                        @update:modelValue="data.queue = $event"
                      >
                        <template #item:attendance_types="{ props, on }">
                          <v-autocomplete
                            v-bind="props"
                            v-on="on"
                            v-model="items[i].attendance_types"
                          >
                            <template #chip="chipProps">
                              <v-chip
                                v-bind="chipProps.props"
                                prepend-icon="mdi-connection"
                              >
                                {{ chipProps.item.raw.integration_id }} -
                                {{ chipProps.item.title }}
                              </v-chip>
                            </template>
                          </v-autocomplete>
                        </template>
                      </FormBuilder>
                    </v-col>

                    <v-col cols="12" class="d-flex flex-column align-center">
                      <v-data-table
                        :items="data.attendance_hours"
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
                                    @click="removeSelectedAttendanceTypes"
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
                    </v-col>
                  </v-row>
                </v-form>
              </v-expansion-panel-text>

              <!-- <v-expansion-panel-title>
                                <div class=" d-flex justify-space-between align-center w-100">
                                    {{ data.queue.name }}

                                    <div class="mr-2">
                                        <v-chip class="mr-2" color="primary" prepend-icon="mdi-connection">
                                            {{ data.attendance_types.length }}
                                        </v-chip>

                                        <v-chip color="primary" prepend-icon="mdi-clock-time-eight">
                                            {{ data.attendance_hours.length }}
                                        </v-chip>
                                    </div>
                                </div>

                            </v-expansion-panel-title>

                            <v-expansion-panel-text>
                                <v-row dense>
                                    <v-col cols="6" class="d-flex flex-column align-center"
                                        style="border-right: 1px solid #ededed;">
                                        <v-btn variant="tonal" color="primary" @click="attendanceTypeDialog = true">
                                            Adicionar tipo de atendimento
                                        </v-btn>

                                        <v-chip-group>
                                            <v-chip v-for="(type, index) of data.attendance_types" :key="index" closable
                                                @click:close="data.attendance_types.splice(index, 1)">
                                                {{ type.data?.name }} / {{ type.integration_id }}
                                            </v-chip>
                                        </v-chip-group>

                                    </v-col>
                                    <v-col cols="6" class="d-flex flex-column align-center">
                                        <v-btn variant="tonal" color="primary" @click="attendanceHourDialog = true">
                                            Adicionar horário de atendimento
                                        </v-btn>

                                        <div class="w-100">
                                            <v-btn class="mt-2" v-if="data.attendance_hours.length" color="primary"
                                                @click="data.attendance_hours = []">
                                                Limpar todos
                                            </v-btn>
                                        </div>

                                        <v-chip-group column>
                                            <v-chip v-for="(data, index) in data.attendance_hours" :key="data.weekday_iso"
                                                closable @click:close="data.attendance_hours.splice(index, 1)">
                                                {{ data.weekday_iso }} {{ data.start_time }} - {{ data.end_time }}
                                            </v-chip>

                                        </v-chip-group>
                                    </v-col>

                                    <v-col cols="12" class="d-flex justify-end">
                                        <v-btn color="primary" variant="tonal" @click="">
                                            Adicionar
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-expansion-panel-text> -->
            </v-expansion-panel>
          </v-expansion-panels>

          <div class="mt-4">
            <v-btn class="mx-auto" color="secondary" @click="nextItem">
              Nova Configuração
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </template>
  </LayoutView>

  <TotemAttendanceTypeDialog
    v-model:attendanceTypes="items[expansion].attendance_types"
    v-model="attendanceTypeDialog"
    @update="saveAttendanceTypeForm($event)"
  />

  <TotemAttendanceHourDialog
    v-model:attendanceHours="items[expansion].attendance_hours"
    v-model="attendanceHourDialog"
    @update="items[expansion].attendance_hours.push($event)"
  />
</template>

<script lang="ts" setup>
import FormBuilder from "@/components/FormBuilder.vue";
import LayoutView from "@/components/LayoutView.vue";
import { getQueues } from "@/modules/queue/repositories/queue.repository";
import { getAttendanceTypes } from "@/modules/totem/repositories/attendance-type.repository";
import useAlertStore from "@/stores/alert";
import { computed, onMounted, ref } from "vue";
import TotemAttendanceHourDialog from "../components/TotemAttendanceHourDialog.vue";
import TotemAttendanceTypeDialog from "../components/TotemAttendanceTypeDialog.vue";

const { openAlert } = useAlertStore();

const expansion = ref(0);

const queues = ref<Queue[]>([]);

interface QueueTotem {
  attendance_types: AttendanceType[];
  attendance_hours: AttendanceHours[];
  queue?: Queue;
  form: {
    valid: boolean;
  };
}

const items = ref<QueueTotem[]>([
  //   {
  //     attendance_types: [],
  //     attendance_hours: [],
  //     form: {
  //       valid: false,
  //     },
  //   },
  {
    attendance_types: [
      { name: "Comum", attendance_type_id: 1, integration_id: "99" },
    ],
    attendance_hours: [
      { start_time: "09:00", end_time: "10:00", weekday_iso: 0 },
    ],
    form: { valid: true },
    queue: {
      id: 1,
      name: "Exames",
      icon_src: "http://localhost:8005/storage/queue_icon/Exames.svg",
      description: "Fila de atendimento para pessoas que possui exame pendente",
      status: null,
      created_at: "2024-02-27T21:43:24.000000Z",
      updated_at: "2024-02-29T22:30:50.000000Z",
    },
  },
]);

const formIsValid = ref(false);

const attendanceHourHeaders = ref([
  {
    title: "Dia de semana",
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

const attendanceTypesSelected = ref([]);

const options = [
  {
    title: "Editar",
    action: (item: any) => {
      console.log(item);
    },
  },
  {
    title: "Remover",
    action: (item: any) => {
      payload.value.attendance_hours.splice(
        payload.value.attendance_hours.indexOf(item),
        1
      );
    },
  },
];

const currentQueueTotem = computed({
  get() {
    return items.value[expansion.value];
  },
  set(value: any) {
    items.value[expansion.value] = value;
  },
});

const payload = ref<{
  attendance_types: AttendanceType[];
  attendance_hours: any[];
}>({
  attendance_types: [],
  attendance_hours: [],
});

// const attendanceType = ref({})
const attendanceTypeDialog = ref(false);

const attendanceHour = ref({});
const attendanceHourDialog = ref(false);

const attendanceTypeCollection = ref([]);

// const attendanceTypeComputed = computed(() => {
//     return attendanceTypeCollection.value.map((collection: any) => {
//         const condition = payload.value.attendance_types.some((q: any): boolean => q.name == collection.name) ?? false

//         return {
//             ...collection,
//             props: {
//                 disabled: condition,
//             }
//         }
//     })
// })

const selectedAttendanceType = ref();

const form = ref<FormItem[]>([
  {
    label: "Fila",
    value: "queue",
    component: "VAutocomplete",
    cols: {
      cols: "12",
    },
    on: {},
    props: {
      items: computed(() => {
        return queues.value;

        // return queues.value.map((item => {
        //     return {
        //         ...item,
        //         props: {
        //             disabled: items.value[ex].some((i: any) => {
        //                 return i.queue.id === item.id
        //             })
        //         }
        //     }
        // }))
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
        if (
          value.length < items.value[expansion.value]?.attendance_types?.length
        )
          return;

        selectedAttendanceType.value = { ...value.at(-1) };

        attendanceTypeDialog.value = true;
        return value;
      },
    },
    props: {
      items: attendanceTypeCollection,
      itemTitle: "name",
      returnObject: true,
      chips: true,
      closableChips: true,
      multiple: true,
    },
  },
]);

function saveAttendanceTypeForm(data: any) {
  const item = items.value[expansion.value].attendance_types.find(
    (type: any) => type.name == selectedAttendanceType.value.name
  );

  Object.assign(item, data);
}

function nextItem() {
  const errors = [];

  if (!currentQueueTotem.value.attendance_types.length)
    errors.push("Adicione um tipo de atendimento");

  if (!currentQueueTotem.value.attendance_hours.length)
    errors.push("Adicione um horário de atendimento");

  if (errors.length) {
    openAlert("Não foi possível vincular fila", errors.join("<br>"));
    return;
  }

  if (!currentQueueTotem.value.form.valid) return;

  items.value.unshift({
    attendance_types: [],
    attendance_hours: [],
    form: {
      valid: false,
    },
  });
}

function addItem() {
  const errors = [];

  if (!payload.value.attendance_types.length)
    errors.push("Adicione um tipo de atendimento");

  if (!payload.value.attendance_hours.length)
    errors.push("Adicione um horário de atendimento");

  if (errors.length) {
    openAlert("Não foi possível vincular fila", errors.join("<br>"));
    return;
  }

  if (!formIsValid.value) return;

  items.value.push(payload.value);

  payload.value = {
    attendance_hours: [],
    attendance_types: [],
    queue: null,
  };
}

function removeSelectedAttendanceTypes() {
  payload.value.attendance_hours = payload.value.attendance_hours.filter(
    (item: any) => {
      return !attendanceTypesSelected.value.includes(item);
    }
  );

  attendanceTypesSelected.value = [...payload.value.attendance_hours];
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
  return daysOfWeek[weekdayIso];
}

function loadQueues() {
  getQueues().then((res: { data: Queue[] }) => {
    queues.value = res.data;
  });
}

onMounted(() => {
  loadQueues();
  loadAttendanceTypes();
});

function loadAttendanceTypes() {
  getAttendanceTypes()
    .then((res: { data: any }) => {
      attendanceTypeCollection.value = res.data.map((item) => {
        return {
          name: item.name,
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
