<template>
  <v-dialog v-model="dialog" persistent fullscreen class="totem">
    <BaseLayout class="bg-white">
      <div class="d-flex bg-white align-center justify-center fill-height w-100">
          <div>
            <p class="text-center mb-6" style="font-size: 1.4em">
                <span class="font-weight-bold"> {{ title }} </span>

                <div v-html="textToShow"></div>
            </p>

            <div  v-if="action.type == 'choise'" class="d-flex justify-center">
              <div>
                <v-btn variant="outlined" color="primary" class="mr-2" min-width="350" rounded @click="executeCallBack(false)">
                  {{action.rejectLabel}}
              </v-btn>
              <v-btn variant="flat" min-width="350" rounded color="primary" @click="executeCallBack()">
                  {{action.acceptLabel}}
              </v-btn>
              </div>
            </div>

            <div v-else class="d-flex justify-center">
              <v-btn ariant="flat"  rounded width="350" color="primary" @click="executeCallBack()">
                {{ action.label }}
              </v-btn>
            </div>
          </div>
      </div>
    </BaseLayout>
  </v-dialog>
</template>

<script lang="ts" setup>
import appLogo from "@/assets/logo.png";
import { computed } from "vue";

import { AlertProps } from "@patient/types";

import BaseLayout from "./BaseLayout.vue";

interface Props extends AlertProps {
  modelValue: boolean
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
}>();

const dialog = computed({
  get() {
    return props.modelValue;
  },
  set(value: boolean) {
    emit("update:modelValue", value);
  },
});

function executeCallBack(accept: boolean = true) {
  dialog.value = false;

  if (props.action.type === 'choise') {
    props.action.callback(accept);
    return;
  }

  if (props.action?.callback) {
    props.action.callback();
  }
}
const textToShow = computed(() => {
  return props.text instanceof Error ? props.text.message : props.text;
});
</script>
