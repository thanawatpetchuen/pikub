// import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';

import useWebSocket, { ReadyState } from 'react-use-websocket';
import { WebSocketHook } from 'react-use-websocket/dist/lib/types';
import './App.css';
import Column, { Row} from './components/Layout';
import { Ticker } from './model/trade';

// const noMessage: Trade = {}

// const useSymbols = () => {
//   const [symbols, setSymbols] = useState<AllSymbol | undefined>()

//   const fetchData = useCallback(async () => {
//     try {
//       const { data } = await axios.get('https://api.bitkub.com/api/market/symbols', {
//         headers: {
//           'Access-Control-Allow-Origin': '*'
//         }
//       })
//       setSymbols(data as AllSymbol)
//     } catch (err) {
//       console.log(err)
//     }
//   }, [])

//   useEffect(() => {
//     fetchData()
//   }, [fetchData])

//   return symbols
// }

// const useToggle = () => {
//   const [isOpen, setOpen] = useState(false);

//   const open = useCallback(() => setOpen(true), [])
//   const close = useCallback(() => setOpen(false), [])
//   const toggle = useCallback(() => setOpen(!isOpen), [isOpen])

//   return { isOpen, open, close, toggle }
// }

const getLocale = (amount: string = ''): string => {
  return parseFloat(amount).toLocaleString('th-TH')
}

const App = () => {

  const [currentMessage, setMessage] = useState<Ticker>();
  const [user, setUser] = useState(false)
  // const symbols = useSymbols()
  // const { isOpen } = useToggle()
  const [selectedSymbol, setSelectedSymbol] = useState<string>('xrp')

  // useEffect(() => {
  //   if (!!selectedSymbol && symbols && symbols.result.length > 0) {
  //     setSelectedSymbol(symbols.result[0].symbol)
  //   }
  // }, [selectedSymbol, symbols])
  // const [in, setBuys] = useState<Trade>();

  const [buyVal, setBuy] = useState(0);
  const [sellVal, setSell] = useState(0);

  const {
    // sendMessage,
    lastMessage,
    readyState,
  }: WebSocketHook<MessageEvent<string>> = useWebSocket(`wss://api.bitkub.com/websocket-api/market.ticker.thb_${selectedSymbol}`);

  useEffect(() => {
    if (lastMessage?.data) {
      try {
        const parsed = JSON.parse(lastMessage?.data) as Ticker
        setMessage(parsed)
      } catch (err) {
        console.log({ err })
      }
    }
  }, [lastMessage])

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Connected to BitKub',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  const selected = useMemo(() => user ? sellVal : parseFloat(currentMessage?.last as string) || 0, [currentMessage?.last, sellVal, user])

  const changes = useMemo(() => ((selected - buyVal) / buyVal), [buyVal, selected])

  const start = 5000;
  const step = 5000;
  const count = 10;

  return (
    <div className="App">
      <header className="App-header">
        <span>{connectionStatus}</span>
        <Row>
          <Column>
            Symbol:
          </Column>
          <Column onClick={() => {
            const sym = prompt('Select currency')
            if (sym) {
              setSelectedSymbol(sym)
            }
          }}>
            {/* {isOpen && (
              <select onChange={({ target: { value } }) => setSelectedSymbol(value)}>
                {symbols?.result.map((symbol => (
                  <option key={symbol.id} value={symbol.symbol}>{symbol.symbol}</option>
                )))}
              </select>
            )} */}
            {selectedSymbol.toUpperCase()}
          </Column>
        </Row>
        <Row>
          <Column>
            Current Rate:
          </Column>
          <Column>
            {currentMessage ? getLocale(currentMessage.last) : null}
          </Column>
        </Row>
        <Row style={{ marginTop: '20px' }}>
          <span onClick={() => setSell(parseFloat(currentMessage?.high24hr || '0'))}>High: <span style={{ cursor: 'pointer', color: 'lightgreen' }}>{getLocale(currentMessage?.high24hr)}</span>, </span>
          <span onClick={() => setSell(parseFloat(currentMessage?.low24hr || '0'))}>Low: <span style={{ cursor: 'pointer', color: '#D00000' }}>{getLocale(currentMessage?.low24hr)}</span>, </span>
          <span>Changes: <span style={{ color: parseFloat(currentMessage?.percentChange || '0') >= 0 ? 'lightgreen' : '#D00000' }}>{getLocale(currentMessage?.percentChange)}%</span></span>
        </Row>
        <Row style={{ marginTop: '20px' }}>
          <Column width={3}>
            Buy
          </Column>
          <Column width={3}>
            Sell
            <input type="checkbox" checked={user} onChange={() => setUser(!user)} />
          </Column>
          <Column width={3}>
            Change(%)
          </Column>
        </Row>
        <Row style={{ marginTop: '20px' }}>
          <Column width={3}>
            <input name="in" type="number" placeholder="in" value={buyVal} onChange={({ target: { value } }) => setBuy(parseFloat(value))} />
          </Column>
          <Column width={3}>
            <input name="out" type="number" placeholder="out" value={sellVal} onChange={({ target: { value } }) => setSell(parseFloat(value))} />
          </Column>
          <Column width={3}>
            {`${(changes * 100).toLocaleString('th-TH')} %`}
          </Column>
        </Row>
        <Row style={{ marginTop: '20px' }}>
          {Array.apply(null, Array(count)).map((_, i) => {
            const index = i
            const currentAmount = start + (step * index)
            return (
              <div key={i}>
                <Column width={2}>
                  {currentAmount.toLocaleString('th-TH')}
                </Column>
                <Column width={2}>
                  {(currentAmount * changes).toLocaleString('th-TH')} BHT
                </Column>
              </div>
            )
          })}

        </Row>
      </header>
    </div>
  );
}

export default App;
