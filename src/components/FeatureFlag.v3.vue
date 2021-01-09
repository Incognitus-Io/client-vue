<template>
  <slot v-if="!isReady || isLoading" name="loading"></slot>
  <slot v-else-if="enabled" name="enabled"></slot>
  <slot v-else name="disabled"></slot>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi';

import { props, setup } from './FeatureFlag.common';

export default defineComponent({
  props,
  setup,
});
</script>
