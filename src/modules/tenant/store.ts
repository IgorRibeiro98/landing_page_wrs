import { defineStore } from "pinia";
import { ref } from "vue";
import { getTenant } from "@/modules/tenant/repositories/tenant.repository";
import { useTheme } from 'vuetify'

const useTenantStore = defineStore('tenant', () => {


    const tenant = ref<Tenant>(JSON.parse(localStorage.getItem('tenant')!) ?? {
        id: 0,
        name: '',
        logo: '',
        theme: {},
        domain: '',
        updated_at: '',
        created_at: '',
    });

    const loadTenant = async () => {
        try {
            const theme = useTheme();

            return getTenant()
                .then((resp) => {
                    tenant.value = {
                        ...resp.data,
                        theme: JSON.parse(resp.data.theme),
                    }

                    const light = Object.assign({}, theme.themes.value.saludti, tenant.value.theme)
                    
                    Object.assign(theme.themes.value, { light })

                    theme.global.name.value = 'light'
                })
                .catch((error) => {
                    console.error({ error })
                })
        } catch (error) {
            console.error('Error');
        }
    };
    return {
        tenant,
        loadTenant,
    };
});

export default useTenantStore;
