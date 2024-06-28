<template>
  <v-card width="100%" height="100%">
    <v-card-title
      class="bg-secondary d-flex align-end justify-start pb-0 text-wrap overflow-visible"
      style="min-height: 60px"
    >
      <v-sheet
        min-height="60"
        min-width="60"
        class="pa-2 border-md border-primary rounded mb-n4 mr-4 d-flex align-center justify-center"
      >
        <v-img :src="queue.data!.icon_src" />
      </v-sheet>
      <div style="line-height: 1.5rem" class="text-wrap">
        <p>
          {{ queue.data!.name }}
        </p>

        <small class="text-body-2">
          {{ queue.data!.description }}
        </small>
      </div>
    </v-card-title>

    <v-card-text class="pt-0 pb-4">
      <v-chip-group show-arrows>
        <v-chip v-for="(type, index) of queue.attendance_types" :key="index">
          {{ type.data!.name }}
        </v-chip>
      </v-chip-group>

      <span v-if="messages" >
        {{ messages }}
      </span>

      <div v-else>
        <span class="font-weight-bold"> Horários de atendimento </span>
        <v-chip-group show-arrows>
          <v-chip v-for="(hour, index) of queue.attendance_hours" :key="index">
            {{ getDayOfWeek(hour.weekday_iso) }} {{ hour.start_time }} -
            {{ hour.end_time }}
          </v-chip>
        </v-chip-group>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  queue: QueueTotem;
}>();

const messages = computed(() => {
  const [firstAttendanceHour, ...attendanceHours] =
    props.queue.attendance_hours;

  const lastAttendanceHour = attendanceHours.at(-1)!;

  const allSameHour = props.queue.attendance_hours.every(
    (hour: AttendanceHour, i) => {
      if (i === 0) return true;
      return (
        hour.start_time === firstAttendanceHour.start_time &&
        hour.end_time === firstAttendanceHour.end_time &&
        hour.weekday_iso - 1 === i
      );
    }
  );

  if (allSameHour && lastAttendanceHour)
    return `Horario de atendimento de ${getDayOfWeek(
      firstAttendanceHour.weekday_iso
    )} a ${getDayOfWeek(lastAttendanceHour.weekday_iso)} das ${
      firstAttendanceHour.start_time
    } às ${firstAttendanceHour.end_time}`;

  return false;
});

function getDayOfWeek(weekdayIso: number) {
  if (!weekdayIso) return;

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
</script>
