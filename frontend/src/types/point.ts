export interface Point {
  id: number;
  azimuth: number;
  distance: number;
  conf: number;
  center_x: number;
  center_y: number;
  label: string;
  buf_name: string;
  hovered?: boolean;
  hidden?: boolean;
}

export interface ICOPoint {
  id: number;
  azimuth: number;
  distance: number;
  center_x: number;
  center_y: number;
  buf_name: string;
  label: string;
  type: "A" | "P";
  hovered?: boolean;
  hidden?: boolean;
}
