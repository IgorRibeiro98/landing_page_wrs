<template>
  <div>
    <h1 class="text-center mb-8">
      <p v-html="currentCase.title.value ?? currentCase.title"></p>
    </h1>
    <v-sheet color="#dfdfdf" rounded v-if="hasOtherSchedules">
      <v-row class="pa-2">
        <v-col cols="12" md="6">
          <p>
            Paciente: <b>{{ data.patient?.first_name }}</b>
          </p>
        </v-col>
        <v-col cols="12" md="6"> CPF: <b>{{ maskIdentifier }}</b></v-col>
      </v-row>
    </v-sheet>
    <div style="max-height: 40vh; overflow-y: auto">
      <div class=" d-flex flex-column ga-4">
        <v-card
          class="px-8 py-4"
          rounded="lg"
          variant="outlined"
          :disabled="schedule.isDelayed"

          v-for="schedule in schedules"
        >
          <v-row no-gutters>
            <v-col
              cols="12"
              md="3"
              v-bind="{ ...(mapping.cols ?? {}), ...(mapping.props ?? {}) }"
              v-for="mapping in scheduleMapping"
            >
              <p class="mb-2 text-gray">{{ mapping.header }}</p>
              <p
                v-html="mapping.value(schedule)"
                :class="{ 'font-weight-bold': mapping.bold ?? true }"
              ></p>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </div>
    <h4 class="text-center mt-8" v-show="hasDelayedSchedule">
      Nossa tolerância é de {{ delayInMinutes }} minutos, devido ao atraso vamos te encaminhar para a recepção.
    </h4>
    <v-row justify="center" class="mt-8">
      <v-col cols="auto" v-for="button in currentCase.buttons">
        <v-btn class="px-8 py-2" :loading="button.loading?.value" rounded :color="button.color ?? 'primary'" @click="button.action">
          {{ button.text }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts" setup>
import { processPatientSchedule } from '@/modules/patient/repositories/patient.repository';
import { AlertProps, Data, Schedule } from "@patient/types";
import { ComputedRef, computed, onMounted, ref } from "vue";

interface Emit {
  (event: "alert", options: AlertProps): void;
  (event: "next"): void;
  (event: "to", value: string): void;
  (event: "cancel"): void;
}

interface Props {
  data: Data
}

interface HydratedSchedule extends Omit<Schedule, "date"> {
  date: Date;
  time: string;
  formattedDateStr: string;
  isDelayed: boolean;
  isToday: boolean;
}

interface Mapping {
  header: string;
  value: (schedule: HydratedSchedule) => any;
  cols?: {
    cols: number;
    md: number;
  };
  bold?: boolean;
  props?: Record<string, any>;
}


interface Case {
  title: string | ComputedRef<string>;
  buttons: any[];
  type: string;
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();
// alterar aqui quando for definido o tempo de tolerância
const delayInMinutes = 15;
const loading = ref(false);
const schedules = computed<HydratedSchedule[]>(() => {
  if(!props.data.patient) return [];
  return props.data.patient.schedules.map((schedule) => {
    const date = new Date(`${schedule.date}`);
    const dateStr = date.toLocaleDateString("pt-BR");
    const data = {
      ...schedule,
      date,
      time: date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      formattedDateStr: dateStr,
      isToday: dateStr === todayStr,
      isDelayed: false,
    };

    data.isDelayed = isDelayed(data);
    return data;
  });
});


const today = new Date();
today.setHours(0, 0, 0, 0);
const todayStr = today.toLocaleDateString("pt-BR");

const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const tomorrowStr = tomorrow.toLocaleDateString("pt-BR");

const scheduleMapping = ref<Mapping[]>([
  {
    header: "Data",
    bold: false,
    value: (schedule: HydratedSchedule) => {
      const msg = `<b>${schedule.formattedDateStr}</b>`;
      switch (schedule.formattedDateStr) {
        case todayStr:
          return `Hoje - ${msg}`;
        case tomorrowStr:
          return `Amanhã - ${msg}`;
        default:
          return `${getWeekPrefix(schedule)} - ${msg}`;
      }
    },
  },
  {
    header: "Horário",
    value: (schedule: HydratedSchedule) => schedule.time,
  },
  {
    header: "Médico(a)",
    value: (schedule: HydratedSchedule) => schedule.doctor.name,
  },
  {
    header: "Especialidade",
    value: (schedule: HydratedSchedule) => schedule.specialty.name,
  },
]);

const currentCase = computed(() => {
  let caseType = "noSchedules";
  if (hasDelayedSchedule.value) caseType = "delaySchedules";
  else if (hasTodaySchedule.value) caseType = "hasSchedules";
  else if (hasOtherSchedules.value) caseType = "otherSchedules";

  return cases.find((c) => c.type === caseType) as Case;
});

const cases: Case[] = [
  {
    title: "Ops, você está atrasado(a)!",
    buttons: [
      {
        text: "Ok, entendi",
        loading,
        action: processSchedules,
      },
    ],
    type: "delaySchedules",
  },
  {
    title: computed(() => {
      if (schedules.value.length === 1)
        return "Aqui está sua consulta agendada";
      return "Suas consultas agendadas!";
    }),
    buttons: [
      {
        text: "Ok, continuar",
        loading,
        action: processSchedules,
      },
    ],
    type: "hasSchedules",
  },
  {
    title:
      "Ops! Você não possui consulta agendada para hoje :( <br> Aqui estão os seus próximos agendamentos!",
    buttons: [
      {
        text: "Outros serviços",
        color: "primary",
        action: () => emit("to", "Queues"),
      },
    ],
    type: "otherSchedules",
  },
  {
    title: "",
    buttons: [],
    type: "noSchedules",
  },
];
const hasDelayedSchedule = computed(() => {
  return schedules.value.some((schedule) => schedule.isDelayed);
});

const hasTodaySchedule = computed(() => {
  return schedules.value.some((schedule) => schedule.isToday);
});

const hasOtherSchedules = computed(() => {
  return !hasTodaySchedule.value && schedules.value.length > 0;
});

const maskIdentifier = computed(() => {
  if(!props.data.internal.identifier) return "";
  const identifier = props.data.internal.identifier
  return identifier.substring(0, 4).padEnd(identifier.length, "X").replace(/(\w{3})(\w{3})(\w{3})(\w{2})/, "$1.$2.$3-$4");
})

function isDelayed(schedule: HydratedSchedule) {
  if(schedule.isToday === false) return false;
  const now = new Date();
  const difference = Math.abs(schedule.date.getTime() - now.getTime());
  const tolerance = delayInMinutes * 60 * 1000;
  const isDelayed = difference >= tolerance;
  return isDelayed;
}

function getWeekPrefix(schedule: HydratedSchedule) {
  const date = schedule.date;
  const week = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  return week[date.getDay()]
};

function processSchedules() {
  loading.value = true;
  processPatientSchedule()
    .then(() => {
      emit("next");
    })
    .catch((error) => {
      emit("alert", {
        title: "Ops, algo deu errado!",
        text: 'Falha ao processar seus agendamentos, te encaminharemos para a recepção.',
        action: {
          type: "confirm",
          label: "Ok",
          callback() {
            emit("to", "Queues");
          }
        },
      });
    })
    .finally(() => {
      loading.value = false;
    })
}
onMounted(() => {
  if (schedules.value.length === 0) {
    emit("alert", {
      title: "Ops, você não possui consulta agendada hoje :(",
      text: `Deseja realizar outro tipo de serviço?`,
      action: {
        type: "choise",
        rejectLabel: "Finalizar",
        acceptLabel: "Ver outros serviços",
        callback(accept: boolean) {
          if (accept) return emit("to", "Queues");
          emit("cancel");
        },
      },
    });
  }
});
</script>
