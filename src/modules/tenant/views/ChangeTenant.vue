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

import { login } from '@/modules/auth/services/auth.service';
import alertStore from '@/stores/alert';
import useAuthStore from '@/stores/user';
import useTenantStore from '../store';

const route = useRoute()
const router = useRouter();

const isLoading = ref(false)
const error = ref(false)
const alert = alertStore();

/**
 * @todo deixar o dialog sem a opção de fechar
*/
onMounted(async () => {
  if (!route.query.accessToken) {
    error.value = true;
    return;
  }

  isLoading.value = true

  localStorage.accessToken = route.query.accessToken;

  const tenantStore = useTenantStore()
  const userStore = useAuthStore()
  Promise.allSettled([userStore.loadUser(), tenantStore.loadTenant()])
    .then(() => {
      isLoading.value = false
      console.log(userStore.user)
      router.push({ name: 'home' })
    })
    .catch(() => {
      isLoading.value = false
      error.value = true
    });
})
</script>
