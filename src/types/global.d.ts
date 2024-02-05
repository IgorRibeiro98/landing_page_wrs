interface Screens {
    id: number;
    name: string;
    component: string
}

interface Queue {
    id: number;
    name: string;
    description: string | null;
    icon: string;
    color: string;
    action: string;
    to: string;
}

interface Totem {
    id: number;
    name: string;
    description: string | null;
    screens: Screens[];
    queues: Queue[]
}

