<template>
  <Dialog
    cancel-reset
    @submit="save"
    width="600"
    :title="`Configurar campo`"
    v-model="dialog"
  >
    <v-row>
      <v-col cols="12" md="6">
        <h4>Configurações</h4>
        <Form v-model="field" :form="form"></Form>
      </v-col>
      <v-col cols="12" md="6" class="d-flex flex-row">
        <v-divider class="fill-height mr-2 d-sm-none d-md-block" vertical></v-divider>
        <div class="flex-grow-1">
          <h4>Preview</h4>
          <div>
            <v-form>
              <Form v-model="somev" :form="[previewField]"></Form>
            </v-form>
          </div>
        </div>
      </v-col>
    </v-row>
  </Dialog>
</template>
<script lang="ts" setup>
import Dialog from "@/components/Dialog.vue";
import Form from "@/components/FormBuilder/Form.vue";
import { ReactiveProps } from "@/helpers/vue";
import { mapScreenTotemFieldToFormBuilderField } from "@/modules/totem/repositories/screen-totem-field-form-builder.repository";
import { computed, ref, watch } from "vue";

interface Props {
  modelValue: boolean;
  screenTotemField: ScreenTotemField;
  screenTotem: ScreenTotem; // Necessário para poder fazer o mapeamento do campo para o form builder
}

interface Emits {
  (e: "update:modelValue", value: boolean): void;
  (e: "save", value: ScreenTotemField): void;
}
const somev = ref({});
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const reactiveProp = new ReactiveProps(props, emit);
const dialog = reactiveProp.create("modelValue");

const field = ref<ScreenTotemField>({
  editable: 1,
  field_id: 0,
  order: 0,
  required: 1,
  screen_totem_id: 0,
  data: {
    id: 0,
    label: "",
    slug: "",
    key: "",
    description: "",
    group_id: 0,
    updated_at: "",
    created_at: "",
  },
});

const previewField = ref<FormItem>({
  label: "",
  value: "",
  component: "VTextField",
  props: {},
});
const form = ref<FormItem[]>([
  {
    component: "VSwitch",
    value: "editable",
    label: "O campo é editável",
    props: {
      trueValue: 1,
      falseValue: 0,
    },
    cols: {
      cols: 6,
      md: 12
    }
  },
  {
    component: "VSwitch",
    value: "required",
    label: "O campo é obrigatório?",
    props: {
      trueValue: 1,
      falseValue: 0,
    },
    cols: {
      cols: 6,
      md: 12
    }
  },
  {
    component: "VTextField",
    value: "order",
    label: "Ordenação do campo",
    required: true,
    props: {
      type: "number",
      disabled: computed(() => props.screenTotem.fields.length === 1),
      rules: computed(() => `between:${1},${props.screenTotem.fields.length}`),
      trueValue: 1,
      falseValue: 0,
    },
  },
]);

function save() {
  emit("save", field.value);
}

watch(
  () => dialog.value,
  () => {
    if (dialog.value) {
      field.value = { ...props.screenTotemField };

      const formItem = mapScreenTotemFieldToFormBuilderField(
        props.screenTotem.data.component!,
        field.value
      );
      previewField.value = Object.assign(formItem, {
        required: computed(() => field.value.required),
        props: {
          disabled: computed(() => !field.value.editable),
        },
        cols: {
          cols: 12,
          md: 12,
        },
      });
    }
  },
  { immediate: true }
);
</script>
