const { withGradleProperties } = require("@expo/config-plugins");

const ANDROID_SDK_PROPS = {
  "android.compileSdkVersion": "36",
  "android.targetSdkVersion": "36",
  "android.minSdkVersion": "24",
  "android.ndkVersion": "27.0.12077973",
};

const withAndroidSdkVersions = (config) => {
  return withGradleProperties(config, (config) => {
    for (const [key, value] of Object.entries(ANDROID_SDK_PROPS)) {
      const existing = config.modResults.find((p) => p.key === key);
      if (existing) {
        existing.value = value;
      } else {
        config.modResults.push({ type: "property", key, value });
      }
    }
    return config;
  });
};

module.exports = withAndroidSdkVersions;