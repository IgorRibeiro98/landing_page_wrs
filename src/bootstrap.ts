import { App } from "vue";
import useAccountStore from "@/modules/account/store";

export default function (app: App) {
  const accountStore = useAccountStore()
  accountStore.loadAccount()
}
