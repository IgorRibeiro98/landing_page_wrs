<template>
  <div>
    <h2><b>{{data.patient?.first_name}}</b>, revise suas informações pessoais.</h2>
    <p>É muito importante que estas informações estejam corretas.</p>
    <p>
      Elas serão utilizadas para sua identificação em todos os processos dentro
      do hospital.
    </p>
    <v-form ref="formElement" @submit.prevent="next">
      <FormBuilder class="mt-5" v-model="patient" :form="form"/>
      <v-row justify="center">
        <v-col cols="12" md="5">
          <v-btn type="submit" block rounded="lg" color="primary"
            >Continuar</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script lang="ts" setup>
import FormBuilder from "@/components/FormBuilder/Form.vue";
import { computed, onMounted, ref } from "vue";

import {
  getMeritalStatus,
  getNationality,
  getReligion,
  getSex
} from '@/modules/patient/repositories/tasy.repository';

import { updatePatient } from '@/modules/patient/repositories/patient.repository';
import { AxiosResponse } from "axios";

interface Props {
  data: Data;
  collections: { [key: string]: any[] };
}

interface Emit {
  (event: "to", payload: string): void;
  (event: "update:data", value: any): void;
  (event: "update:collections", value: any): void;
}

const emit = defineEmits<Emit>();
const props = defineProps<Props>();
const formElement = ref();

const patient = computed({
  get() {
    return props.data.patient;
  },
  set(value) {
    emit("update:data", { patient: value });
  }
})

const rootCollection = computed({
  get() {
    return props.collections;
  },
  set(value) {
    emit("update:collections", value);
  }
})

interface Collection {
  component: FormComponent
  value: string
  label: string
  required?: boolean
  cols: any
  props: {
    [key: string]: any
    request: () => Promise<AxiosResponse>
  }
}

const collections = ref<Collection[]>([
    {
    component: "VAutocomplete",
    value: "sex_cd",
    label: "Sexo",
    required: true,
    cols: {
      cols: 12,
      md: 4,
    },
    props: {
      items: [],
      request: getSex,
      'item-title': 'name',
      'item-value': 'id',
      loading: false
    }
  },
  {
    component: "VAutocomplete",
    value: "merital_status_id",
    label: "Estado civil",
    required: true,
    cols: {
      cols: 12,
      md: 4,
    },
    props: {
      items: [],
      request: getMeritalStatus,
      'item-title': 'name',
      'item-value': 'id',
      loading: false
    },
  },
  {
    component: "VAutocomplete",
    value: "nacionality_id",
    label: "Nacionalidade",
    required: true,
    cols: {
      cols: 12,
      md: 4,
    },
    props: {
      items: [],
      request: getNationality,
      'item-title': 'name',
      'item-value': 'id',
      loading: false
    },
  },
  {
    component: "VAutocomplete",
    value: "religion_id",
    label: "Religião",
    required: true,
    cols: {
      cols: 12,
      md: 4,
    },
    props: {
      items: [],
      request: getReligion,
      'item-title': 'name',
      'item-value': 'id',
      loading: false
    },
  },
])

const form = ref<FormItem[]>([
  {
    component: "VTextField",
    value: "cpf",
    label: "CPF",
    required: true,
    cols: {
      cols: 12,
      md: 4,
    },
    props: {
      disabled: true
    }
  },
  {
    component: "VTextField",
    value: "name",
    label: "Nome completo",
    required: true,
    cols: {
      cols: 12,
      md: 4,
    },
  },
  {
    component: "VTextField",
    value: "social_name",
    label: "Nome social",
    cols: {
      cols: 12,
      md: 4,
    },
  },
  {
    component: "VTextField",
    value: "rg",
    label: "RG",
    required: true,
    cols: {
      cols: 12,
      md: 4,
    },
  },
  ...collections.value,
]);

function next() {
  if(!formElement.value.validate()) return;

  updatePatient(props.data.patient!.id, props.data.patient!)
    .finally(() => {
      emit('to', 'ContactInfo')
    })

}

onMounted(() => {
  collections.value.forEach((item, index) => {
    if (rootCollection.value[item.value]?.length) {
      collections.value[index].props.items = rootCollection.value[item.value];
      return
    }

    collections.value[index].props.loading = true

    item.props.request()
    .then(res => {
      collections.value[index].props.items = res.data;
      rootCollection.value[item.value] = res.data;
    })
    .finally(() => {
      collections.value[index].props.loading = false
    })
  })
})
</script>
