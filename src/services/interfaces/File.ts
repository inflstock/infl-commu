import { BaseInterface } from "./BaseInterface";

export interface File extends BaseInterface {
  fileId: number;
  endpoint: string;
  filename: string;
  fileSize?: number;
  originalFilename: string;
}

export const getFilePath = (file?: File) => {
  if (!file) {
    return '';
  }
  return `${file.endpoint}${file.filename}`;
}

export const getThumbnail = (images?: Array<File>) => {
  return images && images.length > 0 ? getFilePath(images[0]) : undefined
}