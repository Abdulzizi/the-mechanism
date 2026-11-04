import { Composition } from "remotion";
import { Mechanism } from "./Video";
import timeline from "../public/timeline.json";

export const Root = () => (
  <Composition
    id="Mechanism"
    component={Mechanism}
    width={1080}
    height={1920}
    fps={timeline.fps}
    durationInFrames={timeline.totalFrames}
  />
);
