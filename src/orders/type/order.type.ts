export enum PaymentMethod {
  'credit_card',
  'bank_transfer',
  'bca_klikpay',
  'bri_epay',
  'cimb_clicks',
  'danamon_online',
  'qris',
  'gopay',
  'shopeepay',
  'cstore',
  'akulaku',
}

export type OrderDetailItem = {
  movie: {
    id: number;
    title: string;
  };
  studio_number: number;
  qty: number;
  sub_total_price: number;
  start_time: string;
  end_time: string;
};

export type OrderDetail = {
  total_qty: number;
  total_price: number;
  item_details: OrderDetailItem[];
};

export type Item = {
  movie_schedule_id: number;
  qty: number;
};
