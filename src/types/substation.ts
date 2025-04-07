import type { MtNetwork } from "./mtNetwork";

export interface Substation {
    id?: number;
    code: string;
    name: string;
    latitude: number;
    longitude: number;
    mtNetworks?: MtNetwork[];
  }