<template>
  <v-row justify="center">
    <v-col cols="12" sm="auto">
        <v-sheet @click="$emit('to', 'FaceRecognition')" height="200" v-ripple style="cursor: pointer; white-space: normal;" width="280" class="d-flex align-start justify-center flex-column px-4 py-10" color="transparent" border="sm" rounded="lg">
          <img :src="faceIcon" height="64"/>
  
          Biometria facial
        </v-sheet>
    </v-col>

    <v-col cols="12" sm="auto" >
      <v-sheet @click="$emit('to', 'SendToken')" height="200" v-ripple style="cursor: pointer; white-space: normal;" width="280" class="d-flex align-start justify-center flex-column px-4 py-10" color="transparent" border="sm" rounded="lg">
        <img :src="tokenIcon" height="64"/>

        Token via SMS ou App
      </v-sheet>
    </v-col>

    <v-col cols="12" md="10">
      <v-btn block rounded variant="outlined" class="mt-6" @click="$emit('to', 'Queues')">
        Pular checkin e ir para a recepção
      </v-btn>
    </v-col>
  </v-row>
</template>
<script lang="ts" setup>
import { AlertProps } from "@patient/types";
import { onMounted, ref } from "vue";
import faceIcon from "@/assets/icons/face-id.svg";
import tokenIcon from "@/assets/icons/passcode-lock.svg";

interface Emit {
  (event: "alert", options: AlertProps): void;
  (event: "next"): void;
  (event: "to", payload: string): void;
}
interface Props {
  subScreens: Record<string, any>;
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();
const screen = ref("")

onMounted(() => {
})
</script>
