
const scheduleDate = new Date()

scheduleDate.setHours(scheduleDate.getHours() + 1)

const patients: any = {
    '46518973800': {
        cd_pessoa_fisica: '1235',
        prim_nm_pessoa_fisica: 'Luiz',
        dt_nascimento: '02/03/1997',
        nm_pessoa_fisica: 'Luiz Silva',
        nm_social: null,
        nm_social_int: null,
        ie_sexo: "M",
        nr_seq_genero: null,
        nr_identidade: "2903040400",
        nr_cpf: "46518973800",
        cd_nacionalidade: 199,
        nr_passaporte: null,
        nr_reg_geral_estrang: null,
        ie_estado_civil: 490,
        nr_ddi_telefone: null,
        nr_ddd_telefone: "0",
        nr_telefone: null,
        nr_ddd_celular: "11",
        nr_ddi_celular: "55",
        nr_telefone_celular: "947010101",
        ds_email: "asdas@gmail.com",
        cd_religiao: 4,
        ie_tipo_complemento: 1,
        tipo_endereco: "Residencial",
        ds_endereco: "Avenida BLA BLA",
        nr_endereco: 1174,
        ds_complemento: "bla bla",
        cd_cep: "096311111",
        ds_municipio: "São Caetano do Sul",
        cd_estado: 214,
        agendamentos: [
            {
                nr_sequencia: 56434467,
                cd_usuario_convenio: "88888459653390018",
                cd_pessoa_fisica: "1697706",
                ds_endereco: "Rua São Joaquim, 94 - Liberdade / São Paulo-SP | Bloco D - 3º Andar",
                cd_convenio: 136,
                ds_convenio: "Sul América ",
                cd_categoria: 20,
                ds_categoria: "Especial Coletivo (Acesso,Exato,Exato500,Compac,GM Enf, Mega ,Básico,DN,SeletoI)",
                cd_plano: 28,
                ds_plano: "Exato",
                cd_produto: 204,
                ds_produto: "515",
                nr_dig_carteirinha: 17,
                ds_especialidade: "Gastroenterologia",
                registro_caso: "CR - Telefone",
                cd_medico: "1170729",
                medico: "Carlos Augusto Canteras Da Camara",
                crm: "149119",
                uf_conselho: "CRM-SP",
                ie_status_agenda: "N",
                cd_agenda: 5390,
                agendado_para: scheduleDate,
                duracao: 15,
                cd_tipo_agenda: 3,
                tp_agenda: "Consultas",
                procedimento: "Consulta Com Gastroenterologista",
                cd_setor_agenda: 87593,
                nm_estabelecimento: "Hospital Vergueiro",
                nm_pessoa_fisica: "Snouvn Kubpr Qnqn",
                nr_cpf: "13563956944",
                nr_seq_proc_interno: "204200",
            }
        ]
    },
    '46518973803': {
        cd_pessoa_fisica: '1234',
        prim_nm_pessoa_fisica: 'João',
        dt_nascimento: '02/03/1997',
        nm_pessoa_fisica: 'João Apostulo Neto',
        nm_social: null,
        nm_social_int: null,
        ie_sexo: "M",
        nr_seq_genero: null,
        nr_identidade: "2903040400",
        nr_cpf: "46518973800",
        cd_nacionalidade: 199,
        nr_passaporte: null,
        nr_reg_geral_estrang: null,
        ie_estado_civil: 490,
        nr_ddi_telefone: null,
        nr_ddd_telefone: "0",
        nr_telefone: null,
        nr_ddd_celular: "11",
        nr_ddi_celular: "55",
        nr_telefone_celular: "947010101",
        ds_email: "asdas@gmail.com",
        cd_religiao: 4,
        ie_tipo_complemento: 1,
        tipo_endereco: "Residencial",
        ds_endereco: "Avenida BLA BLA",
        nr_endereco: 1174,
        ds_complemento: "bla bla",
        cd_cep: "096311111",
        ds_municipio: "São Caetano do Sul",
        cd_estado: 214,
    },
}

export function findByIdentifier(identifier: any) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const cpfs = ['46518973800', '46518973803']

            if (!cpfs.includes(identifier)) return rej({
                response: {
                    data: {
                        message: `Paciente ${identifier} não foi encontrado`
                    }
                }
            })

            const patient: any = patients[identifier]

            return res({
                data: patient
            })
        }, 2000)
    })
}

export function validPatientByBirth(identifier: string, birth: string) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const patient = Object.values(patients).find((item: any) => {
                return item.cd_pessoa_fisica == identifier && item.dt_nascimento == birth
            })

            if (!patient) return rej({
                response: {
                    data: {
                        message: `Não foi possível prosseguir com o atendimento`
                    }
                }
            })

            return res({
                data: patient
            })
        }, 2000)
    })
}

export function updatePatient(patient: any) {
    return new Promise((res, rej) => {
        setTimeout(() => {

            if (!patient) return rej({
                response: {
                    data: {
                        message: `Não foi possível atualizar o paciente`
                    }
                }
            })


            return res({
                data: patient
            })
        }, 1000)
    })
}
