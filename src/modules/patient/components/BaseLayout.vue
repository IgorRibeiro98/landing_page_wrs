<template>
    <v-container class="pt-8 px-12 d-flex flex-column totem" fluid style="height: 100%">
        <div class="flex-grow-0">
            <div>
                <v-img :src="logo" max-width="194"></v-img>
            </div>
        </div>
        <div style="width: 80%; height: 100%" class="flex-grow-1 ma-auto d-flex flex-column">
            <v-row class="ma-auto" no-gutters style="height: 100%; width: 100%">
                <v-col>
                    <slot></slot>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import appLogo from "@/assets/logo.png";
import useTenantStore from "@/modules/tenant/store";

const tenantStore = useTenantStore();

const logo = computed(() => {
    return tenantStore.tenant.logo || appLogo;
});

</script>