

export function findByIdentifier(identifier: string) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (identifier != '46518973800') return rej({
                response: {
                    data: {
                        message: `Paciente ${identifier} não foi encontrado`
                    }
                }
            })

            const patient = {
                cd_pessoa_fisica: "1303467",
                prim_nm_pessoa_fisica: "Joao",
            }

            return res({
                data: patient
            })
        }, 2000)
    })
}

export function validPatientByBirth(identifier: string, birth: string) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (identifier != '1303467' || birth != '02/03/1997') return rej({
                response: {
                    data: {
                        message: `Não foi possível prosseguir com o atendimento`
                    }
                }
            })

            const patient = {
                prim_nm_pessoa_fisica: 'João',
                cd_pessoa_fisica: '123456',
                nm_pessoa_fisica: 'João Apostulo Neto',
                nm_social: null,
                nm_social_int: null,
                dt_nascimento: "1997-03-02",
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
                agendamentos: []
            }

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
        }, 2000)
    })
}
