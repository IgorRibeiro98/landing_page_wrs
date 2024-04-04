<template>
    <v-form
      @submit.prevent="save" lazy-validation v-model="validate">
        <FormBuilder :form="form" v-model="data">

            <template #item:icon="{props, on}">
                <v-file-input v-model="icon.file" v-on="on" v-bind="props">
                    <template #prepend-inner>
                      <div class="d-flex align-center">
                        <img :src="file.preview" height="30"/>
                      </div>
                    </template>
                </v-file-input>
            </template>
        </FormBuilder>

        <div class="d-flex justify-end mb-3" v-if="!hideActions">
          <v-btn variant="text" :disabled="isLoading"  @click="clear(); emit('cancel')">
              Cancelar
          </v-btn>

          <v-btn type="submit" variant="text" color="primary" :disabled="isLoading" :loading="isLoading">
              {{action}}
          </v-btn>
        </div>
    </v-form>
</template>

<script setup lang="ts">
import FormBuilder from "@/components/FormBuilder/Form.vue";
import { computed, ref } from 'vue';

import { createAttendanceType, updateAttendanceType } from '@/modules/totem/repositories/attendance-type.repository';
import { AxiosResponse } from "axios";

import defaultData from '@/modules/totem/default-values';

interface Props {
    modelValue: AttendanceTypeData
    hideActions?:boolean
}

const validate = ref(false)

const props = withDefaults(defineProps<Props>(), {
  hideActions: false
})

defineExpose({
  save
})

interface Emit {
    (event: 'update:modelValue', payload: AttendanceTypeData): void
    (event: 'submit', payload: Promise<AxiosResponse>): void
    (event: 'cancel'): void
}
const emit = defineEmits<Emit>()

const data = computed<AttendanceTypeData>({
    get()  {
        getIconFromURL()
        return props.modelValue
    },
    set: (value: AttendanceTypeData) => emit('update:modelValue', value)
})

const action = computed(() => data.value.id ? 'Atualizar' : 'Salvar')

interface IconProps {
  file: File[];
  base64: string;
}
const icon = ref<IconProps>({
  file: [],
  base64: '',
})

const file = computed(() => {
  return {
    eddited: icon.value.base64.length > 0,
    preview:  data.value.icon.length ? data.value.icon : icon.value.base64
  }
})

const isLoading = ref(false)

const form = ref<FormItem[]>([
    {
    component: "VTextField",
    value: "name",
    label: "Nome",
    props: {
      trueValue: 1,
      falseValue: 0,
    },
    on: {},
    cols: {
      cols: 6,
      md: 12
    }
  },
  {
    component: "VFileInput",
    value: "icon",
    label: "Ícone",
    props: {
      trueValue: 1,
      falseValue: 0,
    },
    on: {
         change: async () => {
            data.value.icon = ''
            fileToBase64(icon.value.file[0])
              .then((base64: any) => {
                icon.value.base64 = base64 as string
              })
        }
    },
    cols: {
      cols: 6,
      md: 12
    }
  },
  {
    component: "VTextarea",
    value: "description",
    label: "Descrição",
    props: {
      trueValue: 1,
      falseValue: 0,
    },
    on: {
        
    },
    cols: {
      cols: 6,
      md: 12
    }
  },
])

function fileToBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((res, rej) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => res(reader.result as string);

    reader.onerror = () => rej(reader.result);
  });
}

function save() {
    if (!validate.value) return;

    isLoading.value = true;

    const { icon: _, ...payload } = data.value;

    const formData = new FormData()

    Object.entries(payload).forEach(([key, value]: any) => {
        formData.append(key, value)
    })

    if (file.value.eddited)
        formData.set('icon', icon.value.file[0])

    const promise = data.value.id ? updateAttendanceType(data.value.id, formData) : createAttendanceType(formData)

    promise
    .then((res) => {
        clear()
        return res
    })
    .finally(() => {
        emit('submit', promise)
        isLoading.value = false
    })
}

function clear() {
  emit('update:modelValue', structuredClone(defaultData.attendanceType))
  icon.value.base64 = ''
  icon.value.file = []
}

async function getIconFromURL() {
  const url = props.modelValue.icon

  if (!url) return

  const response = await fetch(url, { method: 'GET', mode: "no-cors" })

  const blob = await response.blob();

  const fileName = url.match(/[^/]*$/)?.[0]

  icon.value.file = [new File([blob], fileName ?? 'Não identificado', { type: response.headers.get('Content-Type') as string })]
}

</script>