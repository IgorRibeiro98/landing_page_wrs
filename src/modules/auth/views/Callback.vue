<template>
    <div class="w-100 h-100 d-flex align-center justify-center">
        <v-sheet class="pa-4 text-center" rounded width="400">
            Aguarde que estamos te autenticando...

            <v-progress-linear indeterminate color="primary" class="mt-4">
            </v-progress-linear>
        </v-sheet>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { retriveToken } from '@/modules/auth/services/auth.service'

const route = useRoute()
const router = useRouter()

const isLoading = ref(false)

onMounted(() => {
    isLoading.value = true 

    retriveToken({
        grant_type: 'authorization_code',
        code: route.query.code as string,
        redirect_uri: window.location.origin + '/#/auth/callback',
        client_id: import.meta.env.VITE_APP_CLIENT_ID,
        code_verifier: sessionStorage.getItem('code_verifier')!
    })
    .then(() => {
        router.push({
            name: 'totem.view'
        })
    })
    .finally(() => {
        isLoading.value = false
    })
})  
</script>
