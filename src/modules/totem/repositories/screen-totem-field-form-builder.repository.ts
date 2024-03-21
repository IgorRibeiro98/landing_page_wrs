//Aqui deverá ficar os mapeamentos dos campos reais que irão para o flow
const screenFieldsMap: Record<ScreenComponent | string, any> = {
}
export function mapScreenTotemFieldToFormBuilderField(screenComponent: ScreenComponent, screenTotemField: ScreenTotemField): FormItem {
  let baseFieldMap = screenFieldsMap[screenComponent] ?? false;
  if (!baseFieldMap) {
    baseFieldMap = {
      component: 'VTextField'
    }
  } else {
    baseFieldMap = baseFieldMap[screenTotemField.data.slug];
  }

  return Object.assign({}, baseFieldMap, {
    value: screenTotemField.data.key,
    label: screenTotemField.data.label,
  }, {
    required: screenTotemField.required,
    order: screenTotemField.order,
    props: {
      disabled: !screenTotemField.editable,
    }
  });
}

export function buildScreenTotemFieldDefault(screenComponent: ScreenComponent, screenField: ScreenField) {
  return mapScreenTotemFieldToFormBuilderField(screenComponent, {
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
      const formItems: FormItem[] = screenFields.map(field => {
        let screenTotemField = screenTotemFields.find((screenTotemField: any) => screenTotemField.slug === field.slug);

        if (!screenTotemField) {
          return buildScreenTotemFieldDefault(screenComponent, field);
        }

        return mapScreenTotemFieldToFormBuilderField(screenComponent, screenTotemField);
      });

      return res({
        data: formItems
      })
    } catch (error) {
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
