import { ComputedRef } from 'vue';
import { type RouteLocationRaw } from 'vue-router';
import type { ThemeDefinition } from 'vuetify/lib/framework.mjs';

declare global {
  interface Window {
    api: {
      print({ value: string, site: string })
    }
  }

  interface ButtonOption {
    title: string;
    id: string;
    subtitle?: T<string> | string;
    color: string;
    action?: () => void;
    icons?: string[]
    show: boolean;
    [key: string]: any;
  }

  interface Tenant {
    id: string;
    name: string;
    logo: string | File;
    theme: ThemeDefinition;
    subdomain: string;
    updated_at: string;
    created_at: string;
  }

  interface Role {
    id: string,
    name: string,
    is_default: boolean,
    scopes: Scope[] | string[]
    level: number,
    users?: any[]
  }

  type FormComponent = 'VAutocomplete' | 'VTextField' | 'VTextarea' | 'VFileInput' | 'RichText' | 'VSwitch'
  type FnRule = (value: any) => string | boolean
  type PromiseRule = (value: any) => Promise<string | boolean | undefined>
  type Rules = string | string[] | FnRule[] | PromiseRule[]

  interface Props {
    [key: string]: any; // Permite qualquer chave
    rules?: Rules
  }

  interface MenuItem<TArgs = any> {
    title: string;
    action?: (args: TArgs) => void;
    to?: any;
    acl?: string;
    show?: any;
  }

  interface FormItem {
    title?: string
    label: string
    value: string
    description?: string
    required?: boolean
    component: FormComponent
    props?: Props
    request?: () => Promise<any>
    on?: {
      [key: string]: (data: any) => void
    }
    hide?: boolean
    cols?: {
      cols?: number | string
      xs?: number | string
      sm?: number | string
      md?: number | string
      lg?: number | string
    }
  }

  interface FormDialog {
    title: any
    description?: string
    value?: any
    form?: {
      value: any,
      inputs: FormItem[]
    }
    submit?: (data: any) => void,
    submitText?: string,
    cancel?: () => void
  }

  interface Breadcrumb {
    title: string | ComputedRef
    disabled?: boolean
    active?: boolean
    name?: string | ComputedRef,
    to: RouteLocationRaw
  }

  interface Scope {
    id: string
    name: string
    slug: string
  }

  interface ScopeCategory {
    id: string,
    name: string,
    scopes: Scope[] | string[]
  }

  interface User {
    id: number
    name: string
    email: string
    email_verified_at?: string | null
    first_login?: boolean
    tenant_id: string | null
    created_at: string
    updated_at: string
    scopes_count: number
    slugs: string[],
    role_id?: number | null,
    role: Omit<Role, 'level' | 'is_default', 'users'>
    tenants?: Tenant[]
    password?: string
  }

  interface DrawerItem {
    icon: string
    title: string
    route: any,
    items?: DrawerItem[]
    acl?: string,
    onlyMobile?: boolean
  }
}
