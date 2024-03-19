<template>
  <Dialog
    :loading="loading"
    v-model="dialog"
    width="400"
    :form="formDialog"
    ref="dialogForm"
    @close="emit('close')"
  ></Dialog>
</template>

<script lang="ts" setup>
import Dialog from "@/components/Dialog.vue";

import { computed, ref } from "vue";

const props = defineProps<{
  attendanceHours: AttendanceHour[];
  modelValue: boolean;
  attendanceHour: AttendanceHour | { weekday_iso: number | null };
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
  (event: "update", value: AttendanceHour): void;
  (event: "update:attendanceHour", value: AttendanceHour): void;
  (event: "close"): void;
}>();

interface WeekDayItem {
  start_time: string;
  end_time: string;
  weekday_iso: number | null;
}

const attendanceHour = computed({
  get() {
    return props.attendanceHour;
  },
  set(value: any) {
    emit("update:attendanceHour", value);
  },
});

const dialog = computed({
  get() {
    return props.modelValue;
  },
  set(value: boolean) {
    emit("update:modelValue", value);
  },
});

const loading = ref(false);

interface WeekDayIso {
  name: string;
  weekday_iso: number | number[];
  props: any;
}

const weekDaysIso = computed(() => {
  const daysOfWeek: WeekDayIso[] = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ].map((weekDay, index) => {
    const weekDayIso = index + 1;

    return {
      name: weekDay,
      weekday_iso: weekDayIso,
      props: {
        disabled: props.attendanceHours.some((item: WeekDayItem) => {
          return item.weekday_iso === weekDayIso;
        }),
      },
    };
  });

  const daysOfWork = [1, 2, 3, 4, 5];

  daysOfWeek.unshift({
    name: "Dias úteis",
    weekday_iso: daysOfWork,
    props: {
      disabled: props.attendanceHours.some((item: WeekDayItem) => {
        return daysOfWork.includes(item.weekday_iso!);
      }),
    },
  });

  return daysOfWeek;
});

const dialogForm = ref();

const formDialog = ref<FormDialog>({
  title: "Horário Atendimento",
  form: {
    value: attendanceHour,
    inputs: [
      {
        component: "VAutocomplete",
        value: "weekday_iso",
        label: "Dia da semana",
        on: {},
        props: {
          items: weekDaysIso,
          itemTitle: "name",
          itemValue: "weekday_iso",
        },
      },
      {
        component: "VTextField",
        label: "Hora Início",
        value: "start_time",
        required: true,
        on: {},
        cols: {
          cols: "6",
        },
        props: {
          type: "time",
          class: "mr-2",
        },
      },
      {
        component: "VTextField",
        label: "Hora Fim",
        value: "end_time",
        required: true,
        on: {},
        cols: {
          cols: "6",
        },
        props: {
          type: "time",
        },
      },
    ],
  },
  submit: () => {
    const { start_time, end_time } = attendanceHour.value;

    if (Array.isArray(attendanceHour.value.weekday_iso)) {
      attendanceHour.value.weekday_iso.forEach((weekday_iso: number) => {
        emit("update", { start_time, end_time, weekday_iso });
      });
    } else {
      emit("update", {
        start_time,
        end_time,
        weekday_iso: attendanceHour.value.weekday_iso,
      });
    }

    dialogForm.value.reset();

    dialog.value = false;
  },
});
</script>
