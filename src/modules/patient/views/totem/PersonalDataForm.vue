<template>
  <div class="fill-height">
    <v-row>
      <v-col>
        <h1>
          <b>{{ data.patient!.prim_nm_pessoa_fisica }}</b
          >, por favor revise suas informações pessoais
        </h1>
      </v-col>
      <v-col cols="12">
        <v-form ref="form" @submit.prevent="validate">
          <v-row>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="data.patient!.nr_cpf"
                v-mask="'###.###.###-##'"
                disabled
                label="CPF"
                required
                class="required"
              />
            </v-col>

            <v-col cols="12" sm="4">
              <v-text-field
                :disabled="isLoading"
                :rules="[required]"
                v-model="data.patient!.nm_pessoa_fisica"
                label="Nome"
                required
                class="required"
              />
            </v-col>

            <v-col cols="12" sm="4">
              <v-text-field
                :disabled="isLoading"
                v-model="data.patient!.nm_social"
                label="Nome Social"
              />
            </v-col>

            <v-col cols="6" sm="4">
              <v-radio-group
                :disabled="isLoading"
                :rules="[required]"
                v-model="data.patient!.ie_sexo"
                inline
                class="text-opacity-1 required"
              >
                <template #label>
                  <span class="text-secondary text-h5 required">Sexo</span>
                </template>
                <v-radio
                  class="mr-4  text-black"
                  value="M"
                  label="Masculino"
                  color="primary"
                  true-icon="mdi-radiobox-marked"
                  false-icon="mdi-radiobox-blank"
                  keyboard="false"
                >
                </v-radio>

                <v-radio
                  class=" text-black"
                  value="F"
                  label="Feminino"
                  color="primary"
                  true-icon="mdi-radiobox-marked"
                  false-icon="mdi-radiobox-blank"
                  keyboard="false"
                >
                </v-radio>
              </v-radio-group>
            </v-col>

            <v-col cols="6" sm="4">
              <v-radio-group
                v-if="!showGenderField && !data.patient!.nr_seq_genero"
                :disabled="isLoading"
                v-model="showGenderField"
                inline
                class=" text-opacity-1 text-black"
              >
                <template #label>
                  <div class="text-secondary mr-2">
                    Deseja informar seu gênero?
                  </div>
                </template>

                <v-radio
                  :value="true"
                  class="mr-4 "
                  color="primary"
                  label="Sim"
                  true-icon="mdi-radiobox-marked"
                  false-icon="mdi-radiobox-blank"
                  :keyboard="false"
                >
                </v-radio>

                <v-radio
                  :value="false"
                  color="primary"
                  class=""
                  label="Não"
                  true-icon="mdi-radiobox-marked"
                  false-icon="mdi-radiobox-blank"
                  :keyboard="false"
                >
                </v-radio>
              </v-radio-group>

              <v-select
                :keyboard="false"
                v-else
                class=" required"
                variant="outlined"
                label="Gênero"
                :rules="[required]"
                :disabled="isLoading || collection.gender.loading"
                v-model="data.patient!.nr_seq_genero"
                :items="collection.gender.data"
                :loading="collection.gender.loading"
                item-title="ds_genero"
                item-value="nr_sequencia"
              >
                <template #append>
                  <v-btn
                    icon="mdi-close"
                    variant="text"
                    color="error"
                    @click="
                      showGenderField = false;
                      data.patient!.nr_seq_genero = null;
                    "
                  >
                  </v-btn>
                </template>
              </v-select>
            </v-col>

            <v-col cols="6" sm="4">
              <v-select
                :keyboard="false"
                label="Estado Civil"
                item-title="ds_valor_dominio"
                item-value="vl_dominio"
                v-model="data.patient!.ie_estado_civil"
                :items="collection.meritalStatus.data"
                :disabled="isLoading || collection.meritalStatus.loading"
                class=""
                :loading="collection.meritalStatus.loading"
              >
              </v-select>
            </v-col>

            <v-col cols="6" sm="4">
              <v-select
                :keyboard="false"
                label="Nacionalidade"
                :rules="[required]"
                :disabled="isLoading || collection.nationality.loading"
                item-title="ds_nacionalidade"
                item-value="cd_nacionalidade"
                v-model="data.patient!.cd_nacionalidade"
                :items="collection.nationality.data"
                :loading="collection.nationality.loading"
                class=" required"
              >
              </v-select>
            </v-col>

            <v-col cols="6" sm="4">
              <v-select
                :keyboard="false"
                label="Religião"
                :rules="[required]"
                :disabled="isLoading || collection.religion.loading"
                item-title="ds_religiao"
                item-value="cd_religiao"
                v-model="data.patient!.cd_religiao"
                :items="collection.religion.data"
                :loading="collection.religion.loading"
                class=" required"
              >
              </v-select>
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
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { required } from "@/rules";

import { updatePatient } from "@patient/repositories/patient.repository";
import {
  getNationality,
  getReligion,
  getMaritalStatus,
  getGender,
} from "@patient/repositories/personal-data.repository";

import useAlertStore from "@/stores/alert";
import useResponsive from "@patient/helpers/responsives";

interface Collection {
  [key: string]: {
    loading: boolean;
    data: any[];
    request(): Promise<any>;
  };
}

const props = defineProps<{
  modelValue: Data;
  totem: Totem;
}>();

const { openAlert } = useAlertStore();
const { title } = useResponsive();

const isLoading = ref(false);

const emit = defineEmits(["update:modelValue", "next", "to", "start"]);

const form = ref<HTMLFormElement>();

const data = computed({
  get() {
    return props.modelValue;
  },
  set() {
    emit("update:modelValue", data);
  },
});

const showGenderField = ref(false);

const collection = ref<Collection>({
  gender: {
    loading: false,
    data: [],
    request: getGender,
  },
  nationality: {
    loading: false,
    data: [],
    request: getNationality,
  },
  religion: {
    loading: false,
    data: [],
    request: getReligion,
  },
  meritalStatus: {
    loading: false,
    data: [],
    request: getMaritalStatus,
  },
});

async function validate() {
  await form.value!.resetValidation();
  const { valid } = await form.value!.validate();

  if (!valid) return;

  isLoading.value = true;

  updatePatient(data.value.patient)
    .then(() => {
      emit("next");
    })
    .catch((error) => {
      openAlert(
        "Erro ao atualizar informações pessoais",
        error.response.data.message
      );
    })
    .finally(() => {
      isLoading.value = false;
    });
}

onMounted(() => {
  Object.entries(collection.value).forEach(([key, value]: any) => {
    collection.value[key].loading = true;

    value
      .request()
      .then((res: any) => {
        collection.value[key].data = res.data;
      })
      .catch((error: any) => {
        openAlert(
          "Erro ao carregar informações pessoais",
          error.response.data.message
        );
      })
      .finally(() => {
        collection.value[key].loading = false;
      });
  });
});
</script>

<style lang="scss">

</style>
