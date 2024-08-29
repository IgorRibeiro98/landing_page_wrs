<template>
    <v-navigation-drawer v-model="drawer" :rail="rail" :permanent="!mobile" :temporary="mobile" color="nav-color"
        class="position-fixed">
        <v-list density="compact" nav v-if="!mobile">
            <v-list-item @click="$router.push({ name: 'user.self' })">
                <template #prepend>
                    <Avatar :user="user" color="nav-color-accent" size="24" :show-tooltip="rail" />
                </template>
                <template #title>
                    <span class="pl-4 font-weight-semi-bold">
                        {{ user.name }}
                    </span>
                </template>
            </v-list-item>
        </v-list>
        <v-divider v-if="!mobile" />
        <v-btn v-if="!mobile" color="nav-color" variant="flat" size="28" class="toggle-rail-drawer"
            :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'" @click.stop="toggleRail"></v-btn>
        <v-list class="mt-3" nav>
            <template v-for="(drawerItem, index) in items" :key="index">
                <DrawerItem :item="drawerItem" :rail="rail" v-if="mustRender(drawerItem)" />
            </template>
        </v-list>

    </v-navigation-drawer>
</template>
<script setup lang="ts">
import Avatar from "@/components/Avatar.vue";
import authorization from "@/plugins/authorization";
import useSystemStore from "@/stores/system";
import useAuthStore from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useDisplay } from 'vuetify';
import DrawerItem from "./DrawerItem.vue";

interface Props {
    items: DrawerItem[];
}

defineProps<Props>();

const rail = ref(true);
const navDrawerLeftPosition = computed<string>(() => {
    if (rail.value) {
        return "73%";
    }
    return "94%";
});


const logoutItem = ref({
    icon: "mdi-logout",
    title: "Sair",
    route: {
        name: "auth.logout",
    },
});

const route = useRoute();
const userStore = useAuthStore();
const { drawer } = storeToRefs(useSystemStore());

const { user } = storeToRefs(userStore);
const { mobile } = useDisplay();

function toggleRail() {
    rail.value = !rail.value
    localStorage.setItem("rail", rail.value.toString());
};

function mustRender(item: DrawerItem) {
    if (item.onlyMobile) {
        return mobile.value;
    }
    return item.acl ? authorization.acl(item.acl) : true
}

watch(mobile, () => {
    if (mobile.value) {
        rail.value = false;
        drawer.value = false;
        return;
    }
    drawer.value = true;
}, { immediate: true });

onBeforeMount(() => {
    if (mobile.value) return;

    const railValue = localStorage.getItem("rail");
    if (railValue) {
        rail.value = railValue == "true";
    }
});
</script>
<style scoped lang="scss">
.toggle-rail-drawer {
    position: absolute;
    top: 5%;
    left: v-bind(navDrawerLeftPosition);
    font-size: 1rem;
}

.logout {
    position: absolute;
    bottom: 0;
    width: 100%;
}
</style>
