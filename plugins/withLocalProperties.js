const { withDangerousMod } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

const ANDROID_SDK_PATH = "C:\\Users\\Vkas\\AppData\\Local\\Android\\Sdk";

const withLocalProperties = (config) => {
  return withDangerousMod(config, ["android", async (config) => {
    const file = path.join(
      config.modRequest.platformProjectRoot,
      "local.properties",
    );
    const content = `sdk.dir=${ANDROID_SDK_PATH.replace(/\\/g, "\\\\")}\n`;
    fs.writeFileSync(file, content);
    return config;
  }]);
};

module.exports = withLocalProperties;