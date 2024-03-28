<template>
  <Dialog cancel-reset @submit="save" height="100%" v-model="dialog"  fullscreen>
    <template #title>
      <div class="d-flex align-center">
        <div class="d-flex align-center mb-2">
          <v-icon icon="mdi-cog"></v-icon>
          <h1 class="ml-4 text-h5 font-weight-bold">{{screenTotem.data.name}}</h1>
        </div>
        <v-spacer></v-spacer>
        <v-btn color="red" variant="tonal" @click="removeScreen">Remover tela</v-btn>
      </div>
    </template>
    <h2 class="mb-2">Formulário</h2>
    <div class="text-center" v-if="screenTotemEdit.data!.fields.length === 0">
      Não há formulários para configuração nessa tela.
    </div>
    <ScreenTotemFieldConfig
      v-show="screenTotemEdit.data!.fields.length > 0"
      :screen-totem="screenTotemEdit"
      :screen-fields="screenTotemEdit.data!.fields"
      :screen-totem-fields="screenTotemEdit.fields"
      @deleteField="emit('field:remove', $event)"
    ></ScreenTotemFieldConfig>
    <v-divider class="my-4" />
    <h2 class="mb-2">
      Funcionalidades
    </h2>
    <div class="text-center" v-if="screenTotemEdit.data!.traits.length === 0">
      Não há funcionalidades para configuração nessa tela.
    </div>
    <ScreenTotemTraitConfig
      v-show="screenTotemEdit.data!.traits.length > 0"
      :screen-totem="screenTotemEdit"
      :screen-traits="screenTotemEdit.data!.traits"
      :screen-totem-traits="screenTotemEdit.traits"/>
  </Dialog>
</template>
<script lang="ts" setup>
import Dialog from "@/components/Dialog.vue";
import { ReactiveProps } from "@/helpers/vue";
import ScreenTotemFieldConfig from "@/modules/totem/components/ScreenTotemFieldConfig.vue";
import ScreenTotemTraitConfig from "@/modules/totem/components/ScreenTotemTraitConfig.vue";
import useAlertStore from "@/stores/alert";
import { ref, watch } from "vue";
import { deleteScreenTotem } from "../repositories/totem.repository";

interface Props {
  modelValue: boolean;
  screenTotem: ScreenTotem;
}
interface Emits {
  (e: "update:modelValue", value: boolean): void;
  (e: "screen:delete", value: ScreenTotem): void;
  (e: "field:remove", value: ScreenTotemField): void;
  (e: "save", value: ScreenTotem): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const reactiveProp = new ReactiveProps(props, emit);
const { openDeleteAlert, openAlert, closeAlert } = useAlertStore();
const dialog = reactiveProp.create("modelValue");
const screenTotemEdit = ref<ScreenTotem>({
  id: 0,
  fields: [],
  traits: [],
  order: 0,
  screen_id: 0,
  totem_id: 0,
  data: {
    id: 0,
    name:'',
    fields: [],
    traits: [],
  }
})

function removeScreen() {
  if(screenTotemEdit.value.id === 0) {
    emit('screen:delete', screenTotemEdit.value);
    dialog.value = false;
    return;
  }
  openDeleteAlert((loading) => {
    loading.value = true;
    deleteScreenTotem(screenTotemEdit.value)
      .then(() => {
        emit('screen:delete', screenTotemEdit.value);
        closeAlert();
        dialog.value = false;
      })
      .catch((err: any) => {
        openAlert('Error', err)
      })
      .finally(() => {
        loading.value = false;
      });
  });
}

function save() {
  emit('save', screenTotemEdit.value);
}
watch(() => dialog.value, (value) => {
  if (value) {
    screenTotemEdit.value = JSON.parse(JSON.stringify(props.screenTotem));
  }
});
</script>
Tem
