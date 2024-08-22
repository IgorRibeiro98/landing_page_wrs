<template>
    <div>
        <v-row class="d-flex flex-md-column align-md-center">
            <v-col cols="12">
                <v-img :src="logo" width="100" height="100" class="mx-auto"></v-img>
            </v-col>
            <v-col col="12" md="4" class="text-center">
                <p>Vamos configurar seu ambiente</p>
            </v-col>
            <v-col cols="12" md="4">
                <FormBuilder v-model="tenant" :form="form">
                    <template #item:subdomain="{ props }">
                        <v-text-field v-model="tenant.subdomain" v-bind="props"
                            :rules="[...props.rules, validateSubdomainExists]">
                            <template #append-inner>
                                <span class="text-caption font-italic">.{{ domain }}</span>
                            </template>
                        </v-text-field>
                    </template>
                </FormBuilder>
            </v-col>
        </v-row>
    </div>
</template>
<script setup lang="ts">
import logo from '@/assets/logo.png';
import FormBuilder from '@/components/FormBuilder/Form.vue';
import { validateSubdomain } from '@/modules/tenant/repositories/tenant.repository';
import { computed, ref } from 'vue';

interface Props {
    modelValue: Tenant
}

interface Emits {
    (event: 'update:modelValue', value: Tenant): void
}

const domain = window.location.hostname

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

const tenant = computed<Tenant>({
    get() {
        return props.modelValue
    },
    set(value: Tenant) {
        emit('update:modelValue', value)
    }
})

async function validateSubdomainExists() {
    const response = await validateSubdomain(tenant.value.subdomain)
    return !response.data ? true : 'Subdomínio já existe'
}

const form = ref<FormItem[]>([
    {
        component: "VTextField",
        value: "name",
        label: "Nome",
        required: true,
        cols: {
            cols: 6,
            md: 12
        }
    },
    {
        component: "VTextField",
        value: "subdomain",
        label: "Sub-domínio",
        required: true,
        cols: {
            cols: 6,
            md: 12
        }
    },
    {
        component: "VTextField",
        value: "provider_uri",
        label: "Url da API ERP do parceiro",
        props: {
            rules: 'url'
        },
        required: true,
        cols: {
            cols: 6,
            md: 12

        }
    }
])
</script>
<style lang="scss" scoped></style>