export interface Trade {
  stream: string; // stream name
  sym: string; // symbol
  txn: string; // transaction id
  rat: number; // rate matched
  amt: number; // amount matched
  bid: number; // buy order id
  sid: number; // sell order id
  ts: number; // trade timestamp
}

export interface Symbol {
    id: number;
    symbol: string;
    info: string;
}

export interface AllSymbol {
    error: number
    result: Symbol[]
}

export interface Ticker {
  stream: string // market.ticker.thb_bch, // stream name
  id: number; // symbol id
  last: string;
  lowestAsk: string;
  highestBid: string;
  percentChange: string;
  baseVolume: string;
  quoteVolume: string;
  isFrozen: string;
  high24hr: string;
  low24hr: string;
}