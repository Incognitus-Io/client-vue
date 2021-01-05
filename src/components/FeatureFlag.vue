<template>
  <div v-frag>
    <slot v-if="!isReady || isLoading" name="loading"></slot>
    <slot v-else-if="enabled" name="enabled"></slot>
    <slot v-else name="disabled"></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onUpdated, ref } from 'vue-demi';
import frag from 'vue-frag';

import { useIncognitus } from '@/hooks/useIncognitus';

export default defineComponent({
  props: {
    hidden: Boolean,
    flag: {
      type: String,
      required: true,
    },
  },
  directives: { frag },
  setup: (props) => {
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
  },
});
</script>
