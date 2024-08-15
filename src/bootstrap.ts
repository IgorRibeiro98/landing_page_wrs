import useTenantStore from "@/modules/tenant/store";
import useAuthStore from "@/stores/user";

export default function (route: any) {
  getAndRemoveTenantSwithUrlParams(route.currentRoute.value.query)

  let routeGuard = route.currentRoute.value.meta.guards?.find((guard: string) => guard == 'auth')

  if (!routeGuard?.length) return

  const tenantStore = useTenantStore()
  const userStore = useAuthStore()

  userStore.loadUser()
  tenantStore.loadTenant()
}

function getAndRemoveTenantSwithUrlParams(query: {[key: string]: string}) {
  if (!query) return;

  const paramsToRemoveFromURL = ['accessToken']

  const url = new URL(window.location.href)

  paramsToRemoveFromURL.forEach((param) => {
    if (!query[param]) return

    localStorage.setItem(param, query[param])

    const queryRegex = new RegExp(`(&?\\b${param}=[^&]*)`, 'g')

    url.hash = url.hash.replace(queryRegex, '')

    url.searchParams.delete(param)
  })

  url.hash = url.hash.replace(/\?$/, '');

  window.history.replaceState({}, document.title, url)
}