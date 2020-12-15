import {
  DirectiveOptions,
  DirectiveBinding as DirectiveBinding2,
} from 'vue/types/options';
import {
  Directive,
  DirectiveBinding as DirectiveBinding3,
} from '@vue/runtime-core';
import { IncognitusService } from '@incognitus/client-web-core';

const checkFlag = async (
  flagName: string,
  hidden: boolean,
): Promise<boolean> => {
  const svc = IncognitusService.instance;

  const featureCheck = !hidden ? svc.isEnabled : svc.isDisabled;

  return await featureCheck(flagName);
};

const directive = async (
  el: HTMLElement,
  binding: DirectiveBinding2 | DirectiveBinding3,
) => {
  const feature = binding.value;
  const hidden = (binding.arg || '').toLowerCase() === 'hidden';

  if (!feature) {
    console.error('[Incognitus] Flag name is required');
    if (!hidden) {
      el.remove();
    }
    return;
  }

  const status = await checkFlag(feature, hidden);
  if (!status) {
    el.remove();
  }
};

export const FeatureFlagDirective3: Directive<HTMLElement> = {
  beforeMount: directive,
};

export const FeatureFlagDirective2: DirectiveOptions = {
  bind: directive,
};
