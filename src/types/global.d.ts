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
interface ButtonOption {
  title: string;
  id: string;
  subtitle?: T<string> | string;
  color: string;
  action: () => void;
  show: boolean;
}
