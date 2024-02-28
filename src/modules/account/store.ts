import { defineStore } from "pinia";
import { ref } from "vue";
import { getAccount } from "@/modules/account/repositories/account.repository";

const useAccountStore = defineStore('account', () => {
    const account = ref<Account>(JSON.parse(localStorage.getItem('account')!) ?? {
        id: 0,
        name: '',
        logo: '',
        theme: {},
        domain: '',
        updated_at: '',
        created_at: '',
    });

    const loadAccount = async () => {
        try {
            return getAccount()
            .then((resp) => {
                account.value = {
                  ...resp.data,
                  theme: JSON.parse(resp.data.theme),
                }
                localStorage.setItem('account', JSON.stringify(account.value))
              })
              .catch(() => {
              })
        } catch (error) {
            console.error('Error');
        }
    };
    return {
        account,
        loadAccount,
    };
});

export default useAccountStore;
