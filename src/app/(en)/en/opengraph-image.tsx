import { ogSize, renderOg } from "../../og";

export const alt = "Carlos Llanos, full stack developer: the Estados Judiciales board in production";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg("en");
}
