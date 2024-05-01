import { ComputedRef } from 'vue';
import { type RouteLocationRaw } from 'vue-router';
import type { ThemeDefinition } from 'vuetify/lib/framework.mjs';

declare global {
  type ScreenComponent = 'Identifier' | 'Schedule' | 'Signature' | 'Queues' | 'Loading'

  interface Window {
    api: {
      print({ value: string, site: string })
    }
  }

  interface ScreenField {
    id: number
    slug: string
    key: string
    description: string
    group_id: number,
    label: string
    updated_at: string
    created_at: string
  }

  interface Screens {
    id: number;
    name: string;
    component: ScreenComponent,
    description?: string
    fields: ScreenField[]
    traits: any[]
    subscreens: SubScreen[]
  }

  interface SubScreen extends Screens {
    order: number
  }

  type SendType = 'password' | 'print' | 'sms' | 'qrcode'

  interface Data {
    identifier: {
      id: string;
      generic_id: string;
      first_name: string
      birth_date: string;
    },
    password_send_type: string;
    password: Password;

    patient?: PatientIdentifier;
    queue?: QueueTotem;
    ticket?: Ticket
  }

  interface Ticket {
    value: string;
    site: string;
  }
  // interface Queue {
  //     id: number;
  //     name: string;
  //     description: string;
  //     icon: string;
  //     color: string;
  //     nr_seq_fila_comum: string;
  //     nr_seq_fila_preferencial: string;
  //     nr_seq_fila_preferencial_80: string;
  //     [key: string]: any;
  // }
  interface ScreenTotem {
    data: Screens
    fields: ScreenTotemField[]
    traits: ScreenTotemTrait[]
    id: number
    order: number
    screen_id: number
    totem_id: number
  }
  interface ScreenTotemField {
    editable: number,
    field_id: number,
    order: number,
    required: number,
    screen_totem_id: number,
    data: ScreenField
  }

  interface ScreenTotemTrait {
    enabled: number
    screen_totem_id: number
    trait_id: number
    data: Trait
  }

  interface ScreenTrait {
    component: string
    created_at: string
    updated_at: string
    description: string
    id: number
    slug: string
    question_id?: number
  }

  interface Totem {
    id: number;
    name: string;
    description: string | null;
    screens: ScreenTotem[];
    queues: QueueTotem[];
    site: Site
  }

  interface TotemItem {
    id: number;
    name: string;
    description: string | null;
    screens_count: number;
    queues_count: number;
    updated_at: string;
  }

  type TotemList = TotemItem[]

  interface Queue {
    id: number,
    name: string
    description: string | null,
    icon_src: string,
    status: string | null,
    created_at: string,
    updated_at: string
  }

  type QueueList = Queue[]

  interface NewQueue extends Omit<Queue, 'id' | 'created_at' | 'updated_at'> {
  }

  interface Site {
    cd_estabelecimento;
    ds_estabelecimento;
  }

  interface Agendamento {
    nr_sequencia: number;
    cd_usuario_convenio: string;
    cd_pessoa_fisica: string;
    ds_endereco: string;
    cd_convenio: number;
    ds_convenio: string;
    cd_categoria: number;
    ds_categoria: string;
    cd_plano: number;
    ds_plano: string;
    cd_produto: number;
    ds_produto: string;
    nr_dig_carteirinha: number;
    ds_especialidade: string;
    registro_caso: string;
    cd_medico: string;
    medico: string;
    crm: string;
    uf_conselho: string;
    ie_status_agenda: string;
    cd_agenda: number;
    agendado_para: string;
    duracao: number;
    cd_tipo_agenda: number;
    tp_agenda: string;
    procedimento: string;
    cd_setor_agenda: number;
    nm_estabelecimento: string;
    nm_pessoa_fisica: string;
    nr_cpf: string;
    nr_seq_proc_interno: string;
  }

  interface PatientIdentifier {
    id: string;
    first_name: string;
  }

  interface Patient {
    cd_pessoa_fisica: string;
    dt_nascimento: string;
    nm_pessoa_fisica: string;
    nm_social: string | null;
    nm_social_int: string | null;
    ie_sexo: string;
    nr_seq_genero: number | null;
    nr_identidade: string;
    nr_cpf: string;
    cd_nacionalidade: number;
    nr_passaporte: string | null;
    nr_reg_geral_estrang: string | null;
    ie_estado_civil: number;
    nr_ddi_telefone: string | null;
    nr_ddd_telefone: string | null;
    nr_telefone: string | null;
    nr_ddd_celular: string;
    nr_ddi_celular: string;
    nr_telefone_celular: string;
    ds_email: string;
    cd_religiao: number;
    ie_tipo_complemento: number;
    tipo_endereco: string;
    ds_endereco: string;
    nr_endereco: number | null;
    ds_complemento: string | null;
    cd_cep: string;
    ds_municipio: string;
    cd_estado: number;
    sg_estado: string;
    agendamentos: Agendamento[];
    aberturaAtendimento?: Elegibilidade
  }

  interface Atendimento {
    nr_atendimento: number
    nr_prescricao: number
  }

  interface Elegibilidade {
    elegivel: boolean;
    carteirinha: string;
    nr_seq_autor: string
    atendimento: Atendimento
  }

  interface Password {
    ds_senha: string;
    dt_entrada: string;
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
    id: number;
    name: string;
    provider_uri: string;
    logo: string | File;
    theme: ThemeDefinition;
    domain: string;
    updated_at: string;
    created_at: string;
  }

  type FormComponent = 'VAutocomplete' | 'VTextField' | 'VTextarea' | 'VFileInput' | 'RichText' | 'VSwitch'

  interface FormItem {
    title?: string
    label: string
    value: string
    description?: string
    required?: boolean
    component: FormComponent
    props?: any
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

  interface AttendanceTypeData {
    id?: number
    name: string
    icon: string
    description: string | null
    created_at?: string
    updated_at?: string
  }

  interface AttendanceType {
    data: AttendanceTypeData | null
    attendance_type_id: number
    integration_id: string
  }

  interface AttendanceHour {
    end_time: string
    start_time: string
    weekday_iso: number
  }

  interface QueueTotem {
    attendance_types: AttendanceType[];
    attendance_hours: AttendanceHour[];
    off_hours_message: string;
    data?: Queue;
    form: {
      value: boolean;
    };
  }

  interface Scope {
    id: string
    name: string
    slug: string

  }

  interface User {
    id: string
    name: string
    email: string
    email_verified_at?: string | null
    tenant_id: string
    created_at: string
    updated_at: string
    scopes_count: number
    scopes: Scope[]
  }
}
