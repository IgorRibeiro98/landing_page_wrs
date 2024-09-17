<template>
  <v-row class="h-100">
    <v-col cols="12" class="h-100 d-flex flex-column">
      <v-stepper
        v-model="step"
        flat
        :non-linear="true"
        class="h-100 flex-grow-1 d-flex flex-column"
      >
        <v-stepper-header class="elevation-0 radius-0">
          <template v-for="(item, index) in items" :key="index">
            <v-stepper-item
              :complete="step > index"
              :title="item.title"
              :value="index"
            >
              <template #icon>
                {{ index + 1 }}
              </template>
            </v-stepper-item>
            <v-divider v-if="index + 1 != items.length"></v-divider>
          </template>
        </v-stepper-header>
        <v-stepper-window class="flex-grow-1">
          <v-form
            ref="itemRefs"
            v-for="(item, itemIndex) in items"
            :key="itemIndex"
            class="d-flex flex-column"
            :class="{ 'flex-grow-1': step === itemIndex }"
          >
            <v-stepper-window-item :value="itemIndex">
              <component :is="item.component" v-model="tenant" />
            </v-stepper-window-item>
          </v-form>
        </v-stepper-window>
        <template #actions="{ prev, next }">
          <div class="d-flex align-center justify-center my-3">
            <v-btn
              class="mx-2"
              color="primary"
              @click="prev"
              v-show="step !== 0"
            >
              Voltar
            </v-btn>
            <v-btn
              class="mx-2"
              color="primary"
              @click="nextStep(next)"
              v-show="step != items.length - 1"
            >
              Próximo
            </v-btn>
            <v-btn
              :loading="loading"
              ass="mx-2"
              color="primary"
              @click="create"
              v-show="step === items.length - 1"
            >
              Criar
            </v-btn>
          </div>
        </template>
      </v-stepper>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { downloadText } from "@/helpers/string";
import TenantInfo from "@/modules/tenant/components/TenantInfo.vue";
import TenantLogo from "@/modules/tenant/components/TenantLogo.vue";
import TenantTheme from "@/modules/tenant/components/TenantTheme.vue";
import { createTenant } from "@/modules/tenant/repositories/tenant.repository";
import router from "@/router";
import useAlertStore from "@/stores/alert";
import useAuthStore from "@/stores/user";
import { storeToRefs } from "pinia";
import type { Component } from "vue";
import { onMounted, ref } from "vue";
import { useTheme } from "vuetify";

interface Item {
  title: string;
  component: Component;
}

const theme = useTheme();
const { openAlert } = useAlertStore();
const { authUser } = storeToRefs(useAuthStore());

const tenant = ref<Tenant>({
  id: 0,
  name: "",
  provider_uri: "",
  logo: "",
  theme: {
    colors: {
      background: "#FFFFFF",
      surface: "#FFFFFF",
      "surface-bright": "#FFFFFF",
      "surface-light": "#EEEEEE",
      "surface-variant": "#424242",
      "on-surface-variant": "#EEEEEE",
      primary: "#1867C0",
      "primary-darken-1": "#1F5592",
      secondary: "#48A9A6",
      "secondary-darken-1": "#018786",
      error: "#B00020",
      info: "#2196F3",
      success: "#4CAF50",
      warning: "#FB8C00",
    },
  },
  subdomain: "",
  updated_at: "",
  created_at: "",
});

const itemRefs = ref<any>([]);
const loading = ref<boolean>(false);

const items = ref<Item[]>([
  {
    title: "Informações do Parceiro",
    component: TenantInfo,
  },
  {
    title: "Logotipo",
    component: TenantLogo,
  },
  {
    title: "Personalização",
    component: TenantTheme,
  },
]);
const step = ref<number>(0);

const pagesWithError = ref<number[]>([]);

function nextStep(callback: Function): void {
  itemRefs.value[step.value].validate().then((res: any) => {
    if (!res.valid) {
      pagesWithError.value.push(step.value);
    }
    if (res.valid) {
      pagesWithError.value = pagesWithError.value.filter(
        (pageWithError: number) => pageWithError !== step.value
      );
      callback();
    }
  });
}

const create = () => {
  itemRefs.value[step.value].validate().then((res: any) => {
    if (!res.valid) {
      pagesWithError.value.push(step.value);
    }
    if (res.valid) {
      loading.value = true;
      const formData = new FormData();
      formData.append("name", tenant.value.name);
      formData.append("provider_uri", tenant.value.provider_uri);
      formData.append("subdomain", tenant.value.subdomain);
      formData.append("logo", tenant.value.logo);
      formData.append("theme", JSON.stringify(tenant.value.theme));
      createTenant(formData)
        .then((resp) => {
          downloadText(
            `${tenant.value.name}-keys.txt`,
            `client_id=${resp.data.client.id} \nclient_secret=${resp.data.client.secret}`,
          );
          const tenantToPush = resp.data;
          delete tenantToPush.client;

          authUser.value.tenants!.push(tenantToPush);
          openAlert(
            "Tenant criado com sucesso",
            "As credenciais do cliente foram baixadas, guarde-as em um local seguro."
          );
          router.push({ name: "tenant.view" });
        })
        .catch((error) => {
          openAlert("Erro ao carregar totens", error);
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
};

onMounted(() => {
  tenant.value.theme.colors = theme.current.value.colors;
});
</script>
<style lang="scss" scoped>
.v-stepper-window {
  margin: 0;
}

:deep(.v-stepper-window) {
  display: flex;
  flex-grow: 1;
}

:deep(.v-window__container) {
  display: flex;
  flex-grow: 1;
}

:deep(.v-window-item--active) {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
