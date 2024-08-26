import useTenantStore from "@/modules/tenant/store";
import useAuthStore from "@/stores/user";

import { toggleQueryString } from "./helpers/page";
import { Meta, useRouter } from "./router";

export default function install() {
  instropectUserAndTenant();
}

async function instropectUserAndTenant () {
  // await checkIfExistAccessTokenAndSave()

  const router = useRouter();
  await router.isReady()

  const meta = router.currentRoute.value.meta as Meta

  let isAuthRoute = meta.guards?.some((guard: string) => guard == 'auth')
  if (!isAuthRoute) return

  const tenantStore = useTenantStore()
  const userStore = useAuthStore()

  await Promise.allSettled([userStore.loadUser(), tenantStore.loadTenant()]);
}

/**
 *
 * @todo verificar porque tem que dar reload, se não der reload não funciona, o accessToken permanece na queryString e ao trocar de tenant, o mesmo não carrega.
 */
async function checkIfExistAccessTokenAndSave() {
  const url = new URL(window.location.href.replace('#', ''));
  const token = url.searchParams.get('accessToken');
  if (!token) return;

  localStorage.setItem('accessToken', token);

  toggleQueryString({ accessToken: null });
  window.location.reload();
}
