
export function getNationality() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const items = [
                {
                    "ds_nacionalidade": "Brasileira",
                    "cd_nacionalidade": 199
                },
                {
                    "ds_nacionalidade": "Alemã",
                    "cd_nacionalidade": 878
                },
                {
                    "ds_nacionalidade": "Chinesa",
                    "cd_nacionalidade": 620
                },
                {
                    "ds_nacionalidade": "Inglesa",
                    "cd_nacionalidade": 97
                },
                {
                    "ds_nacionalidade": "Italiana",
                    "cd_nacionalidade": 312
                },
                {
                    "ds_nacionalidade": "Angolana",
                    "cd_nacionalidade": 130
                },
                {
                    "ds_nacionalidade": "Apátrida",
                    "cd_nacionalidade": 122
                },
                {
                    "ds_nacionalidade": "Argelina",
                    "cd_nacionalidade": 735
                },
                {
                    "ds_nacionalidade": "Argentina",
                    "cd_nacionalidade": 602
                },
                {
                    "ds_nacionalidade": "Armênia",
                    "cd_nacionalidade": 0
                },
                {
                    "ds_nacionalidade": "Australiana",
                    "cd_nacionalidade": 706
                },
                {
                    "ds_nacionalidade": "Austríaca",
                    "cd_nacionalidade": 846
                }
            ]

            return res({
                data: items
            })
        }, 2000)
    })
}


export function getReligion() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const items = [
                {
                    "ds_religiao": "Budista",
                    "cd_religiao": 920
                },
                {
                    "ds_religiao": "Candomblé",
                    "cd_religiao": 968
                },
                {
                    "ds_religiao": "Católica",
                    "cd_religiao": 420
                },
                {
                    "ds_religiao": "Espírita",
                    "cd_religiao": 178
                },
                {
                    "ds_religiao": "Evangélica",
                    "cd_religiao": 991
                },
                {
                    "ds_religiao": "Islâmica",
                    "cd_religiao": 192
                },
                {
                    "ds_religiao": "Judaica",
                    "cd_religiao": 404
                },
                {
                    "ds_religiao": "Luterana",
                    "cd_religiao": 713
                },
                {
                    "ds_religiao": "Messiânica",
                    "cd_religiao": 899
                },
                {
                    "ds_religiao": "Metodista",
                    "cd_religiao": 158
                },
                {
                    "ds_religiao": "Mórmon",
                    "cd_religiao": 417
                },
                {
                    "ds_religiao": "Não desejo informar",
                    "cd_religiao": 4
                },
                {
                    "ds_religiao": "Ortodoxa",
                    "cd_religiao": 212
                },
                {
                    "ds_religiao": "Outra",
                    "cd_religiao": 299
                },
                {
                    "ds_religiao": "Sem Religião",
                    "cd_religiao": 751
                },
                {
                    "ds_religiao": "Testemunha de Jeová",
                    "cd_religiao": 39
                },
                {
                    "ds_religiao": "Umbanda",
                    "cd_religiao": 22
                }
            ]

            return res({
                data: items
            })
        }, 2000)
    })
}

export function getMaritalStatus() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const items = [
                {
                    "ds_valor_dominio": "Casado",
                    "vl_dominio": 490
                },
                {
                    "ds_valor_dominio": "Divorciado",
                    "vl_dominio": 932
                },
                {
                    "ds_valor_dominio": "Solteiro",
                    "vl_dominio": 22
                },
                {
                    "ds_valor_dominio": "Concubinato/União Estável",
                    "vl_dominio": 615
                },
                {
                    "ds_valor_dominio": "Desquitado",
                    "vl_dominio": 929
                },
                {
                    "ds_valor_dominio": "Outros",
                    "vl_dominio": 322
                },
                {
                    "ds_valor_dominio": "Separado",
                    "vl_dominio": 230
                },
                {
                    "ds_valor_dominio": "União Estavel",
                    "vl_dominio": 968
                },
                {
                    "ds_valor_dominio": "Viúvo",
                    "vl_dominio": 113
                }
            ]
            return res({
                data: items
            })
        }, 2000)
    })
}

export function getGender() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const items = [
                {
                    "ds_genero": "Mulher Transgênero",
                    "nr_sequencia": 895
                },
                {
                    "ds_genero": "Cisgênero",
                    "nr_sequencia": 910
                },
                {
                    "ds_genero": "Travesti",
                    "nr_sequencia": 634
                },
                {
                    "ds_genero": "Homem Transgênero",
                    "nr_sequencia": 11
                },
                {
                    "ds_genero": "Não-Binárie",
                    "nr_sequencia": 238
                },
                {
                    "ds_genero": "Outros",
                    "nr_sequencia": 996
                }
            ]

            return res({
                data: items
            })
        }, 2000)
    })
}