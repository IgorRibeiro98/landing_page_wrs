<template>
  <div>
    <v-row v-if="!isLoading" justify="center">
      <v-col cols="12" sm="auto">
        <v-sheet
          @click="$emit('to', 'FaceRecognition')"
          v-if="data.patient!.has_face_recognition"
          height="200"
          v-ripple
          style="cursor: pointer; white-space: normal"
          width="280"
          class="d-flex align-start justify-center flex-column px-4 py-10"
          color="transparent"
          border="sm"
          rounded="lg"
        >
          <img :src="faceIcon" height="64" />Assinatura PDF

          Biometria facial
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="auto">
        <v-sheet
          @click="$emit('to', 'SendToken')"
          height="200"
          v-ripple
          style="cursor: pointer; white-space: normal"
          width="280"
          class="d-flex align-start justify-center flex-column px-4 py-10"
          color="transparent"
          border="sm"
          rounded="lg"
        >
          <img :src="tokenIcon" height="64" />

          Token via SMS ou App
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="auto">
        <v-sheet
          @click="$emit('to', 'PDFSignature')"
          height="200"
          v-ripple
          style="cursor: pointer; white-space: normal"
          width="280"
          class="d-flex align-start justify-center flex-column px-4 py-10"
          color="transparent"
          border="sm"
          rounded="lg"
        >
          <v-icon icon="mdi-file-pdf-box" size="64" color="primary"/>

          Assinatura do PDF
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
import { onBeforeMount, ref } from "vue";

interface Emit {
  (event: "alert", options: AlertProps): void;
  (event: "next"): void;
  (event: "to", payload: string): void;
}
interface Props {
  subScreens: Record<string, any>;
  data: Data;
  screen: any;
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();

const isLoading = ref(true);

function hasFeature(slug: string) {
  
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
