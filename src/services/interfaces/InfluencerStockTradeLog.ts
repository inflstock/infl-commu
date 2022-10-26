import { BaseInterface } from "./BaseInterface";

export interface InfluencerStockTradeLogs extends BaseInterface {
  inflStockTradeLogId: number;
  qty: number;
  price: number;
  sellerId: number;
  buyerId: number;
  inflInfoId: number;
}