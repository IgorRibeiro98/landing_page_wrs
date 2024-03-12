import { computed } from "vue";

type Emit = (event: string | any, ...args: any[]) => void;
type Props = Record<string, any>;

export function reactiveProp(props: Props, name: string, emit: Emit) {
  return computed({
    get: () => props[name],
    set: (value) => {
      emit(`update:${name}`, value);
    }
  })
}

export class ReactiveProps {
  private props: Props;
  private emit: Emit;

  constructor(props: Props, emit: Emit) {
    this.props = props;
    this.emit = emit;
  }

  create(name: string) {
    return reactiveProp(this.props, name, this.emit);
  }

  many(names: string[]) {
    return names.map((name) => this.create(name));
  }
}
