<template>
  <div>
    <h2>Agora confirme que todos os seus contatos estão corretos.</h2>
    <p>
      Estas informações serão utilizadas caso seja necessário o hospital entrar
      em contato com você.
    </p>
    
    <FormBuilder class="mt-5" :form="form" v-model="data.patient!.data" />
    <v-row justify="center">
      <v-col cols="12" md="5">
        <v-btn
          block
          rounded="lg"
          color="primary"
          @click="updateData"
          :loading="loading"
          >Continuar</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts" setup>
import FormBuilder from "@/components/FormBuilder/Form.vue";
import { computed, onMounted, ref } from "vue";

import { updatePatientData } from "@/modules/patient/repositories/patient.repository";
import { AlertProps, Data, Patient, PatientData } from "@patient/types";

import {
  findAddressByCep,
  getTypeOfAddress,
  getUf
} from '@/modules/patient/repositories/tasy.repository';

interface Props {
  data: Data;
  collections: { [key: string]: any[] };
}
interface Emit {
  (event: "to", payload: string): void;
  (event: "update:data", value: any): void;
  (event: "next"): void;
  (event: "alert", options: AlertProps): void;
  (event: "update:collections", options: any): void;
}

interface LocalPatient extends Patient {
  data: PatientData & {
    telephone?: string;
    cellphone?: string;
  };
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();
const loading = ref(false);

const rootCollection = computed({
  get() {
    return props.collections;
  },
  set(value) {
    emit("update:collections", { patient: value });
  }
})

const fieldsWithZipCodeInteration = ref<any>({
  logradouro: {
    component: "VTextField",
    value: "street",
    label: "Logradouro",
    required: true,
    cols: {
      cols: 12,
      md: 5,
    },
    props: {
      loading: false
    }
  },
  uf: {
    component: "VAutocomplete",
    value: "state_cd",
    label: "UF",
    required: true,
    cols: {
      cols: 12,
      md: 3,
    },
    props: {
      items: [],
      'item-title': 'name',
      'item-value': 'id',
      request: getUf,
      loading: false
    }
  },
  localidade: {
    component: "VTextField",
    value: "city",
    label: "Cidade",
    required: true,
    cols: {
      cols: 12,
      md: 6,
    },
    props: {
      loading: false
    }
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
    props: {
      type: "number",
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
    props: {
      type: "number",
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
      items: [],
      request: getTypeOfAddress,
      'item-title': 'name',
      'item-value': 'id',
      loading: false
    },
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
    props: {
      onBlur: () => {
        if(props.data.patient!.data.zip_code.length < 8) return;

        Object.keys(fieldsWithZipCodeInteration.value).forEach(key => {
          fieldsWithZipCodeInteration.value[key].props.loading = true;
        })

        findAddressByCep(props.data.patient!.data.zip_code)
          .then(res => {
            Object.entries(fieldsWithZipCodeInteration.value).forEach(([key, value]) => {
              props.data!.patient!.data[value.value] = res.data[key];
            })
          })
          .finally(() => {
            Object.keys(fieldsWithZipCodeInteration.value).forEach(key => {
              fieldsWithZipCodeInteration.value[key].props.loading = false;
            })
          })
      },
    }
  },
  fieldsWithZipCodeInteration.value.logradouro,
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
  fieldsWithZipCodeInteration.value.uf,
  fieldsWithZipCodeInteration.value.localidade,
]);

function updateData() {
  loading.value = true;
  updatePatientData(props.data.patient!?.id, props.data.patient!?.data)
    .then(() => {
      emit("next");
    })
    .catch((error) => {
      openAlert(error);
    })
    .finally(() => (loading.value = false));
}

function openAlert(text: string | Error) {
  emit("alert", {
    title: `Ops, ${text}! :(`,
    text: "Não se preocupe! Vamos te encaminhar para a recepção",
    action: {
      type: "choise",
      rejectLabel: "Tentar novamente",
      acceptLabel: "Ok, entendi",
      callback(accept: boolean) {
        if (accept) {
          emit("to", "Queues");
        }
      },
    },
  });
}

onMounted(() => {
  form.value.forEach((item, index) => {
    if (!item?.props?.request) return

    if (rootCollection.value[item.value]?.length) {
      form.value[index].props.items = rootCollection.value[item.value];
      return
    }

    form.value[index].props.loading = true

    item.props.request()
    .then((response: any) => {
      form.value[index].props.items = response.data;
      form.value[index].props.items = response.data;
    }).finally(() => {
      form.value[index].props.loading = false
    });
  })
})
</script>
