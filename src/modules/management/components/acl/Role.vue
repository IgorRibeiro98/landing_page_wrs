<template>
    <LayoutView  icon="mdi-shield-key-outline" :title="title">
        <template #content>
            <v-form v-model="validate" lazy-validation @submit.prevent="save">
        <v-row>
            <v-col cols="12" md="3">
                <div class="mb-1">
                    <span class=" text-subtitle-2 font-weight-semi-bold pb-6 pr-1">Nome do grupo</span>
                    <span class="text-subtitle-2 font-weight-semi-bold text-error pb-6">*</span>
                </div>
                <v-text-field density="compact" flat variant="outlined" hide-details="auto" v-model="role.name"
                    :rules="validator.rules('required')" :disabled="role.is_default ? true : false"></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" md="2" class="d-flex align-end justify-end">
                <v-btn color="primary" rounded="lg" type="submit">
                    Salvar
                </v-btn>
            </v-col>
        </v-row>
    </v-form>
    <v-row>
        <v-col cols="12">
            <v-tabs v-model="tab">
                <template v-for="( tabItem, index ) in  tabs ">
                    <v-tab :key="index" density="compact" :text="tabItem.title" v-if="tabItem.show">
                    </v-tab>
                </template>
            </v-tabs>
            <v-window v-model="tab" class="pt-2">
                <v-window-item v-for="( tabItem, index ) in  tabs " :key="index">
                    <component :is="tabItem.component" v-model="role[tabItem.value]" />
                </v-window-item>
            </v-window>
        </v-col>
    </v-row>
        </template>
    </LayoutView>
</template>
<script setup lang="ts">
import Validator from '@/helpers/validator'
import Permissions from '@/modules/management/components/acl/Permissions.vue'
import RoleUsers from '@/modules/management/components/acl/RoleUsers.vue'
import useAlertStore from "@/stores/alert";
import { useSystemStore } from "@/stores/system";


// import { getAllUsersByRoleId } from '@/modules/user/repositories/userRepository'
import { computed, onMounted, ref, shallowRef } from 'vue'

interface Props {
    modelValue: Role
    showUsersTab?: boolean
}

interface Emits {
    (e: 'update:modelValue', value: Role): void
    (e: 'save', value: boolean): void

}

interface Tab {
    title: string
    component: any
    value: 'scopes' | 'users'
    show: boolean
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: () => {
        return {
            id: '',
            name: '',
            scopes: [],
            users: [],
            level: 1,
            is_default: false

        }
    },
    showUsersTab: true
})

const role = defineModel<Role>({
    required: true
})

const title = computed(() => role.value.id ? role.value.name : 'Criar grupo de permissões')

const { setBreadcrumbs } = useSystemStore()

setBreadcrumbs([
    { title: "ACL", name: "true", to:{name:  "management.acl"} },
    { title: title.value, name: "true", to: "" },
]);

const emit = defineEmits<Emits>()

const { openAlert } = useAlertStore();

const validator = new Validator()
const validate = ref<boolean>(false)
const tab = ref<null | number>(null)
const tabs = ref<Tab[]>([
    {
        title: 'Permissões',
        component: shallowRef(Permissions),
        show: true,
        value: 'scopes',
    },
    // {
    //     title: 'Usuários',
    //     component: shallowRef(RoleUsers),
    //     show: props.showUsersTab,
    //     value: 'users',
    // }
])


const save = () => {
    if (!role.value.scopes.length) {
        openAlert(
            "Selecione pelo menos uma permissão", 'É necessário selecionar pelo menos uma permissão'
        );
    }
    if (validate.value && role.value.scopes.length) {
        emit('save', true)
    }
}

const loadRoleUsers = () => {
    if (role.value.id && props.showUsersTab) {
        // getAllUsersByRoleId(role.value.id!)
        //     .then((response: any) => {
        //         role.value.users = response.data.map((user: any) => {
        //             return {
        //                 ...user,
        //                 scope_group_name: role.value.name
        //             }
        //         })
        //     }).catch((err: any) => {
        //         console.error(err)
        //         // errorMessage('Falha ao carregar usuários')
        //     })
    }
}

onMounted(() => {
    loadRoleUsers()
})
</script>
<style scoped lang="scss"></style>