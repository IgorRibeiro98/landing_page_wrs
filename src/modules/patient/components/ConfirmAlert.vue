<template>
  <v-dialog v-model="dialog" persistent fullscreen class="totem">
      <div class="bg-white">
        <v-img :src="logo" max-width="194"></v-img>
      </div>

      <div class="d-flex bg-white align-center justify-center fill-height w-100">
          <div>
            <p class="font-weight-bold text-center mb-6" style="font-size: 1.4em">
                {{ title }}

                <div  v-html="textToShow"></div>
            </p>

            <div  v-if="action.type == 'choise'">
                <v-btn variant="outlined" color="primary" class="mr-4 py-2" width="350" rounded @click="action.callback(false); dialog = false">
                  {{action.rejectLabel}}
              </v-btn>
              <v-btn variant="flat"  rounded width="350" color="primary" @click="action.callback(true); dialog = false">
                  {{action.acceptLabel}}
              </v-btn>
            </div>
            
            <div v-else>
              <v-btn variant="text" color="primary" @click="dialog = false">
                {{ action.label }}
              </v-btn>
            </div>
          </div>
      </div>
  </v-dialog>
</template>

<script lang="ts" setup>
import appLogo from "@/assets/logo.png";
import { computed } from "vue";

import { AlertProps } from "@patient/types";

import useTenantStore from "@/modules/tenant/store";
const tenantStore = useTenantStore();

const logo = computed(() => {
  return tenantStore.tenant.logo || appLogo;
});

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

const textToShow = computed(() => {
  return props.text instanceof Error ? props.text.message : props.text;
});
</script>
