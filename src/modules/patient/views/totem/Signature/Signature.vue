<template>
  <div>
    <v-row v-if="!isLoading" justify="center">
      
      <v-col cols="12" sm="auto" v-for="action in actions">
        <v-sheet
          @click="action.click()"
          v-if="action.show && hasTrait(action.trait)"
          height="200"
          v-ripple
          style="cursor: pointer; white-space: normal"
          width="280"
          class="d-flex align-start justify-center flex-column px-4 py-10"
          color="transparent"
          border="sm"
          rounded="lg"
        >
          <img v-if="action.image" :src="action.image" height="64" />
          <v-icon v-else :icon="action.icon" size="64" color="primary"/>

          {{action.title}}
        </v-sheet>
      </v-col>

      <v-col cols="12" md="10">
        <v-btn
          block
          rounded
          variant="outlined"
          class="mt-6"
          @click="$emit('to', 'Queues')"
        >
          Pular checkin e ir para a recepção
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts" setup>
import faceIcon from "@/assets/icons/face-id.svg";
import tokenIcon from "@/assets/icons/passcode-lock.svg";
import { AlertProps, Data } from "@patient/types";
import { onBeforeMount, reactive, ref } from "vue";

interface Emit {
  (event: "alert", options: AlertProps): void;
  (event: "next"): void;
  (event: "to", payload: string): void;
}
interface Props {
  subScreens: Record<string, any>;
  data: Data;
  screen: ScreenTotem;
  traits?: ScreenTotemTrait[]
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();

const isLoading = ref(true);

const actions = reactive([
  {
    click: () => emit('to', 'FaceRecognition'),
    title: 'Assinatura PDF Biometria facial',
    image: faceIcon,
    show: props.data.patient!.has_face_recognition,
    trait: 'faceRecognition'
  },
  {
    click: () => emit('to', 'SendToken'),
    title: 'Token via SMS ou App',
    show: true,
    image: tokenIcon,
    trait: 'sendToken'
  },
  {
    click: () => emit('to', 'PDFSignature'),
    title: 'Assinatura do PDF',
    show: true,
    icon: 'mdi-file-pdf-box',
    trait: 'pdfSignature'
  },
])

function hasTrait(slug: string): boolean {
  return props.traits?.some(trait => trait.data.slug === slug && trait.enabled) ?? false;
}

onBeforeMount(() => {
  if (!props.data.patient?.has_face_recognition) {
    return emit("alert", {
      title: "Como gostaria de realizar o seu check-in?",
      text: "",
      action: {
        type: "choise",
        acceptLabel: "Agilizar com token",
        rejectLabel: "Ir para recepção",
        callback(choice: boolean) {
          if (choice) return emit("to", "SendToken");

          emit("to", "Queues");
        },
      },
    });
  }

  isLoading.value = false;
});
</script>
