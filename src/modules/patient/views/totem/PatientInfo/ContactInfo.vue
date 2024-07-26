<template>
  <div>
    <h2>Agora confirme que todos os seus contatos estão corretos.</h2>
    <p>
      Estas informações serão utilizadas caso seja necessário o hospital entrar
      em contato com você.
    </p>

    <FormBuilder class="mt-5" :form="form" v-model="patient!.data" />
    <v-row justify="center">
      <v-col cols="12" md="5">
        <v-btn block rounded="lg" color="primary" @click="$emit('next')"
          >Continuar</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts" setup>
import FormBuilder from "@/components/FormBuilder/Form.vue";
import { computed, ref } from "vue";

import { Data, Patient, PatientData } from "@patient/types";

interface Props {
  data: Data;
}
interface Emit {
  (event: "to", payload: string): void;
  (event: "update:data", value: any): void;
  (event: "next"): void;
}

interface LocalPatient extends Patient {
  data: PatientData & {
    telephone?: string
    cellphone?: string
  }
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();

const patient = computed<LocalPatient>({
  get() {
    const phone = (props.data.patient!.data.ddd_phone ?? '').concat(props.data.patient!.data.phone_number);

    const cellphone = (props.data.patient!.data.ddd_cellphone ?? '').concat(props.data.patient!.data.cellphone_number);
    
    const data: LocalPatient  = props.data.patient!

    data.data.telephone = phone;
    data.data.cellphone = cellphone

    return data;
  },
  set(value) {
    emit("update:data", { patient: value });
  }
})


const form = ref<FormItem[]>([
  {
    component: "VTextField",
    value: "telephone",
    label: "DDD + Telefone fixo",
    required: false,
    cols: {
      cols: 12,
      md: 3,
    },
  },
  {
    component: "VTextField",
    value: "cellphone",
    label: "DDD + Celular",
    required: true,
    cols: {
      cols: 12,
      md: 3,
    },
  },
  {
    component: "VTextField",
    value: "email",
    label: "E-mail",
    required: true,
    cols: {
      cols: 12,
      md: 6,
    },
  },
  {
    component: "VAutocomplete",
    value: "address_type_id",
    label: "Tipo de endereço",
    required: true,
    cols: {
      cols: 12,
      md: 3,
    },
    props: {
      items: ["Residencial", "Comercial", "Outro"],
    }
  },
  {
    component: "VTextField",
    value: "zip_code",
    label: "CEP",
    required: true,
    cols: {
      cols: 12,
      md: 2,
    },
  },
  {
    component: "VTextField",
    value: "street",
    label: "Logradouro",
    required: true,
    cols: {
      cols: 12,
      md: 5,
    },
  },
  {
    component: "VTextField",
    value: "number",
    label: "Número",
    required: true,
    cols: {
      cols: 12,
      md: 2,
    },
  },
  {
    component: "VTextField",
    value: "complement",
    label: "Complemento",
    required: true,
    cols: {
      cols: 12,
      md: 3,
    },
  },
  {
    component: "VAutocomplete",
    value: "state_cd",
    label: "UF",
    required: true,
    cols: {
      cols: 12,
      md: 3,
    },
    props: {
      items: ["SP", "RJ", "MG", "PR", "RS"],
    }
  },
  {
    component: "VAutocomplete",
    value: "city",
    label: "Cidade",
    required: true,
    cols: {
      cols: 12,
      md: 6,
    },
    props: {
      items: ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba", "Porto Alegre"],
    }
  },
]);

</script>
