<template>
  <v-row justify="space-around">
    <template v-for="option in filteredOptions">
      <v-col :md="md" cols="12" class="d-flex align-center">
        <v-btn class="pa-2" height="100%" block rounded="0" variant="tonal" :color="option.color" :disabled="loading"
          @click="emit('click', option)">
          <div>
            <h2 class="font-weight-bold">
              {{ option.title }}
            </h2>
            <p v-if="option.subtitle" class="font-weight-regular">
              {{ option.subtitle }}
            </p>
            <v-icon v-if="option.icons" v-for="(icon, index) in option.icons" :key="index" :icon="icon" size="45" class="mx-2"
                  color="secondary">
            </v-icon>
          </div>
        </v-btn>
      </v-col>
    </template>
  </v-row>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, computed } from "vue";

import useResponsive from "../helpers/responsives";

const { title, subtitle } = useResponsive();

const props = defineProps<{
  options: ButtonOption[];
  loading?: boolean
}>();

const filteredOptions = computed(() => props.options.filter(opt => opt.show));

const md = computed(() => Math.floor(12 / filteredOptions.value.length));

const emit = defineEmits<{
  (e: "click", option: ButtonOption): void;
}>();

</script>
<style lang="scss" scoped></style>
