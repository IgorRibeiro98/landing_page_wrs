const screenFieldsMap: { [key in ScreenComponent]: any } = {
  PersonalDataForm: {
    cpf: {
      component: 'VTextField',
      cols: {
        cols: 12,
        md: 4,
      },
      props: {

      },
    },
    name: {
      component: 'VTextField',
      cols: {
        cols: 12,
        md: 4,
      },
      props: {

      },
    },
    social_name: {
      component: 'VTextField',
      cols: {
        cols: 12,
        md: 4,
      },
      props: {

      },
    },
    sex: {
      component: 'VTextField',
      cols: {
        cols: 12,
        md: 4,
      },
      props: {

      },
    },
    gender: {
      component: 'VTextField',
      cols: {
        cols: 12,
        md: 4,
      },
      props: {

      },
    },
    meretial_status: {
      component: 'VTextField',
      cols: {
        cols: 12,
        md: 4,
      },
      props: {

      },
    },
    nationality: {
      component: 'VTextField',
      cols: {
        cols: 12,
        md: 4,
      },
      props: {

      },
    },
    religion: {
      component: 'VTextField',
      cols: {
        cols: 12,
        md: 4,
      },
      props: {

      },
    },
  },
  Identifier: {

  }
}
// refatorar para tirar o basefield porque dentro do screenTotemField tem o data que é o base field.
export function mapScreenTotemFieldToFormBuilderField(screenComponent: ScreenComponent, screenField: ScreenField, screenTotemField: ScreenTotemField) {
  const baseFieldMap = screenFieldsMap[screenComponent][screenField.slug];
  return Object.assign({}, baseFieldMap, {
    value: screenField.key,
    label: screenField.label,
  }, {
    required: screenTotemField.required,
    order: screenTotemField.order,
    props: {
      disabled: !screenTotemField.editable,
    }
  });
}

export function buildScreenTotemFieldDefault(screenComponent: ScreenComponent, screenField: ScreenField) {
  return mapScreenTotemFieldToFormBuilderField(screenComponent, screenField, {
    editable: 1,
    field_id: screenField.id,
    order: 0,
    required: 1,
    screen_totem_id: 0,
    data: screenField
  });
}

export function buildFormBuilderByScreenFields(screenComponent: ScreenComponent, screenFields: ScreenField[], screenTotemFields: ScreenTotemField[]): Promise<{ data: FormItem[] }> {
  return new Promise(async (res, rej) => {
    try {
      console.log({ screenFields });
      const formItems: FormItem[] = screenFields.map(field => {
        let screenTotemField = screenTotemFields.find((screenTotemField: any) => screenTotemField.slug === field.slug);

        if (!screenTotemField) {
          return buildScreenTotemFieldDefault(screenComponent, field);
        }

        return mapScreenTotemFieldToFormBuilderField(screenComponent, field, screenTotemField);
      });

      return res({
        data: formItems
      })
    } catch (error) {
      console.log({error});
      return rej({
        response: {
          data: {
            message: `Não foi possível construir o formulário`
          }
        }
      })
    }
  })
}
