<template>
    <v-row>
        <v-col v-for="(formItem, index) in props.form" v-show="formItem.hide ?? true" :cols="formItem?.cols?.cols ?? 12"
            v-bind="formItem.cols">
            <div v-if="formItem.title" class="mb-4">
                <span class="text-subtitle-1 font-weight-bold ">{{ formItem.title }}</span>
            </div>
            <div :class="{ 'mb-1': !formItem.description }">
                <span class=" text-subtitle-2 font-weight-semi-bold pb-6">{{ formItem.label }}</span>
                <span class="text-subtitle-2 font-weight-semi-bold text-error pb-6" v-if="formItem.required">*</span>
            </div>
            <div v-if="formItem.description" class="mb-1">
                <span class="text-caption">{{ formItem.description }}</span>
            </div>
            <slot :name="`item:${formItem.value}`" :props="{
                ...formItem.props,
                hideDetails: 'auto',
                density: 'compact',
                variant: 'solo-filled',
                flat: true,
                rules: getRulesFromFormItem(formItem),
            }" :on="formItem.on">
                <component :is="components[formItem.component]" v-model="form[formItem.value]" v-bind="{
                    ...formItem.props,
                    hideDetails: 'auto',
                    density: 'compact',
                    variant: 'solo-filled',
                    flat: true,
                    rules: getRulesFromFormItem(formItem),
                }" v-on="formItem.on ?? {}"/>
            </slot>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import components from '@/components/FormBuilder/components';
import Validator from '@/helpers/validator';
import { computed, onMounted } from 'vue';

const validator = new Validator();

const props = defineProps<{
    form: FormItem[];
    modelValue: any;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: any): void;
}>();

const form = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
});

const getRulesFromFormItem = (formItem: FormItem) => {
    const rules = [];

    if (formItem.required) {
        rules.push('required');
    }

    if (formItem.props?.rules) {
        rules.push(formItem.props.rules);
    }
    return validator.rules(rules.join('|'));
}

onMounted(() => {
    props.form.forEach((form) => {
        if (!form?.request) return 

        form.props.loading = true

        form.request()
            .then((response: any) => {
                form.props.items = response.data;
                form.component = 'VAutocomplete';
            })
            .finally(() => (form.props.loading = false));
    })
})
</script>
