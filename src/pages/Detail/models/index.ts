export interface ICart {
  id: number;
  name: string;
  img_url: string;
  price: number;
  num: number;
  create_time: string;
  want: number; // 0: 想想 1: 买
  limitation: number | null;
}
