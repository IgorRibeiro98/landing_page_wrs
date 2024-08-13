<template>
  <div class="d-flex flex-column flex-grow-1">
    <!-- <h1 class="text-center flex-grow-0 d-flex align-end justify-center mb-8">
      Status: Biometria com imagem
    </h1> -->
    <h1 class="text-center">
      <span v-show="videoIsRunning">
        Capturando em <span class="text-primary">{{ timer }}</span>
      </span>
      <span v-show="!videoIsRunning"> Posicione-se em frente a câmera </span>
    </h1>
    <div
      class="d-flex flex-column flex-grow-1"
      style="flex-grow: 1; background: #4b4b4b"
    >
      <div
        style="width: 50%"
        class="d-flex flex-column justify-center align-center flex-grow-1 mx-auto position-relative"
      >
        <video
          ref="video"
          class="bg-grey position-absolute"
          autoplay
          style="
            object-fit: fill;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
          "
        ></video>
        <div
          class="cover position-absolute d-flex justify-center align-center"
          :class="{ active: processVideo }"
          style="
            width: 100%;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
          "
        >
          <img
            v-if="printFaceImg"
            :src="printFaceImg"
            style="width: 100%; height: 100%"
          />
          <div v-else class="avatar-capture"></div>
        </div>
      </div>
    </div>
    <div class="flex-grow-0">
      <div class="d-flex">
        <v-btn
          class="mx-auto px-8 py-2 mt-8"
          rounded
          color="primary"
          :disabled="videoIsRunning"
          @click="captureFace"
        >
        {{ buttonText }}
        </v-btn>
        <v-btn
          :loading="loading"
          class="mx-auto px-8 py-2 mt-8"
          :disabled="!printFaceImg"
          rounded
          color="green"
          @click="processFace">
          Confirmar
        </v-btn>
      </div>
    </div>
    <v-snackbar v-model="errorAlert" position="absolute" location="top right" color="red">
      Faces divergentes, não é a mesma pessoa. Tentativas restantes: {{ maxTries - tries }}
    </v-snackbar>
  </div>
</template>
<script lang="ts" setup>
import { recognizePatient } from "@/modules/patient/repositories/patient.repository";
import { AlertProps, Data } from "@/modules/patient/types";
import { computed, onMounted } from "vue";

import { onUnmounted, ref } from "vue";
interface Emit {
  (event: "alert", options: AlertProps): void;
  (event: "next"): void;
  (event: "to", screen: string): void;
}

interface Props {
  data: Data
}

const emit = defineEmits<Emit>();

const props = defineProps<Props>();
const video = ref<HTMLVideoElement | null>(null);
const videoIsRunning = ref(false);
const processVideo = ref(false);
const loading = ref(false);
const printFaceImg = ref<string | null>(null);
const maxTries = 3;
const tries = ref(0);
const delayInSeconds = 3;
const timer = ref(delayInSeconds);
const errorAlert = ref(false);

const buttonText = computed(() => {
  if (tries.value >= maxTries) {
    return "Limite de tentativas excedido";
  }

  if(tries.value > 0) {
    return "Tentar novamente";
  }
  if (!videoIsRunning.value && !printFaceImg.value) {
    return "Iniciar verificação";
  }
  return "Tirar outra foto";
});
function captureFace() {
  startCamera();
  printFaceImg.value = null;
}

function startTimer() {
  const interval = setInterval(() => {
    if (timer.value === 0) {
      stopCamera();
      timer.value = delayInSeconds;
      clearInterval(interval);
      return;
    }
    timer.value--;
  }, 1000);
}

const startCamera = async (withTimer = true) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (video.value) {
      video.value.srcObject = stream;
      if (withTimer) {
        videoIsRunning.value = true;
        startTimer();
      }
    }
  } catch (err: any) {
    emit("alert", {
      title: "Erro ao acessar a câmera",
      text: err,
      action: {
        type: "confirm",
        label: "fechar",
      },
    });
  }
};

function printFace(): Promise<string> {
  return new Promise((res, rej) => {
    try {
      processVideo.value = true;
      setTimeout(() => {
        if (!video.value) return;

        const canvas = document.createElement("canvas");
        canvas.width = video.value.videoWidth;
        canvas.height = video.value.videoHeight;
        const context = canvas.getContext("2d");
        context?.drawImage(video.value, 0, 0, canvas.width, canvas.height);
        res(canvas.toDataURL("image/png"));
        processVideo.value = false;
      }, 200);
    } catch (err) {
      rej(err);
    }
  });
}

async function stopCamera() {
  printFaceImg.value = await printFace();

  if (!video.value) return;
  const stream = video.value.srcObject as MediaStream;
  printFace();
  const tracks = stream.getTracks();
  tracks.forEach((track) => {
    track.stop();
  });
  video.value.srcObject = null;
  videoIsRunning.value = false;
}

function processFace() {
  if(!printFaceImg.value) return;
  loading.value = true;
  recognizePatient(printFaceImg.value, props.data.patient?.id!)
    .then((res) => {
      props.data.internal.faceRecognition = printFaceImg.value as string;
        emit("next");
    })
    .catch((err) => {
      tries.value++;
      errorAlert.value = true;
      printFaceImg.value = null;

      if (tries.value >= maxTries) {
        emit("alert", {
          title: `Você atingiu ${maxTries} tentativas de leitura biométrica!`,
          text: "Deseja tentar com o Token?",
          action: {
            type: "choise",
            rejectLabel: 'Ir para recepção',
            acceptLabel: 'Tentar com Token',
            callback(accept: boolean) {
              if(!accept) return emit("to", "Queues");
              emit("to", "SendToken");
            },
          },
        });
        return;
      }
    })
    .finally(() => {
      loading.value = false;
    });
}

onUnmounted(() => {
  stopCamera();
});

onMounted(() => {
  if(props.data.internal.faceRecognition) {
    printFaceImg.value = props.data.internal.faceRecognition
  }
  startCamera(false)
})
</script>
<style lang="scss" scoped>
.avatar-capture {
  width: 60%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.avatar-capture::before {
  content: "";
  position: absolute;
  width: 50%;
  height: 70%;
  border: 10px dashed white;
  border-radius: 100%;
  top: 10%;
  left: 25%;
}

.avatar-capture::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 40%;
  border: 10px dashed white;
  border-radius: 40%;
  top: 85%;
}

.cover {
  content: "";
  position: relative;
}

.cover::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 0;
  background: black;
  top: 0px;
  z-index: 10;
  transition: height 0.1s ease-in-out;
}

.cover.active::after {
  height: 50%;
}

.cover::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 0;
  background: black;
  bottom: 0px;
  z-index: 10;
  transition: height 0.1s ease-in-out;
}

.cover.active::before {
  height: 50%;
}
</style>
