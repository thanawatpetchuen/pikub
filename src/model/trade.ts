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