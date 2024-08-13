interface ConfirmAction {
  type: 'confirm';
  label: string;
  callback?: CallableFunction;
}

interface ChoiseAction {
  type: 'choise';
  rejectLabel: string;
  acceptLabel: string;
  callback(choise: boolean): void;
}

type Action = ConfirmAction | ChoiseAction;

export interface AlertProps {
  title: string;
  action: Action;
  text: Error | string
}

export interface LoadingProps {
  text: string;
  callback(loading: Ref<boolean>): void
}

export interface AppointmentSchedule {
  schedule_id: string,
  schedule_date: string,
  establishment_id: string,
  establishment_description: string,
  patient_id: string,
  agreement_id: string,
  agreement_description: string,
  category_id: string,
  category_description: string,
  plan_id: string,
  plan_description: string,
  product_id?: string,
  product_description?: string,
  proc_description?: string,
  card_number: string,
  card_validity?: string,
  card_digit: string,
  doctor_id: string,
  doctor_name: string,
  crm: string,
  council_state: string,
  specialty_id: string,
  specialty_description: string,
  duration: string,
  location_description: string,
  requires_authorization: string,
  schedule_sector_id: string,
}

export interface ExamsSchedule {
  schedule_id: string,
  schedule_date: string,
  establishment_id: string,
  establishment_name: string,
  patient_id: string,
  agreement_id: string,
  agreement_description: string,
  category_id: string,
  category_description: string,
  plan_id: string,
  plan_description: string,
  specialty_description?: string,
  card_number: string,
  doctor_id: string,
  doctor_name: string,
  crm: string,
  council_state: string,
  proc_id: string,
  proc_description: string,
  duration: string,
  location_description: string,
  requires_authorization: string,
  product_description?:string,
  card_validity?:string,
  card_digit?: string,
  side_code?: string,
  product_id?: string,
  schedule_sector_code?: string,
}

export interface PatientData {
  id: string;
  patient_id: string;
  ddi_phone?: string;
  ddd_phone?: string;
  phone_number: string;
  ddi_cellphone?: string;
  ddd_cellphone: string;
  cellphone_number: string;
  email: string;
  address_type_id: string;
  zip_code: string;
  street: string;
  number: string;
  complement: string;
  state_cd: string;
  city: string;

  // campos tratados no front;
  cellphone?: string;
  telephone?: string
}

export interface Patient {
    id: string;
    name: string;
    social_name?: string;
    cpf: string;
    birth: string;
    passport?: string;
    rg: string;
    sex_cd: string;
    nacionality_id: string;
    religion_id: string;
    merital_status_id: string;
    foreigner_id?: string;
    data: PatientData;
    first_name: string;
    current_schedules_count: {
      appointments: number,
      exams: number
    };
    schedules?: {
      appointment: AppointmentSchedule[]
    }
}

export interface Data {
    internal: {
      identifier?: string;
      birthDate?: string;
      faceRecognition?: string;
    },
    challenge?: {
      name: string,
      birthDays: string[]
    },
    patient?: Patient
    queue?: QueueTotem
    code?: string
}

