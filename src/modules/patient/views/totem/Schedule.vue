<template>
  <div class="fill-height">
    <h1>
      Você possui <b>{{ data.patient!.agendamentos.length }}</b> agendamentos
      neste setor.
    </h1>
    <v-form ref="form" @submit.prevent="open">
      <v-row>
        <v-col cols="12">
          <ScheduleCarousel v-model="data.patient!.agendamentos">
          </ScheduleCarousel>
        </v-col>

        <v-col cols="12">
          <h2>Por favor, confirme a sua carteirinha</h2>

          <v-text-field
            v-for="(convenant, index) in convenants"
            :key="index"
            class="required mt-4"
            :label="`Carteirinha ${convenant.ds_convenio}`"
            v-model="convenant.cd_usuario_convenio"
            type="number"
            @click="convenants[index].edited = true"
            :rules="[required]"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-btn
            class="pa-1"
            block
            :disabled="isLoading"
            :loading="isLoading"
            color="primary"
            type="submit"
          >
            Continuar
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { required } from "@/rules";

import useAlertStore from "@/stores/alert";
import useResponsive from "@patient/helpers/responsives";

import ScheduleCarousel from "@patient/components/ScheduleCarousel.vue";

import { openAttendance } from "@patient/repositories/schedule.repository";

interface Convenant {
  ds_convenio: string;
  cd_convenio: number;
  cd_categoria: number;
  cd_plano: number;
  cd_produto?: number | null;
  cd_usuario_convenio: string;
  edited: boolean;
}

const props = defineProps<{
  modelValue: Data;
  totem: Totem;
  loading: any;
}>();

const { openAlert } = useAlertStore();
const { title } = useResponsive();
const form = ref();
const isLoading = ref(false);

const emit = defineEmits([
  "update:modelValue",
  "update:loading",
  "next",
  "to",
  "start",
]);

const data = computed({
  get() {
    return props.modelValue;
  },
  set() {
    emit("update:modelValue", data);
  },
});

const convenants = ref<Convenant[]>([]);

async function open() {
  await form.value.resetValidation();
  const { valid } = await form.value.validate();
  if (!valid) return;
  isLoading.value = true;

  emit("update:loading", {
    display: true,
    title: "Aguarde um momento",
    text: "Estamos verificando a sua elegibilidade e abrindo o seu atendimento...",
  });

  const sequences = data.value.patient!.agendamentos.map(
    (schedule: any) => schedule.nr_sequencia
  );

  openAttendance(sequences)
    .then((res) => {
      data.value.patient!.aberturaAtendimento = res.data;
      closeLoading();
      emit("next");
    })
    .catch((error) => {
      openAlert(
        "Não foi possível abrir o atendimento",
        error.response?.data?.message
      );
      closeLoading();
      emit("to", "Menu");
    })
    .finally(() => {
      console.log("finally");
      closeLoading();
      isLoading.value = false;
    });
}

function closeLoading() {
  emit("update:loading", {
    display: false,
    title: "",
    text: "",
  });
}

function setGroupConvenant() {
  if (convenants.value.length) return;

  convenants.value =
    data.value.patient?.agendamentos
      .map(
        ({
          cd_usuario_convenio,
          cd_convenio,
          ds_convenio,
          cd_plano,
          cd_produto,
          cd_categoria,
        }: any) => {
          return {
            cd_convenio,
            ds_convenio,
            cd_usuario_convenio,
            cd_plano,
            cd_produto,
            cd_categoria,
            edited: false,
            totem_id: props.totem.id,
          };
        }
      )
      .reduce((acc: Convenant[], current: Convenant) => {
        if (
          !acc.some(
            (schedule: Convenant) =>
              schedule.cd_convenio === current.cd_convenio
          )
        ) {
          acc.push(current);
        }
        return acc;
      }, [] as Convenant[]) ?? [];
}

onMounted(() => {
  if (!data.value.patient?.agendamentos.length) emit("to", "Menu");

  setGroupConvenant();
});
</script>
