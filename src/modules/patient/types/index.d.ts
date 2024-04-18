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
export interface Schedule {
  id: string;
  date: string;
  doctor: {
    id: string;
    name: string
  },
  specialty: {
    id: string;
    name: string
  },
  conventant: {
    id: string;
    name: string
  }
}

interface Patient {
    id: string;
    first_name: string;
    phone_hint: string;
    has_face_recognition: boolean;
    schedules: Schedule[]
}

export interface Data {
    internal: {
      identifier?: string;
    },
    patient?: Patient
    queue?: QueueTotem
    code?: string
}

