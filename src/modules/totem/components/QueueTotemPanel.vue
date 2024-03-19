<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      <v-tooltip :disabled="!errors.length ? true : false">
        <template #activator="{ props }">
          <v-icon
            :icon="icon.icon"
            :color="icon.color"
            v-bind="props"
            class="mr-2"
          ></v-icon>
        </template>

        <p v-html="errors.join('<br/>')"></p>
      </v-tooltip>
      {{ title }}
    </v-expansion-panel-title>

    <v-expansion-panel-text>
      <v-form v-model="data.form.value">
        <FormBuilder :form="form" v-model="data">
          <template
            v-for="(item, index) in form"
            :key="index"
            #[`item:${item.value}`]="{ props, on }"
          >
            <slot :props="props" :on="on" :name="`item:${item.value}`"> </slot>
          </template>
        </FormBuilder>
      </v-form>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import FormBuilder from "@/components/FormBuilder/Form.vue";

const props = defineProps<{
  modelValue: QueueTotem;
  form: FormItem[];
}>();

const emit = defineEmits(["update:modelValue"]);

const title = computed(() => data.value.data?.name ?? "Nova Fila");

const icon = computed(() => {
  if (!errors.value.length)
    return {
      icon: "mdi-check",
      color: "success",
    };

  return {
    icon: "mdi-alert-circle",
    color: "warning",
  };
});

const data = computed<QueueTotem>({
  get: () => props.modelValue,
  set: (value: QueueTotem) => {
    emit("update:modelValue", value);
  },
});

const errors = computed(() => {
  const errorBag = [];

  if (!data.value.attendance_types.length)
    errorBag.push("Adicione um tipo de atendimento");

  if (!data.value.attendance_hours.length)
    errorBag.push("Adicione um horário de atendimento");

  if (!data.value.data) errorBag.push("Selecione uma fila");

  return errorBag;
});
</script>
