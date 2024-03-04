import {type Component} from 'vue';

export const components: Record<string, Component>  = {};

const modules: Record<string, any> = import.meta.glob(
  "@patient/views/totem/*.vue",
  { eager: true }
);

for (const path in modules) {
  const componentRegexName = path.match(/([A-Z])\w+/g);

  if (componentRegexName)
    components[`${componentRegexName[0]}`] = modules[path].default;
}

