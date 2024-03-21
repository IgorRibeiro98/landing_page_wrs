<template>
  <v-dialog v-bind="$attrs" v-model="dialog">
    <v-form
      ref="formRef"
      @submit.prevent="handleSubmit"
      v-model="validate"
      lazy-validation
      class="fill-height"
    >
      <v-card :loading="loading" height="100%">
        <v-card-title class="pa-4 pb-0">
          <slot name="title">
            <div class="d-flex align-center">
              <span>
                {{ form?.title || title }}
              </span>
              <v-spacer />
              <v-btn variant="plain" icon="mdi-close" @click="handleClose">
              </v-btn>
            </div>
          </slot>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="px-4">
          <v-row
            class="text-subtitle-1"
            v-if="$slots.description || form?.description"
          >
            <v-col>
              <slot name="description">
                <p v-if="form?.description" v-html="form.description"></p>
              </slot>
            </v-col>
          </v-row>
          <slot></slot>
          <slot name="content">
            <Form
              v-if="form?.form"
              v-model="form.form.value"
              :form="form?.form.inputs ?? []"
            >
              <template
                v-for="(formItem, index) in form.form.inputs"
                #[`item:${formItem.value}`]="data"
              >
                <slot :name="`item:${formItem.value}`" v-bind="data"></slot>
              </template>
            </Form>
          </slot>
        </v-card-text>
        <v-card-actions class="px-4 pb-4" v-if="!hideActions">
          <slot name="actions">
            <v-spacer></v-spacer>
            <v-btn variant="text" @click="handleClose">Cancelar</v-btn>
            <v-btn color="primary" type="submit">
              {{ form?.submitText ?? "Salvar" }}</v-btn
            >
          </slot>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script lang="ts" setup>
import Form from "@/components/FormBuilder/Form.vue";
import { computed, defineExpose, ref } from "vue";
interface Props {
  modelValue: boolean;
  title?: string;
  form?: FormDialog;
  loading?: boolean;
  cancelReset?: boolean;
  hideActions?: boolean;
}

interface Emit {
  (event: "update:modelValue", value: boolean): void;
  (event: "update:form", value: any): void;
  (event: "close"): void;
  (event: "submit"): void;
  (event: "invalid"): void;
}

const props = withDefaults(defineProps<Props>(), {
  cancelReset: false,
  hideActions: false,
});
const emit = defineEmits<Emit>();
const formRef = ref();
const validate = ref<boolean>(true);

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const handleClose = () => {
  if (props.form?.cancel) {
    props.form.cancel();
  }
  if (!props.cancelReset) {
    formRef.value.reset();
  }
  dialog.value = false;
  emit("close");
};

const handleSubmit = () => {
  if (!validate.value) {
    emit("invalid");
    return;
  }

  if (props.form?.submit) {
    return props.form.submit(props.form);
  }

  emit("submit");
};

const reset = () => {
  formRef.value.reset();
};

defineExpose({
  reset,
});
</script>
