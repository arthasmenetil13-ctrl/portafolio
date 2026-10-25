import { ogSize, renderOg } from "../og";

export const alt = "Carlos Llanos, desarrollador full stack: tablero de Estados Judiciales en producción";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg("es");
}
