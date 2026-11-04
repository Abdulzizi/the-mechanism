import { Config } from "@remotion/cli/config";

Config.setBrowserExecutable("/usr/bin/google-chrome");
Config.setChromeMode("chrome-for-testing");
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(92);
Config.setCodec("h264");
Config.setCrf(18);
Config.setPixelFormat("yuv420p");
