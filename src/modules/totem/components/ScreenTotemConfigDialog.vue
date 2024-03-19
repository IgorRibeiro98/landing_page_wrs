<template>
  <Dialog height="100%" v-model="dialog" title="Configurar Tela" fullscreen>
    <h2 class="mb-4">Formulário</h2>
    <div class="text-center" v-if="formBuilder.length === 0">
      Não há formulários para configuração nessa tela.
    </div>
    <div>
      <h3>Campos disponíveis</h3>
        <v-slide-group show-arrows>
          <v-slide-group-item v-for="field in actualBaseScreen?.fields">
            <v-card
              class="ma-2"
              @click="insertFieldInScreen(field)"
            >
              <v-card-title>{{ field.label }}</v-card-title>
              <v-card-text>{{ field.description }}</v-card-text>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
    </div>
    <v-divider class="my-4"/>

    <!-- <FormBuilder v-model="form" :form="formBuilder">
      <template
        #[`item:${formItem.value}`]="{ props }"
        v-for="formItem in formBuilder"
      >
        <component
          :is="components[formItem.component]"
          v-bind="props"
        ></component>
      </template>
    </FormBuilder> -->
  </Dialog>
</template>
<script lang="ts" setup>
import Dialog from "@/components/Dialog.vue";
// import FormBuilder from "@/components/FormBuilder/Form.vue";
// import components from "@/components/FormBuilder/components";
import { ReactiveProps } from "@/helpers/vue";
import { buildFormBuilderByScreenFields } from "@/modules/patient/repositories/screen.repository";
import { computed, ref, watch } from "vue";
interface Props {
  modelValue: boolean;
  screenTotem: ScreenTotem;
  screens: Screens[];
}
interface Emits {
  (e: "update:modelValue", value: boolean): void;
}

const form = ref({});
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const reactiveProp = new ReactiveProps(props, emit);

const dialog = reactiveProp.create("modelValue");

const actualBaseScreen = computed(() => {
  return props.screens.find((s) => s.id === props.screenTotem.screen_id);
});
const selectedFieldScreen = ref<ScreenTotemField>({
  editable: 1,
  field_id: 0,
  order: 0,
  required: 1,
  screen_totem_id: 0,
  data: {
    id: 0,
    label: '',
    slug: '',
    key: '',
    description: "",
    group_id: 0,
    updated_at: '',
    created_at: ''
  },
});

const formBuilder = ref<FormItem[]>([]);

function insertFieldInScreen(field: ScreenField) {
  props.screenTotem.fields.push({
    editable: 1,
    required: 1,
    field_id: field.id,
    screen_totem_id: props.screenTotem.id,
    data: field,
    order: props.screenTotem.fields.length,
  });
  const actualField = props.screenTotem.fields[props.screenTotem.fields.length - 1];
  selectedFieldScreen.value = actualField;
}
watch(
  () => props.screenTotem.data.component,
  () => {
    if (!actualBaseScreen.value) return;
    buildFormBuilderByScreenFields(
      props.screenTotem.data.component!,
      actualBaseScreen.value.fields,
      props.screenTotem.fields
    ).then((resp) => {
      formBuilder.value = resp.data;
    });
  },
  { immediate: true }
);
</script>
