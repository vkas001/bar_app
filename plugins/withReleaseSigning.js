const { withAppBuildGradle } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

const withReleaseSigning = (config) => {
  config = withAppBuildGradle(config, (config) => {
    const propsPath = path.resolve(__dirname, "..", "keystore.properties");

    if (!fs.existsSync(propsPath)) {
      console.warn(
        "keystore.properties not found, skipping release signing config",
      );
      return config;
    }

    const props = fs
      .readFileSync(propsPath, "utf8")
      .split("\n")
      .filter(Boolean)
      .reduce((acc, line) => {
        const [key, value] = line.split("=");
        acc[key.trim()] = value.trim();
        return acc;
      }, {});

    let contents = config.modResults.contents;

    contents = contents.replace(
      /signingConfigs\s*{/,
      `signingConfigs {
        release {
            storeFile file("${props.BARAPP_RELEASE_STORE_FILE}")
            storePassword "${props.BARAPP_RELEASE_STORE_PASSWORD}"
            keyAlias "${props.BARAPP_RELEASE_KEY_ALIAS}"
            keyPassword "${props.BARAPP_RELEASE_KEY_PASSWORD}"
        }`,
    );

    contents = contents.replace(
      /(buildTypes\s*{[\s\S]*?release\s*{[\s\S]*?)signingConfig signingConfigs\.debug/,
      `$1signingConfig signingConfigs.release`,
    );

    config.modResults.contents = contents;
    return config;
  });

  return config;
};

module.exports = withReleaseSigning;

// build the release APK
// cd android
// .\gradlew.bat assembleRelease

// build the release AAB
// cd android
// .\gradlew.bat bundleRelease

// auto versioning
// npm run tv:bundle:release 