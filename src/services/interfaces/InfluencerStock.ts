import { BaseInterface } from "./BaseInterface";

export interface InfluencerStock extends BaseInterface {
  inflInfoId: number;
  ownerId: number;
  inflStockId: number;
  position: 'SELL' | 'BUY' | 'HOLD';
  qty: number;
  price?: number;
  upDownRatio: number;
}