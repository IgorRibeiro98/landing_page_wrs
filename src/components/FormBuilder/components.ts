import { Component } from 'vue';
import { VAutocomplete } from 'vuetify/components/VAutocomplete';
import { VFileInput } from 'vuetify/components/VFileInput';
import { VTextField } from 'vuetify/components/VTextField';
import { VTextarea } from 'vuetify/components/VTextarea';
import { VSwitch } from 'vuetify/components/VSwitch';
import RichText from '@/components/RichText.vue';

export const components: Record<FormComponent, Component> = {
  VAutocomplete,
  VTextField,
  VTextarea,
  VFileInput,
  RichText,
  VSwitch,
}

export default components;
