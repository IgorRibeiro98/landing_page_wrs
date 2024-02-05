<template>
    <v-row justify="center">
        <v-col cols="12" class="overflow-auto mt-10">
            <p class="text-center text-body-1 text-secondary-1 mb-6">
                Por favor informe a sua identificação para encontrarmos seu cadastro e clique em <b>CONTINUAR</b>
            </p>
        </v-col>

        <v-col cols="7">
            <v-form ref="form" @submit="validate">
                <v-text-field class="f-height-1" autofocus :rules="[required]" label="Passaporte" :disabled="loading"
                    :loading="loading" v-model="identifier">
                </v-text-field>

                <v-btn block size="x-large" type="submit" color="primary">
                    CONTINUAR
                </v-btn>
            </v-form>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { required } from '@/rules';

interface Props {
    loading: boolean
}

const props = defineProps<Props>()

const identifier = ref('');

const form = ref<HTMLFormElement>()

const emit = defineEmits(['search'])


async function validate(event: Event) {
    event.preventDefault()

    if (!form.value) return


    const { valid } = await form.value.validate()

    if (!valid) return

    emit('search', identifier.value)
}

</script>