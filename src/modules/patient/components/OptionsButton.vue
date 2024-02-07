<template>
  <v-row justify="space-around">
    <template v-for="option in filteredOptions">
      <v-col :md="md" cols="12" class="d-flex align-center">
        <v-btn
          height="8em"
          block
          rounded="0"
          variant="tonal"
          :color="option.color"
          @click="emit('click', option)"
        >
          <div>
            <h2 class="text-h4 font-weight-bold">
              {{ option.title }}
            </h2>
            <p class="text-body-1 text-secondary-1">
              {{ option.subtitle }}
            </p>
          </div>
        </v-btn>
      </v-col>
    </template>
  </v-row>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps<{
  options: ButtonOption[];
}>();

const filteredOptions = computed(() => props.options.filter(opt => opt.show));

const md = computed(() => Math.floor(12 / filteredOptions.value.length));

const emit = defineEmits<{
  (e: "click", option: ButtonOption): void;
}>();

</script>
<style lang="scss" scoped>

</style>
