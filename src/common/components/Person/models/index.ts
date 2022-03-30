export enum SEX {
  male = 'male',
  female = 'female',
  other = 'other'
}

export interface IPersonalInformation {
  sex: string;
}
export interface IPerson {
  id: number;
  phoneNumber: number;
  username: string;
  password: string;
  information?: {
    sex: SEX;
    address: {
      place: string;
      province: string[];
    };
  };
}
