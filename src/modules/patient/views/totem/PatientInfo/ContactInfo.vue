<template>
  <div>
    <h2>Agora confirme que todos os seus contatos estão corretos.</h2>
    <p>
      Estas informações serão utilizadas caso seja necessário o hospital entrar
      em contato com você.
    </p>
    <FormBuilder class="mt-5" :form="form" v-model="patient" />
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
import { ref } from "vue";

interface Props {
  data: Data;
}

const props = defineProps<Props>();

const form = ref<FormItem[]>([
  {
    component: "VTextField",
    value: "fix_phone",
    label: "DDD + Telefone fixo",
    required: true,
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
    value: "adress_type",
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
    value: "cep",
    label: "CEP",
    required: true,
    cols: {
      cols: 12,
      md: 2,
    },
  },
  {
    component: "VTextField",
    value: "aditional_adress",
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
    value: "uf",
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
const patient = ref<any>({
  fix_phone: "11 1234-5678",
  cellphone: "11 98765-4321",
  email: "paciente@test.com",
  adress_type: "Residencial",
  cep: "12345-678",
  aditional_adress: "Rua dos Bobos",
  number: "0",
  complement: "Apto 123",
  uf: "SP",
  city: "São Paulo",
});
</script>
