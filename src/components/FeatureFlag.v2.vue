<template>
  <div v-frag>
    <slot v-if="!isReady || isLoading" name="loading"></slot>
    <slot v-else-if="enabled" name="enabled"></slot>
    <slot v-else name="disabled"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi';
import frag from 'vue-frag';

import { props, setup } from './FeatureFlag.common';

export default defineComponent({
  props,
  directives: { frag },
  setup,
});
</script>
