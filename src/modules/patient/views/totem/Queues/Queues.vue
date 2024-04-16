<template>
  <v-row justify="center">
    <v-col cols="12" class="text-center">
      <h1>O que você deseja fazer hoje?</h1>
    </v-col>

    <v-row justify="center">
      <v-col cols="10">
        <v-row justify="center">
          <v-col cols="12" md="auto" v-for="(queue, index) in totem.queues" :key="index" class="d-flex justify-center">
            <v-sheet v-ripple color="transparent" @click="checkQueue(queue)"
              style="cursor: pointer; white-space: normal" border="sm" rounded class="d-flex pa-6" link min-height="80"
              width="342" click="checkQueue(queue)">
              <div class="mr-2">
                <v-img :src="queue.data?.icon_src" width="32" height="32"> </v-img>
              </div>
              <p class="font-weight-medium">
                {{ queue.data?.name }}
              </p>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-row>
</template>
<script lang="ts" setup>
import {computed} from 'vue'

import { AlertProps, Data } from "@patient/types";

interface Emit {
  (event: "alert", options: AlertProps): void;
  (event: "next"): void;
  (event: "cancel"): void;
  (event: "alert", payload: AlertProps): void;
  (event: "update:data", value: any): void;
}

const emit = defineEmits<Emit>();
const props = defineProps<{
  totem: Totem
  data: Data
}>()

const data = computed({
  get: () => props.data,
  set: (value: Data) => emit('update:data', value)
})

function checkQueue(queue: QueueTotem) {
  const currentWeekDayIso = new Date().getDay();

  const currentAttendanceHour = queue.attendance_hours.find((attendanceType) => {
    return attendanceType.weekday_iso == currentWeekDayIso
  })

  if (currentAttendanceHour) {
    const queueOpen = dateBetween(currentAttendanceHour?.start_time, currentAttendanceHour?.end_time)

    if (!queueOpen) return emit("alert", {
      title: `Ops, infelizmente já passamos do horário de atendimento! :(`,
      text: `O horário de atendimento é das ${currentAttendanceHour.start_time} às ${currentAttendanceHour.end_time} <br/> ${queue.off_hours_message ?? ''}`,
      action: {
        type: "confirm",
        label: 'Ok, entendi',
        callback() {
          emit('cancel')
        }
      },
    });
    
    data.value.queue = queue

    emit('next')
  }
}

function dateBetween(start: string, end: string): boolean {
  const date = new Date();

  const dateStart = new Date()
  const dateEnd = new Date()

  const [hourStart, minuteStart] = start.split(':')
  const [hourEnd, minuteEnd] = end.split(':')

  dateStart.setHours(parseInt(hourStart), parseInt(minuteStart))
  dateEnd.setHours(parseInt(hourEnd), parseInt(minuteEnd))

  if (date >= dateStart && date <= dateEnd) return true;

  return false
}
</script>
