export const appBarItems: {
  title: string
  icon: string
  acl: string
  route: any
}[] = [
  // {
  //   title: "Totens",
  //   icon: "mdi-monitor-vertical",
  //   acl: "totem.view",
  //   route: {
  //     name: "totem.view",
  //   },
  // },
]

export const navigationDrawerItems = [
  {
    icon: 'mdi-city-variant-outline',
    title: 'Tenant',
    acl: 'tenant.view',
    route: {
      name: 'tenant.view',
    }
  },
  {
    icon: 'mdi-shield-key-outline',
    title: 'ACL',
    acl: 'acl.view',
    route: {
      name: 'management.acl',
    }
  },
  {
    icon: 'mdi-account-supervisor',
    title: 'Usuários',
    acl: 'user.view',
    route: {
      name: 'management.users',
    }
  },
]
