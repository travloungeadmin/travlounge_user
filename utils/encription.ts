import { AES, Utf8 } from 'crypto-es';

export const encrypt = (data: string) => AES.encrypt(data, 'suhail').toString();
export const decrypt = (data: string) => AES.decrypt(data, 'suhail').toString(Utf8);
