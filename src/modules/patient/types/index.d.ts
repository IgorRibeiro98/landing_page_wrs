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

interface Schedule {
    date: string;
    specialty: {
        id: string;
        name: string
    },
    doctor: {
        id: string;
        name: string
    }
}

interface Patient {
    id: string;
    first_name: string;
    schedules: Schedule[]
}

export interface Data {
    patient?: Patient
    queue?: QueueTotem
}

// id: '00000',
// first_name: 'Mariana',
// schedules: [
//     {
//         date: new Date((new Date()).setDate((new Date().getDate() +2))).toLocaleString(),
//         specialty: {
//             id: '12345',
//             name: 'Ortopedia'
//         },
//         doctor: {
//             id: '123456',
//             name: 'Carla Souza'
//         }
//     },
//     {
//         date: new Date((new Date()).setDate((new Date().getDate() +3))).toLocaleString(),
//         specialty: {
//             id: '12345',
//             name: 'Ginecologia'
//         },
//         doctor: {
//             id: '123456',
//             name: 'João Paulo'
//         }
//     },
// ]