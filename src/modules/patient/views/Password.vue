<template>
    <div style="width: 300px;" class="d-flex align-center justify-center">
        <div>
            <v-img :src="logo" height="40">
            </v-img>
    
            <p class="text-center mt-4">
                {{ $route.query.site }}
            </p>
    
            <h1 class="text-center">
                {{ $route.query.value }}
            </h1>
    
            <p class="text-caption text-center font-weight-bold">
                Observe o painel para ser atendido
            </p>
            <p class="text-center text-caption">
                {{ date }} - {{ hour }}
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import appLogo from "@/assets/logo.png";
import useTenantStore from "@/modules/tenant/store";
import { capitalizeFirstLetter } from "@/helpers/string";

const tenantStore = useTenantStore();

const logo = computed(() => {
  return tenantStore.tenant.logo || appLogo;
});

const hour = computed(() => new Date().toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' }))

const date = computed(() => {
  const now = new Date();
  const day = now.toLocaleDateString("pt-BR", { day: "2-digit" });
  const month = now.toLocaleDateString("pt-BR", { month: "long" });
  const year = now.toLocaleDateString("pt-BR", { year: "numeric" });
  return `${day} de ${capitalizeFirstLetter(month)} de ${year}`;
});
</script>