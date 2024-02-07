<template>
    <v-card variant="tonal" :color="isLate ? 'error' : 'secondary'">
        <v-card-text>
            <v-row>
                <v-col cols="12" sm="12" md="7" :class="{ 'border-right': !smAndDown }">
                    <h2 class="text-h5 text-primary text-decoration-underline">
                        {{ schedule?.procedimento }}
                    </h2>

                    <h3 class="text-h6">
                        Dr(a). {{ schedule?.medico }}
                    </h3>

                    <ul class="text-h6 no-bullets mt-8" :class="smAndDown ? 'd-flex justify-space-between' : ''">
                        <li>
                            Convênio: <span class="text-primary">{{ schedule?.ds_convenio }}</span>
                        </li>
                        <li>
                            Plano: <span class="text-primary">{{ schedule?.ds_plano }}</span>
                        </li>
                        <li>
                            Produto: <span class="text-primary">{{ schedule?.ds_produto }}</span>
                        </li>
                    </ul>
                </v-col>

                <v-col cols="12" sm="12" md="5" class="d-flex align-center flex-column justify-center">
                    <h1 class="text-h1 font-weight-bold text-primary">
                        {{ hour }}
                    </h1>

                    <h2 class="text-h5 text-primary">
                        {{ location }}
                    </h2>

                    <p class="text-h5 mt-2">
                        <span v-if="!isLate">
                            Sua consulta será em {{ currentDateDiffInMinutes }}
                        </span>

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

const classes = computed(() => {
    return {
        'text-error': !smAndDown
    }
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