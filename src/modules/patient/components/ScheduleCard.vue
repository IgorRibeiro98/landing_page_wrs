<template>
    <v-card variant="tonal" :color="isLate ? 'error' : 'primary'">
        <v-card-text>
            <v-row>
                <v-col cols="12" sm="12" md="7" :class="{ 'border-right': !smAndDown }">
                    <h2 class="text-secondary text-decoration-underline">
                        {{ schedule?.procedimento }}
                    </h2>

                    <p class="mt-3 text-secondary">
                        Dr(a). {{ doctorName }}
                    </p>

                    <ul class="no-bullets mt-4" :class="smAndDown ? 'd-flex justify-space-between' : ''">
                        <li>
                            <p>Convênio: <span class="text-secondary">{{ schedule?.ds_convenio }}</span></p>
                        </li>
                        <li>
                            <p>Plano: <span class="text-secondary">{{ schedule?.ds_plano }}</span></p>
                        </li>
                        <li>
                            <p>Produto: <span class="text-secondary">{{ schedule?.ds_produto }}</span></p>
                        </li>
                    </ul>
                </v-col>

                <v-col cols="12" sm="12" md="5" class="d-flex align-center flex-column justify-center">
                    <span class="text-h2 font-weight-bold text-secondary">
                        {{ hour }}
                    </span>

                    <h2 class="text-secondary">
                        {{ location }}
                    </h2>

                    <p class="mt-2">
                        <b v-if="!isLate">
                            Sua consulta será em {{ currentDateDiffInMinutes }}
                        </b>

                        <span v-else class="text-error font-weight-bold">
                            Atendimento atrasado
                        </span>
                    </p>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

import useResponsive from '../helpers/responsives';

const { title, mobile } = useResponsive()
const { smAndDown } = useDisplay()

const props = defineProps<{
    schedule: Agendamento
}>()

const schedule = computed(() => props.schedule)

const location = computed(() => {
    return schedule.value?.ds_endereco.split('|')[1]
})

const hour = computed(() => {
    const date = new Date(schedule.value?.agendado_para);

    return `${date.getUTCHours()}h:${date.getUTCMinutes() < 10 ? '0' : ''}${date.getUTCMinutes()}`
})

const currentDateDiffInMinutes = computed(() => {
    const date = new Date(schedule.value?.agendado_para);
    const currentDate = new Date();

    const diff = date.getTime() - currentDate.getTime();
    const diffInMinutes = Math.floor(diff / 60000);

    return `${diffInMinutes} minutos`
})

const isLate = computed(() => {
    const date = new Date(schedule.value?.agendado_para);
    const currentDate = new Date();

    return date.getTime() < currentDate.getTime()
})

const doctorName = computed(() => {
    if (!mobile.value) return schedule.value.medico

    const splittedName = schedule.value.medico.split(' ')
    const name = splittedName.map((item: string, index) => {
        return index == 0 || index == splittedName.length - 1 ? item : `${item[0]}.`
    }).join(' ')

    return name
})

</script>

<style>
.border-right::after {
    content: "";
    border-right: 2px solid black;
    height: 80%;
    position: absolute;
    right: 0;
    top: 10%;
}

.border-right {
    position: relative;
}

.no-bullets {
    list-style-type: none;
}
</style>
