const Encore = require("@symfony/webpack-encore");

const sourcePath = "./src";

const outPath = "../public/build";
const publicPath = "/build";

const mainPath = sourcePath + "/main.js";

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || "dev");
}

Encore.disableSingleRuntimeChunk()
  .setOutputPath(outPath)
  .setPublicPath(publicPath)
  .addEntry("main", mainPath)
  .configureBabel(() => ({
    presets: ["@vue/app"],
  }))
  .enableVueLoader(() => {}, { runtimeCompilerBuild: true })
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(Encore.isDev())
  .enableVersioning(false);

module.exports = Encore.getWebpackConfig();
