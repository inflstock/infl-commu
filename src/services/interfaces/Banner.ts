import { BaseInterface } from "./BaseInterface";
import { File } from "./File";

export interface Banner extends BaseInterface {
  bannerId: number;
  title?: string;
  context?: string;
  linkUrl?: string;
  postStartAt?: string;
  postEndAt?: string;
  image: File;
}