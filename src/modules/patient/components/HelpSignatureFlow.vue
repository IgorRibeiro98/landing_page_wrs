<template>
    <v-dialog v-model="dialog" @update:model-value="start" width="100%" persistent>
        <v-card>
            <v-card-title :class="title" class="text-center" style="text-wrap: wrap;">
                Assinatura de Guia
            </v-card-title>

            <v-card-text style="overflow-y: hidden" class="d-flex align-center justify-center justify-space-between">
                <v-btn fab @click="prev" icon="mdi-chevron-left" color="primary" :disabled="disabledPrev">
                </v-btn>

                <Transition name="slide-up" mode="out-in">
                    <div v-if="!show">

                        <p :class="subtitle" class="text-center" v-html="step.text">
                        </p>

                        <v-img :src="step.image" height="400" />
                    </div>

                    <div v-else>
                        <p :class="subtitle" class="text-center" v-html="step.text">
                        </p>

                        <v-img :src="step.image" height="400"> </v-img>
                    </div>

                </Transition>

                <v-btn fab @click="next" icon="mdi-chevron-right" color="primary" :disabled="disableNext">
                </v-btn>
            </v-card-text>

            <v-card-actions class="d-flex justify-end">
                <v-btn variant="tonal" color="primary" size="x-large" class="font-weight-bold"
                    @click="stepIndex = steps.length - 1" :disabled="stepIndex == steps.length - 1">
                    Pular Ajuda
                </v-btn>

            </v-card-actions>

            <Timer :key="stepIndex" :time="timer / 1000" hide-number v-if="stepIndex != steps.length - 1"
                @timer-end="setStepTimeout(timer)" />
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import {
    ref,
    computed,
    watch
} from 'vue'

import totem from '@/assets/totem.png'
import totemTabletFocus from '@/assets/totem-tablet-focus.png'
import tablet from '@/assets/tablet.svg'

import Timer from './Timer.vue';
import useResponsive from '@patient/helpers/responsives';

interface Props {
    modelValue: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'end'])

const { title, subtitle } = useResponsive()

const hasCalledSignature = ref(false)

const steps = [
    {
        text: 'Bem-vindo ao nosso sistema de autoatendimento! <br/> Realize a assinatura da sua guia de forma rápida e simples. Siga as etapas abaixo para concluir o processo',
        image: totem,
    },
    {
        text: 'No canto esquerdo do totem, você verá um tablet.',
        image: totemTabletFocus,
    },
    {
        text: "Utilize a caneta que está em cima do tablet. <br> Após assinar, toque no botão <strong>'OK'</strong> na tela para confirmar",
        image: tablet
    },
]

const show = ref(false);

const stepIndex = ref(0)

const timeout = ref<any>(null)

watch(stepIndex, (current) => {
    if (current == steps.length - 1 && !hasCalledSignature.value) {
        hasCalledSignature.value = true
        emit('end', true)
    }
})

const disabledPrev = computed(() => {
    return stepIndex.value == 0
})

const disableNext = computed(() => stepIndex.value == steps.length - 1)

const step = computed(() => {
    return steps[stepIndex.value]
})

const dialog = computed({
    get() {
        return props.modelValue
    },
    set(value: boolean) {
        emit('update:modelValue', value)
    }
})

const wordsTextLength = computed(() => {
    return step.value.text.split(' ').length
})

const timer = computed(() => {
    return wordsTextLength.value * 500
})

function next() {
    clearTimeout(timeout.value)
    stepIndex.value++
}

function prev() {
    clearTimeout(timeout.value)
    stepIndex.value--
}

function start(value: boolean) {
    if (!value) return

    setStepTimeout(timer.value)
}

function setStepTimeout(time: number) {
    console.log(`Step: ${step.value.text} \n reading time second: ${(time / 1000)}s`)
    if (steps.length - 1 == stepIndex.value) {
        return
    }

    show.value = !show.value;
    stepIndex.value++

}
</script>

<style>
.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.40s ease-out;
}

.slide-up-enter-from {
    opacity: 0;
    transform: translateY(30px);
}

.slide-up-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}
</style>