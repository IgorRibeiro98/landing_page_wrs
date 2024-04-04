interface ConfirmAction {
    type: 'confirm';
    label: string
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