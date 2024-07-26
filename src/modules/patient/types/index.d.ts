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
  schedule_sequence: string;
  procedure_type: string;
  schedule_date: string;
  establishment_code: string;
  establishment_description: string;
  patient_code: string;
  agreement_code: string;
  agreement_description: string;
  category_code: string;
  category_description: string;
  plan_code: string;
  plan_description: string;
  product_code: string;
  product_description: string;
  card_number: string;
  card_validity: string;
  card_digit: string;
  doctor_code: string;
  doctor_name: string;
  crm: string;
  council_state: string;
  specialty_code: string;
  specialty_description: string;
  procedure_code: string;
  procedure_origin: string;
  duration: string;
  location_description: string;
  requires_authorization: number;
  schedule_sector_code: string;
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
    current_schedule_count: number;
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

