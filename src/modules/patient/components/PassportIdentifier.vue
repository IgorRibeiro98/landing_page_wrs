<template>
    <v-row justify="center">
        <v-col cols="12" class="overflow-auto">
            <h1 class="text-center">
                Por favor informe a sua identificação para encontrarmos seu cadastro e clique em <b>CONTINUAR</b>
            </h1>
        </v-col>

        <v-col cols="7">
            <v-form ref="form" @submit="validate">
                <v-text-field class="required" autofocus :rules="[required]" label="Passaporte" :disabled="loading"
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
import useResponsive from '@patient/helpers/responsives';

const { subtitle } = useResponsive()

defineProps<{
    loading: boolean
}>()

const identifier = ref('');

const form = ref<HTMLFormElement>()

const emit = defineEmits(['search'])


async function validate(event: Event) {
    await form.value!.resetValidation()

    const { valid } = await form.value!.validate()

    if (!valid) return

    emit('search', identifier.value)
}

</script>
