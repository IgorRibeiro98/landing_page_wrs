export const totem = {
    id: 0,
    name: '',
    site_id: 0,
    description: null,
    screens: [],
    queues: []
}

export const data = {
    identifier: {
        id: '',
        generic_id: '',
        first_name: '',
        birth_date: ''
    },
    password_send_type: 'print',
    queue: {
        id: 0,
        name: '',
        description: '',
        icon_src: '',
        status: '',
        created_at: '',
        updated_at: '',
    },
    patient: {
        cd_pessoa_fisica: '',
        nm_pessoa_fisica: '',
        nm_social: null,
        nm_social_int: null,
        dt_nascimento: "",
        ie_sexo: "",
        nr_seq_genero: null,
        nr_identidade: "",
        nr_cpf: "",
        cd_nacionalidade: 0,
        nr_passaporte: null,
        nr_reg_geral_estrang: null,
        ie_estado_civil: 0,
        nr_ddi_telefone: null,
        nr_ddd_telefone: null,
        nr_telefone: null,
        nr_ddd_celular: "",
        nr_ddi_celular: "",
        nr_telefone_celular: "",
        ds_email: "",
        cd_religiao: 0,
        ie_tipo_complemento: 0,
        tipo_endereco: "",
        ds_endereco: "",
        nr_endereco: 0,
        ds_complemento: "",
        cd_cep: "",
        ds_municipio: "",
        sg_estado: '',
        cd_estado: 0,
        agendamentos: []
    },
    password: {
        ds_senha: '',
        dt_entrada: '',
    }
}

export default {
    totem,
    data
}
