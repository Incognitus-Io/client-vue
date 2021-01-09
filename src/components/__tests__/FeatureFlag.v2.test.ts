import { createLocalVue, mount, Wrapper } from '@vue/test-utils';
import { computed, ComputedRef, defineComponent } from '@vue/composition-api';
import {
  IncognitusConfig,
  IncognitusService,
} from '@incognitus/client-web-core';

import FeatureFlag from '../FeatureFlag.v2.vue';
import { useIncognitus } from '@/useIncognitus';

const localVue = createLocalVue();

jest.mock('@/useIncognitus');
jest.mock('@incognitus/client-web-core');

const comp = defineComponent({
  components: {
    FeatureFlag,
  },
  props: {
    hidden: Boolean,
  },
  template: `
  <div>
    <feature-flag flag="'foobar'" :hidden="hidden">
      <template #loading>
        Loading
      </template>
      <template #enabled>
        Enabled
      </template>
      <template #disabled>
        Disabled
      </template>
    </feature-flag>
  </div>
  `,
});

describe('FeatureFlag for vue 2', () => {
  let mockUseIncognitus: jest.Mock<{
    service: ComputedRef<IncognitusService | null>;
    isReady: ComputedRef<boolean>;
  }>;
  let service: IncognitusService;
  let mockIsReady: boolean;

  beforeEach(() => {
    mockUseIncognitus = useIncognitus as jest.Mock;
    service = new IncognitusService({} as IncognitusConfig);
    mockIsReady = false;

    mockUseIncognitus.mockReturnValue({
      service: computed(() => service),
      isReady: computed(() => mockIsReady),
    });
  });

  it('renders the loading slot when service is not ready', async () => {
    const wrapper = mount(comp, { localVue });

    await updateFeatureFlag(wrapper);

    expect(wrapper.text()).toContain('Loading');
  });

  it('renders the loading slot while fetching flag', () => {
    mockIsReady = true;

    const wrapper = mount(comp, { localVue });

    expect(wrapper.text()).toContain('Loading');
  });

  describe('normal mode', () => {
    it('renders enabled when flag is enabled', async () => {
      service.isEnabled = jest.fn().mockResolvedValue(true);
      mockIsReady = true;

      const wrapper = mount(comp, { localVue });
      await updateFeatureFlag(wrapper);

      expect(wrapper.text()).toContain('Enabled');
    });

    it('renders enabled when flag is disabled', async () => {
      service.isEnabled = jest.fn().mockResolvedValue(false);
      mockIsReady = true;

      const wrapper = mount(comp, { localVue });
      await updateFeatureFlag(wrapper);

      expect(wrapper.text()).toContain('Disabled');
    });
  });

  describe('hidden mode', () => {
    it('renders enabled when flag is disabled', async () => {
      service.isDisabled = jest.fn().mockResolvedValue(true);
      mockIsReady = true;

      const wrapper = mount(comp, { localVue, propsData: { hidden: true } });
      await updateFeatureFlag(wrapper);

      expect(wrapper.text()).toContain('Enabled');
    });

    it('renders enabled when flag is enabled', async () => {
      service.isDisabled = jest.fn().mockResolvedValue(false);
      mockIsReady = true;

      const wrapper = mount(comp, { localVue, propsData: { hidden: true } });
      await updateFeatureFlag(wrapper);

      expect(wrapper.text()).toContain('Disabled');
    });
  });
});

const updateFeatureFlag = async (wrapper: Wrapper<Vue>) => {
  const featureFlagWrapper = wrapper.findComponent(FeatureFlag);

  featureFlagWrapper.vm.$forceUpdate();
  await featureFlagWrapper.vm.$nextTick();
  await featureFlagWrapper.vm.$nextTick();
  await featureFlagWrapper.vm.$nextTick();
};
