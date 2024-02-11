<template>
    <div>
        <v-row>
            <v-col>
                <h1>
                    <b>{{ data.patient!.prim_nm_pessoa_fisica }}</b>, por favor revise suas informações de contato
                </h1>
            </v-col>
            <v-col cols="12">
                <v-form ref="form" @submit.prevent="validate">
                    <v-row>
                        <v-col cols="12" sm="6" md="3">
                            <v-text-field :disabled="isLoading" v-model="phone" label="DDD + Telefone fixo"
                                class="f-height-1" v-mask="'(##) #####-####'" @blur="applyPhone" number />
                        </v-col>

                        <v-col cols="12" sm="6" md="3">
                            <v-text-field :disabled="isLoading" v-mask="'(##) ####-####'" number @blur="applyCellPhone"
                                :rules="[required]" v-model="cellPhone" label="DDD + Celular" class="f-height-1 required" />
                        </v-col>

                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="data.patient!.ds_email" :disabled="isLoading" :rules="[required, email]"
                                label="E-mail" class="f-height-1 required" />
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                            <v-select :keyboard="false" label="Tipo de endereço" :items="['Hospedagem', 'Residencial']"
                                v-model="data.patient!.tipo_endereco" :disabled="isLoading" class="f-height-1 required"
                                :rules="[required]">
                            </v-select>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="CEP" number :disabled="isLoading" :rules="[required]" v-mask="'#####-###'"
                                v-model="data.patient!.cd_cep" @update:model-value="findAddressByCEP" class="f-height-1 required" />
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                            <v-select label="UF" :keyboard="false" :rules="[required]"
                                :disabled="addressLoading || isLoading" :loading="addressLoading || collection.uf.loading"
                                item-title="ds_valor_dominio" item-value="vl_dominio" v-model="data.patient!.cd_estado"
                                :items="collection.uf.data" class="f-height-1 required">

                            </v-select>
                        </v-col>

                        <v-col cols="12" sm="6" md="3">
                            <v-text-field label="Endereço" :rules="[required]" v-model="data.patient!.ds_endereco"
                                :disabled="addressLoading || isLoading" :loading="addressLoading" class="f-height-1 required" />
                        </v-col>

                        <v-col cols="12" sm="6" md="3">
                            <v-text-field label="Cidade" :rules="[required]" :disabled="addressLoading || isLoading"
                                :loading="addressLoading" v-model="data.patient!.ds_municipio" class="f-height-1 required">
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="2">
                            <v-text-field label="Nº" number :rules="[required]" :disabled="isLoading"
                                v-model="data.patient!.nr_endereco" class="f-height-1 required" />
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Complemento" v-model="data.patient!.ds_complemento" :disabled="isLoading"
                                class="f-height-1" />
                        </v-col>


                        <v-col cols="12">
                            <v-btn class="pa-1" block :disabled="isLoading" :loading="isLoading"
                                color="primary" type="submit">
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
import { ref, computed, onMounted } from 'vue'
import { required, email } from '@/rules'

import { updatePatient } from '@patient/repositories/patient.repository'
import { getUF, findCEP } from '@patient/repositories/contact-data.repository'

import useAlertStore from '@/stores/alert'
import useResponsive from '@patient/helpers/responsives'

interface Collection {
    [key: string]: {
        loading: boolean,
        data: any[],
        request(): Promise<any>
    }
}

const props = defineProps<{
    modelValue: Data;
    totem: Totem
}>();

const { openAlert } = useAlertStore()
const { title } = useResponsive()

const cellPhone = ref('');
const phone = ref('');

const addressLoading = ref(false);

const isLoading = ref(false)

const emit = defineEmits(['update:modelValue', 'next', 'to', 'start']);

const form = ref<HTMLFormElement>()

const data = computed({
    get() {
        return props.modelValue;
    },
    set() {
        emit('update:modelValue', data);
    },
})

const collection = ref<Collection>({
    uf: {
        loading: false,
        data: [],
        request: getUF
    },
})

async function validate() {
    await form.value!.resetValidation()
    const { valid } = await form.value!.validate()

    if (!valid) return

    isLoading.value = true

    updatePatient(data.value.patient)
        .then(() => {
            emit('next')
        })
        .catch(error => {
            openAlert('Erro ao atualizar informações pessoais', error.response.data.message)
        })
        .finally(() => {
            isLoading.value = false
        })
}

async function findAddressByCEP(cep: string) {
    if (cep.length < 9) return;

    addressLoading.value = true;

    findCEP(cep)
        .then((res) => {
            data.value.patient!.ds_endereco = res.data.ds_log;
            data.value.patient!.ds_municipio = res.data.ds_loc;
            data.value.patient!.sg_estado = res.data.ds_uf;

            data.value.patient!.nr_endereco = null;
            data.value.patient!.ds_complemento = null;
        })
        .finally(() => (addressLoading.value = false));
}

function applyCellPhone() {
    const regexCellPhone = cellPhone.value.replace(/[()\- ]/g, '');

    const ddd = regexCellPhone.substring(0, 2);
    const number = regexCellPhone.substring(2);

    data.value.patient!.nr_ddd_celular = ddd.length ? ddd : '';
    data.value.patient!.nr_telefone_celular = number.length ? number : '';
}

function applyPhone() {
    const regexPhone = phone.value.replace(/[()\- ]/g, '');

    const ddd = regexPhone.substring(0, 2);
    const number = regexPhone.substring(2);

    data.value.patient!.nr_ddd_telefone = ddd.length ? ddd : null;
    data.value.patient!.nr_telefone = number.length ? number : null;
}

onMounted(() => {
    if (data.value.patient!.nr_ddd_celular)
        cellPhone.value =
            data.value.patient!.nr_ddd_celular +
            data.value.patient!.nr_telefone_celular;

    if (data.value.patient!.nr_telefone)
        phone.value =
            data.value.patient!.nr_ddd_telefone + data.value.patient!.nr_telefone;


    Object.entries(collection.value)
        .forEach(([key, value]: any) => {
            value.request()
                .then((res: any) => {
                    collection.value[key].data = res.data
                })
                .catch((error: any) => {
                    openAlert('Erro ao carregar informações pessoais', error.response.data.message)
                })
        })
})

</script>
