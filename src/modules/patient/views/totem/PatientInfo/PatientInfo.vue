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
import { computed, ref } from "vue";

interface Props {
  data: Data;
}

interface Emit {
  (event: "to", payload: string): void;
  (event: "update:data", value: any): void;
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
    component: "VAutocomplete",
    value: "sex_cd",
    label: "Sexo",
    required: true,
    cols: {
      cols: 12,
      md: 4,
    },
    props: {
      items: ["Masculino", "Feminino"],
    },
  },
  // {
  //   component: "VAutocomplete",
  //   value: "gender",
  //   label: "Gênero",
  //   cols: {
  //     cols: 12,
  //     md: 4,
  //   },
  //   props: {
  //     items: [
  //       "Outro",
  //       "Lésbica",
  //       "Bissexual",
  //       "Transexual",
  //       "Travesti",
  //     ],
  //   },
  // },
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
      items: ["Solteiro", "Casado", "Divorciado", "Viúvo"],
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
      items: [
        "Brasileiro",
        "Americano",
        "Alemão",
        "Francês",
        "Italiano",
        "Japonês",
        "Chinês",
        "Coreano",
        "Outro",
      ],
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
      items: [
        "Católico",
        "Evangélico",
        "Espírita",
        "Ateu",
        "Agnóstico",
        "Outro",
      ],
    },
  },
]);

function next() {
  if(!formElement.value.validate()) return;


  emit('to', 'ContactInfo')
}
</script>
