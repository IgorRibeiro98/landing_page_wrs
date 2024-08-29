export const appBarItems = [
  {
    title: "Totens",
    icon: "mdi-monitor-vertical",
    acl: "totem.view",
    route: {
      name: "totem.view",
    },
  },
  {
    title: "Filas",
    icon: "mdi-format-list-bulleted",
    acl: "queue.view",
    route: {
      name: "queue.view",
    },
  },
  {
    icon: "mdi-sitemap-outline",
    title: "Tipos de Atendimento",
    acl: "attendance_type.view",
    route: {
      name: "attendance-type.view",
    },
  },
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
  }
]
