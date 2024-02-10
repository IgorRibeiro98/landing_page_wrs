
export function getUF() {
    return new Promise((res => {
        const items = [
            {
                "ds_valor_dominio": "Acre",
                "vl_dominio": 902
            },
            {
                "ds_valor_dominio": "Alagoas",
                "vl_dominio": 683
            },
            {
                "ds_valor_dominio": "Amapá",
                "vl_dominio": 832
            },
            {
                "ds_valor_dominio": "Amazonas",
                "vl_dominio": 746
            },
            {
                "ds_valor_dominio": "Bahia",
                "vl_dominio": 508
            },
            {
                "ds_valor_dominio": "Ceará",
                "vl_dominio": 796
            },
            {
                "ds_valor_dominio": "Distrito Federal",
                "vl_dominio": 657
            },
            {
                "ds_valor_dominio": "Distrito Federal",
                "vl_dominio": 105
            },
            {
                "ds_valor_dominio": "Espirito Santo",
                "vl_dominio": 538
            },
            {
                "ds_valor_dominio": "Goiás",
                "vl_dominio": 855
            },
            {
                "ds_valor_dominio": "Maranhão",
                "vl_dominio": 564
            },
            {
                "ds_valor_dominio": "Mato Grosso",
                "vl_dominio": 513
            },
            {
                "ds_valor_dominio": "Mato Grosso do Sul",
                "vl_dominio": 718
            },
            {
                "ds_valor_dominio": "Minas Gerais",
                "vl_dominio": 783
            },
            {
                "ds_valor_dominio": "Outros (Internacional)",
                "vl_dominio": 791
            },
            {
                "ds_valor_dominio": "Paraiba",
                "vl_dominio": 431
            },
            {
                "ds_valor_dominio": "Paraná",
                "vl_dominio": 456
            },
            {
                "ds_valor_dominio": "Pará",
                "vl_dominio": 835
            },
            {
                "ds_valor_dominio": "Pernambuco",
                "vl_dominio": 444
            },
            {
                "ds_valor_dominio": "Piauí",
                "vl_dominio": 562
            },
            {
                "ds_valor_dominio": "Rio Grande do Norte",
                "vl_dominio": 522
            },
            {
                "ds_valor_dominio": "Rio Grande do Sul",
                "vl_dominio": 325
            },
            {
                "ds_valor_dominio": "Rio de Janeiro",
                "vl_dominio": 430
            },
            {
                "ds_valor_dominio": "Rondonia",
                "vl_dominio": 111
            },
            {
                "ds_valor_dominio": "Roraima",
                "vl_dominio": 742
            },
            {
                "ds_valor_dominio": "Santa Catarina",
                "vl_dominio": 769
            },
            {
                "ds_valor_dominio": "Sergipe",
                "vl_dominio": 251
            },
            {
                "ds_valor_dominio": "São Paulo",
                "vl_dominio": 214
            },
            {
                "ds_valor_dominio": "Tocantins",
                "vl_dominio": 951
            }
        ]

        res({ data: items })
    }))
}

export function findCEP(cep: string): Promise<any> {
    return new Promise((res) => {
        setTimeout(() => {
            const item = {
                "ds_log": "Avenida Brasil",
                "ds_loc": "São Paulo",
                "ds_uf": "SP",
                "ds_bairro": "Jardim São Paulo"
            }

            res({ data: item })
        }, 1000)
    })
}