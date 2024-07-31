<template>
  <div>
    <h1
      class="text-center mb-4"
      v-html="currentCase.title.value ?? currentCase.title"
    ></h1>
    <!-- {{$vuetify.display.name}} -->
    <v-sheet color="#dfdfdf" rounded v-if="hasOtherSchedules">
      <v-row>
        <v-col cols="12" md="6">
          <p>
            Paciente: <b>{{ data.patient?.first_name }}</b>
          </p>
        </v-col>
        <v-col cols="12" md="6">
          CPF: <b>{{ maskIdentifier }}</b></v-col
        >
      </v-row>
    </v-sheet>
    <div class="text-center mt-4" v-if="loadingSchedules">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div style="max-height: 38vh; overflow-y: auto">
      <div class="d-flex flex-column ga-4">
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
              v-for="mapping in scheduleMapping[schedule.type]"
            >
              <p class="mb-2 text-gray">{{ mapping.header }}</p>
              <v-icon v-if="mapping.icon">{{ mapping.icon }}</v-icon>
              <p
                v-else
                v-html="mapping.value(schedule)"
                :class="{ 'font-weight-bold': mapping.bold ?? true }"
              ></p>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </div>
    <h4 class="text-center mt-8" v-show="hasDelayedSchedule">
      Nossa tolerância é de {{ delayInMinutes }} minutos, devido ao atraso vamos
      te encaminhar para a recepção.
    </h4>
    <v-row justify="center" class="mt-4">
      <v-col cols="auto" v-for="button in currentCase.buttons">
        <v-btn
          class="px-8 py-2"
          :loading="button.loading?.value"
          rounded
          :color="button.color ?? 'primary'"
          @click="button.action"
        >
          {{ button.text }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts" setup>
import {
  getSchedules,
  processPatientSchedule,
} from "@/modules/patient/repositories/patient.repository";
import {
  AlertProps,
  AppointmentSchedule,
  Data,
  ExamsSchedule,
} from "@patient/types";
import { ComputedRef, computed, onMounted, ref } from "vue";
import { useDate } from "vuetify";

interface Emit {
  (event: "alert", options: AlertProps): void;
  (event: "next"): void;
  (event: "to", value: string): void;
  (event: "cancel"): void;
}

interface Props {
  data: Data;
}

interface HydratedSchedule {
  date: Date;
  time: string;
  formattedDateStr: string;
  isDelayed: boolean;
  isToday: boolean;
  raw: AppointmentSchedule | ExamsSchedule;
  type: "appointment" | "exam";
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
const loadingSchedules = ref(false);
const schedules = ref<HydratedSchedule[]>([]);
const date = useDate();
const today = new Date();
today.setHours(0, 0, 0, 0);
const todayStr = today.toLocaleDateString("pt-BR");

const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const tomorrowStr = tomorrow.toLocaleDateString("pt-BR");

const scheduleMapping = ref(<
  {
    exam: Mapping[];
    appointment: Mapping[];
  }
>{
  exam: [
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
      header: "Exame",
      value: (schedule: HydratedSchedule) => schedule.raw.proc_description,
      cols: {
        md: 6,
      }
    },
  ],
  appointment: [
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
      value: (schedule: HydratedSchedule) => schedule.raw.doctor_name,
    },
    /**
     * @todo padronizar o nome da especialidade do doutor.
     */
    {
      header: "Especialidade",
      value: (schedule: HydratedSchedule) => schedule.raw.specialty_description,
    },
  ],
});

const currentCase = computed<any>(() => {
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
  if (!props.data.internal.identifier) return "";
  const identifier = props.data.internal.identifier;
  return identifier
    .substring(0, 4)
    .padEnd(identifier.length, "X")
    .replace(/(\w{3})(\w{3})(\w{3})(\w{2})/, "$1.$2.$3-$4");
});

function isDelayed(schedule: HydratedSchedule) {
  if (schedule.isToday === false) return false;
  const now = new Date();
  const scheduleTimeWithDelay =
    schedule.date.getTime() + delayInMinutes * 60 * 1000;

  return now.getTime() > scheduleTimeWithDelay;
}

function getWeekPrefix(schedule: HydratedSchedule) {
  const date = schedule.date;
  const week = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  return week[date.getDay()];
}

function processSchedules() {
  loading.value = true;

  if (hasDelayedSchedule.value) return emit("to", "Queues");

  processPatientSchedule()
    .then(() => {
      emit("next");
    })
    .catch((error) => {
      emit("alert", {
        title: "Ops, algo deu errado!",
        text: "Falha ao processar seus agendamentos, te encaminharemos para a recepção.",
        action: {
          type: "confirm",
          label: "Ok",
          callback() {
            emit("to", "Queues");
          },
        },
      });
    })
    .finally(() => {
      loading.value = false;
    });
}
onMounted(() => {
  if (props.data.patient!.current_schedules_count.appointments === 0 || props.data.patient!.current_schedules_count.exams === 0) {
    return emit("to", "Queues");
    // showEmptySchedulesAlert();
    return;
  }
  loadSchedules();
});

function loadSchedules() {
  loadingSchedules.value = true;
  const now = new Date();
  const initialDate = date.format(now, "keyboardDate");
  const finalDate = date.format(now, "keyboardDate");

  getSchedules(props.data.patient!.id, initialDate, finalDate)
    .then((resp) => {
      const { exams, appointments } = resp.data;
      schedules.value = hydratateSchedules(appointments, exams);
    })
    .catch((err) => {
      openAlert(err);
    })
    .finally(() => {
      loadingSchedules.value = false;
    });
}

function hydratateSchedules(
  appointments: AppointmentSchedule[],
  exams: ExamsSchedule[]
): HydratedSchedule[] {
  const hydratateAppointments = appointments.map((appointment) => {
    const date = new Date(appointment.schedule_date);
    const dateStr = date.toLocaleDateString("pt-BR");

    const data: HydratedSchedule = {
      date: date,
      time: date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      formattedDateStr: dateStr,
      isToday: dateStr === todayStr,
      isDelayed: false,
      raw: appointment,
      type: "appointment",
    };
    data.isDelayed = isDelayed(data);
    return data;
  });

  const hydratateExams = exams.map((exam) => {
    const date = new Date(exam.schedule_date);
    const dateStr = date.toLocaleDateString("pt-BR");

    const data: HydratedSchedule = {
      date: date,
      time: date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      formattedDateStr: dateStr,
      isToday: dateStr === todayStr,
      isDelayed: false,
      raw: exam,
      type: "exam",
    };
    data.isDelayed = isDelayed(data);
    return data;
  });

  return [...hydratateAppointments, ...hydratateExams].sort((a, b) =>
    a.date.getTime() > b.date.getTime() ? 1 : -1
  );
}

function showEmptySchedulesAlert() {
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

function openAlert(text: string | Error) {
  emit("alert", {
    title: `Ops, ${text}! :(`,
    text: "Não se preocupe! Vamos te encaminhar para a recepção",
    action: {
      type: "choise",
      rejectLabel: "Tentar novamente",
      acceptLabel: "Ok, entendi",
      callback(accept: boolean) {
        if (accept) {
          emit("to", "Queues");
        }
      },
    },
  });
}
</script>
