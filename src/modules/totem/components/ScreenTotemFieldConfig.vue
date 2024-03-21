<template>
  <div style="height:30%;">
    <v-row class="fill-height">
      <v-col cols="12" md="6" style="max-height: 100%;" class="d-flex flex-column">
        <h3>Campos disponíveis</h3>
        <v-list class="position-relative overflow-scroll">
          <v-list-item
            @click="insertFieldInScreen(availableField)"
            v-for="availableField in availableFields"
            :title="availableField.label"
            :subtitle="availableField.description"
          ></v-list-item>
        </v-list>
        <div class="text-center" v-if="availableFields.length === 0">
          Não há mais campos disponíveis nessa tela
        </div>
      </v-col>
      <v-col cols="12" md="6" style="max-height: 100%;" class="d-flex flex-column">
        <h3>Campos selecionados</h3>
        <v-list class="position-relative overflow-scroll" style="overflow-x: hidden;">
            <transition-group name="list">
            <v-list-item
              :key="screenTotemField"
              v-for="(screenTotemField, i) in screenTotem.fields"
              @click="configField(screenTotemField)"
              :title="screenTotemField.data.label"
              :subtitle="screenTotemField.data.description"
            >
              <template #append>
                <v-btn
                  icon="mdi-delete"
                  @click.stop="deleteField(screenTotemField)"
                  variant="text"
                ></v-btn>
              </template>
              <template #prepend>
                <div class="d-flex flex-column mr-2">
                  <v-btn
                    icon="mdi-chevron-up"
                    variant="text"
                    size="20"
                    class="mb-auto"
                    :disabled="i === 0"
                    @click="changeOrder(-1, i)"
                  ></v-btn>
                  <v-btn
                    :disabled="i === screenTotem.fields.length - 1"
                    @click="changeOrder(1, i)"
                    icon="mdi-chevron-down"
                    variant="text"
                    size="20"
                  ></v-btn>
                </div>
                <h4 class="mr-2">{{ screenTotemField.order }}</h4>
              </template>
            </v-list-item>
          </transition-group>
        </v-list>
        <div class="text-center" v-if="screenTotem.fields.length === 0">
          Não há campos selecionados, clique na listagem da esquerda para adicionar novos campos
        </div>
      </v-col>
    </v-row>
    <ScreenTotemFieldConfigDialog
      v-model="dialog"
      :screen-totem-field="selectedFieldScreen"
      :screen-totem="screenTotem"
      @save="updateScreenTotemField"
    ></ScreenTotemFieldConfigDialog>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import ScreenTotemFieldConfigDialog from "./ScreenTotemFieldConfigDialog.vue";
interface Props {
  screenTotem: ScreenTotem;
}
const props = defineProps<Props>();
const dialog = ref(false);
const availableFields = computed(() => {
  return props.screenTotem.data.fields.filter(
    (field) => !props.screenTotem.fields.find((f) => f.field_id === field.id)
  );
});

const selectedFieldScreen = ref<ScreenTotemField>({
  editable: 1,
  field_id: 0,
  order: 0,
  required: 1,
  screen_totem_id: 0,
  data: {
    id: 0,
    label: "",
    slug: "",
    key: "",
    description: "",
    group_id: 0,
    updated_at: "",
    created_at: "",
  },
});

function insertFieldInScreen(field: ScreenField) {
  const fieldAttached = props.screenTotem.fields.findIndex(
    (f) => f.field_id === field.id
  );
  if (fieldAttached !== -1) {
    props.screenTotem.fields.splice(fieldAttached, 1);
    return;
  }

  props.screenTotem.fields.push(createScreenTotemFieldWithDefaults(field));
}

function createScreenTotemFieldWithDefaults(
  field: ScreenField
): ScreenTotemField {
  return {
    editable: 1,
    required: 1,
    field_id: field.id,
    screen_totem_id: props.screenTotem.id,
    data: field,
    order: props.screenTotem.fields.length + 1,
  };
}

function configField(field: ScreenTotemField) {
  selectedFieldScreen.value = field;
  dialog.value = true;
}

function deleteField(field: ScreenTotemField) {
  const index = props.screenTotem.fields.findIndex(
    (f) => f.field_id === field.field_id
  );
  props.screenTotem.fields.splice(index, 1);
  props.screenTotem.fields.forEach((f, index) => {
    f.order = index + 1;
  });
}

function updateScreenTotemField(field: ScreenTotemField) {
  const newIndex = field.order - 1;
  const oldIndex = selectedFieldScreen.value.order - 1;

  props.screenTotem.fields.splice(oldIndex, 1)[0];
  props.screenTotem.fields.splice(newIndex, 0, field);
  props.screenTotem.fields.forEach((f, index) => {
    f.order = index + 1;
  });

  dialog.value = false;
}

function changeOrder(direction: number, actualIndex: number) {
  const newIndex = actualIndex + direction;
  props.screenTotem.fields[actualIndex].order = newIndex + 1;
  props.screenTotem.fields[newIndex].order = actualIndex + 1;
  const item = props.screenTotem.fields.splice(actualIndex, 1)[0];
  props.screenTotem.fields.splice(newIndex, 0, {...item});
  // lastScreenTotemSelected.value = newIndex;
}
</script>
<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.list-leave-active {
  position: absolute;
}
</style>
