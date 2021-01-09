/* eslint-disable @typescript-eslint/ban-types */
import { computed, onUpdated, ref } from 'vue-demi';

import { useIncognitus } from '@/useIncognitus';

type Props = {
  hidden: BooleanConstructor;
  flag: {
    type: StringConstructor;
    required: true;
  };
};

declare type Prop<T, D = T> = PropOptions<T, D> | PropType<T>;
declare type DefaultFactory<T> = () => T | null | undefined;
interface PropOptions<T = any, D = T> {
  type?: PropType<T> | true | null;
  required?: boolean;
  default?: D | DefaultFactory<D> | null | undefined | object;
  // eslint-disable-next-line no-unused-vars
  validator?(value: unknown): boolean;
}
declare type PropType<T> = PropConstructor<T> | PropConstructor<T>[];
declare type PropConstructor<T> =
  | {
      // eslint-disable-next-line no-unused-vars
      new (...args: any[]): T & object;
    }
  | {
      (): T;
    }
  | {
      // eslint-disable-next-line no-unused-vars
      new (...args: string[]): Function;
    };
declare type RequiredKeys<T> = {
  [K in keyof T]: T[K] extends
    | {
        required: true;
      }
    | {
        default: any;
      }
    ? K
    : never;
}[keyof T];
declare type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;
declare type ExtractFunctionPropType<
  T extends Function,
  TArgs extends Array<any> = any[],
  TResult = any
  // eslint-disable-next-line no-unused-vars
> = T extends (...args: TArgs) => TResult ? T : never;
declare type ExtractCorrectPropType<T> = T extends Function
  ? ExtractFunctionPropType<T>
  : Exclude<T, Function>;
declare type InferPropType<T> = T extends null
  ? any
  : T extends {
      type: null | true;
    }
  ? any
  : T extends
      | ObjectConstructor
      | {
          type: ObjectConstructor;
        }
  ? Record<string, any>
  : T extends
      | BooleanConstructor
      | {
          type: BooleanConstructor;
        }
  ? boolean
  : T extends FunctionConstructor
  ? Function
  : T extends Prop<infer V, infer D>
  ? unknown extends V
    ? D
    : ExtractCorrectPropType<V>
  : T;
declare type ExtractPropTypes<O> = O extends object
  ? {
      [K in RequiredKeys<O>]: InferPropType<O[K]>;
    } &
      {
        [K in OptionalKeys<O>]?: InferPropType<O[K]>;
      }
  : {
      // eslint-disable-next-line no-unused-vars
      [K in string]: any;
    };

export const props: Props = {
  hidden: Boolean,
  flag: {
    type: String,
    required: true,
  },
};

export const setup = (props: ExtractPropTypes<Props>) => {
  const enabled = ref<boolean | null>(null);

  const { service, isReady } = useIncognitus();
  const isLoading = computed(() => enabled.value === null);

  onUpdated(async () => {
    if (!isReady || !service.value) {
      return;
    }

    if (!props.hidden) {
      const res = await service.value.isEnabled(props.flag);
      enabled.value = res;
    } else {
      const res = await service.value.isDisabled(props.flag);
      enabled.value = res;
    }
  });

  return {
    enabled,
    isLoading,
    isReady,
  };
};
