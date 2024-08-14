<template>
  <Dialog :loading="loading" v-model="dialog" width="400" :form="formDialog" @clock="emit('close')"></Dialog>
</template>
<script lang="ts" setup>
import Dialog from "@/components/Dialog.vue";
import { createTotem, updateTotem } from "@/modules/totem/repositories/totem.repository";
import useAlertStore from "@/stores/alert";
import { useRouter } from "vue-router";

import { computed, ref } from "vue";

import { getDepartments, getSites } from '@/modules/patient/repositories/tasy.repository';
const props = defineProps<{
  modelValue: boolean;
  totem: TotemItem;
}>();

const router = useRouter();

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
  (event: "update:totem", value: TotemItem): void;
  (event: "save"): void;
  (event: "close"): void;
}>();

const internalTotem = computed({
  get: () => props.totem,
  set: (value) => emit("update:totem", value),
});
const isUpdate = computed(() => {
  return internalTotem.value.id !== 0
})

const title = computed(() => {
  return isUpdate.value ? "Editar Totem" : "Adicionar Totem"
})

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
const { openAlert } = useAlertStore();

const loading = ref<boolean>(false);

const _departments = ref([])

const departments = computed({
  get() {
    return _departments.value
  },
  set(value) {
    _departments.value = value
  }
})

const formDialog = ref<FormDialog>({
  title,
  form: {
    value: internalTotem,
    inputs: [
      {
        component: "VTextField",
        value: "name",
        label: "Nome",
        required: true,
        on: {}
      },
      (() => {
        const input: FormItem =  {
          component: "VTextField",
          value: "site_id",
          label: "Estabelecimento (ERP)",
          required: true,
          props: {
            'item-value': 'id',
            'item-title': 'name',
            items: []
          },
          request: getSites,
          on: {
            'update:modelValue': function(value: string) {
                getDepartments({site_id: value})
                  .then(res => {
                    _departments.value = res.data
                    internalTotem.value.department_id = null
                  })
              },
          },
        }

        return input
      })(),
      {
        component: "VTextField",
        value: "department_id",
        label: "Departamento (ERP)",
        required: true,
        on: {},
        props: {
          'item-value': 'id',
          'item-title': 'name',
          items: departments,
        },
        request: () => {
          return getDepartments({
            site_id: internalTotem.value.site_id
          })
        }
      },
      {
        component: "VTextarea",
        value: "description",
        label: "Descrição",
        required: true,
        on: {}
      },
    ],
  },
  submit: () => save(),
});

function save() {
  loading.value = true;
  const promise = isUpdate.value
    ? updateTotem(internalTotem.value.id, internalTotem.value)
    : createTotem(internalTotem.value).then(res => {
      router.push({
        name: 'totem.detail',
        params: {
          id: res.data.id
        }
      })

      return res
    });

  promise
    .then(() => {
      dialog.value = false;
      emit("save");
    })
    .catch((err) => {
      openAlert("Falha ao salvar totem", err);
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>
