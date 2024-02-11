<template>
  <div class="d-flex align-center justify-center fill-height">
    <v-row justify="center" no-gutters>
      <v-col cols="12" class="">
        <h1 :class="title" class="text-center">
          Selecione uma das opções abaixo:
        </h1>
      </v-col>

      <v-col
        cols="12"
        md="6"
        lg="3"
        v-for="(queue, index) in totem.queues"
        :key="index"
        class="pa-2"
      >
        <v-card variant="tonal" color="primary" height="100%" class="cursor-pointer" @click="pushQueue(queue)">
          <v-card-title class="d-flex justify-center">
            <v-icon :icon="queue.icon" size="60" />
          </v-card-title>
          <v-card-text>
            <h2 class="font-weight-bold text-center mb-5">{{ queue.name }}</h2>
            <p class="text-center">{{ queue.description }}</p>
          </v-card-text>
        </v-card>
        <!-- <v-card variant="tonal" rounded color="primary" height="100%" min-height="100" class="pa-3 cursor-pointer">
          <div class="d-flex">
            <v-icon :icon="queue.icon" size="60" class="mr-5"/>
            <div>
              <p class="font-weight-bold responsive-fonts">{{ queue.name }}</p>
              <p class="responsive-fonts">{{ queue.description }}</p>
            </div>
          </div>
        </v-card> -->
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import useResponsive from "@patient/helpers/responsives";

const { title } = useResponsive();

interface Props {
  modelValue: Data;
  totem: Totem;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue", "next", "to", "start"]);

const data: any = computed({
  get() {
    return props.modelValue;
  },
  set() {
    emit("update:modelValue", data);
  },
});

function pushQueue(queue: Queue) {
  data.value.queue = queue;
  emit("next", null);
}
</script>
