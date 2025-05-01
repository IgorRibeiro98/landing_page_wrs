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

  interface DrawerItem {
    icon: string
    title: string
    route: any,
    items?: DrawerItem[]
    onlyMobile?: boolean
  }

  interface InfoData {
    title: string
    description: string
    icon: string
    img?: any
  }
}
