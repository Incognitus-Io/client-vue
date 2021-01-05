# Incognitus Feature Flag (Vue 2 & 3)

![Continuous Integration](https://github.com/Incognitus-Io/client-vue/workflows/Continuous%20Integration/badge.svg)
[![codecov](https://codecov.io/gh/Incognitus-Io/client-vue/branch/master/graph/badge.svg?token=HJ4XoCv8oZ)](https://codecov.io/gh/Incognitus-Io/client-vue)

## Installing the plugin

Before you're able to use the service you'll need to install the plugin with your tenant and application IDs.

### main.ts

```typescript
import { incognitus } from '@incognitus/client-vue';

Vue.use(incognitus, {
  tenantId: '{your tenant key}',
  applicationId: '{your app id}',
});
```

| Key           | Description               |
| ------------- | ------------------------- |
| tenantId      | Your tenant id            |
| applicationId | The id of the application |

## Checking features

### Component

You can use the included component to check feature flags. This is transparent and will not add an extra depth in the
DOM. Using slots, you can configure different aspects like the loading state, or if the flag is enabled/disabled.

```html
<template>
  <feature-flag flag="feature name">
    <template #loading> Checking features </template>
    <template #enabled> Something behind the flag </template>
    <template #disabled> The old implementation </template>
  </feature-flag>
</template>
```

#### Props

| Prop   | Description                           |
| ------ | ------------------------------------- |
| flag   | The name of the feature flag          |
| hidden | Hide content when the flag is enabled |

#### Slots

| Slot     | Description                              |
| -------- | ---------------------------------------- |
| loading  | Displayed when fetching the feature flag |
| enabled  | Rendered when the flag is enabled        |
| disabled | Rendered when the flag is disabled       |

### Composition API hook

If you would like to interact with the service directly, then it can be accessed through the `useIncognitus` hook.
This returns `isReady` which returns `true` when the service is initiatlized and ready to be used, and `service`
which returns the raw service

#### Service methods

| Method                          | Description                                                 |
| ------------------------------- | ----------------------------------------------------------- |
| service.isEnabled(featureName)  | Checks if the flag is enabled                               |
| service.isDisabled(featureName) | Check if the flag is disabled                               |
| service.getFeature(featureName) | Fetches the feature from the server and returns it's status |
| service.getAllFeatures()        | Fetches all features and stores them in the cache           |

### Service

You can also use the service directly by importing `IncognitusService.instance`, however this is not recommended.

## Caching

Currently all known feature flags are cached when the app initializes. New features that are not found
in the cache are retrieved on-demand. The cache stays in place until the app is reloaded or by calling the `getAllFeatures()` method on the service.
