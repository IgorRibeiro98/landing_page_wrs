<template>
    <v-container fluid>
        <v-form @submit.prevent="open">
            <v-row>
                <v-col cols="12">
                    <p class="text-body-1">
                        Você possui <b>{{ data.patient.agendamentos.length }}</b> agendamentos neste setor
                    </p>
                </v-col>

                <v-col cols="12">
                    <ScheduleCarousel v-model="data.patient.agendamentos">
                    </ScheduleCarousel>
                </v-col>

                <v-col cols="12">
                    <v-text-field v-for="(convenant, index) in convenants" :key="index"
                        :label="`Carteirinha ${convenant.ds_convenio}`" v-model="convenant.cd_usuario_convenio"
                        type="number" @click="convenants[index].edited = true" :rules="[required]"></v-text-field>
                </v-col>

                <v-col cols="12">
                    <v-btn block :disabled="isLoading" :loading="isLoading" size="x-large" height="3.5em" color="primary"
                        type="submit">
                        Continuar
                    </v-btn>
                </v-col>
            </v-row>
            <!-- <LoadingFlow /> -->
        </v-form>
    </v-container>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { required } from '@/rules'

import useAlertStore from '@/stores/alert'

import ScheduleCarousel from '@patient/components/ScheduleCarousel.vue'
// import LoadingFlow from '@/components/LoadingFlow.vue';

import { openAttendance } from '../../repositories/attendance.repository'

interface Convenant {
    ds_convenio: string;
    cd_convenio: number;
    cd_categoria: number;
    cd_plano: number;
    cd_produto?: number | null;
    cd_usuario_convenio: string;
    edited: boolean;
}

const { alert } = storeToRefs<any>(useAlertStore())

const props = defineProps<{
    modelValue: any;
    totem: any
}>();

const isLoading = ref(false)

const emit = defineEmits(['update:modelValue', 'next', 'to', 'start'])

const data = computed({
    get() {
        return props.modelValue
    },
    set() {
        emit('update:modelValue', data)
    }
})

const convenants = ref<Convenant[]>([])

function open() {
    isLoading.value = true

    const sequences = data.value.patient.agendamentos.map((schedule: any) => schedule.nr_sequencia)

    openAttendance(sequences)
        .then(res => {
            emit('next')
        })
        .catch((error) => {
            emit('to', 'Menu')
        })
        .finally(() => {
            isLoading.value = false
        })
}

function setGroupConvenant() {
    if (convenants.value.length) return

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
                }) => {
                    return {
                        cd_convenio,
                        ds_convenio,
                        cd_usuario_convenio,
                        cd_plano,
                        cd_produto,
                        cd_categoria,
                        edited: false,
                        totem_id: props.totem._id,
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

watch(() => data.value.patient.agendamentos, () => {
    setGroupConvenant();
});

onMounted(() => {
    if (!data.value.patient.agendamentos.length) emit('to', 'Menu')
})

</script>