<template>
    <div class="w-100 h-100 d-flex align-center justify-center">
        <v-sheet class="pa-4 text-center" rounded width="400">
            <div v-if="!error">
                Aguarde que estamos configurando a aplicação...

                <v-progress-linear indeterminate color="primary" class="mt-4">
                </v-progress-linear>
            </div>

            <div v-else>
                Não foi possivel se autenticar, por favor tente novamente mais tarde.

                <v-btn color="primary" @click="login">
                    Voltar para login
                </v-btn>
            </div>
        </v-sheet>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { toggleQueryString } from '@/helpers/page';
import { login } from '@/modules/auth/services/auth.service';
import alertStore from '@/stores/alert';

const route = useRoute()
const router = useRouter()

const isLoading = ref(false)
const error = ref(false)
const alert = alertStore();

/**
 * @todo deixar o dialog sem a opção de fechar
*/
onMounted(() => {
  if (!route.query.accessToken) {
    alert.openAlert('erro', 'Não foi possivel se autenticar, por favor tente novamente mais tarde. (query incorreta.)')
    return;
  }

  isLoading.value = true

  localStorage.accessToken = route.query.accessToken;

  toggleQueryString({accessToken: null});

  router.push({
    name: 'totem.view'
  })
})
</script>
