import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import useWebSocket, { ReadyState } from 'react-use-websocket';
import { WebSocketHook } from 'react-use-websocket/dist/lib/types';
import './App.css';
import { AllSymbol, Trade } from './model/trade';

// const noMessage: Trade = {}

const useSymbols = () => {
  const [symbols, setSymbols] = useState<AllSymbol | undefined>()

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get('https://api.bitkub.com/api/market/symbols', {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      console.log({ data })
      setSymbols(data as AllSymbol)
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return symbols
}

const useToggle = () => {
  const [isOpen, setOpen] = useState(false);

  const open = useCallback(() => setOpen(true), [])
  const close = useCallback(() => setOpen(false), [])
  const toggle = useCallback(() => setOpen(!isOpen), [isOpen])

  return { isOpen, open, close, toggle }
}

const App = () => {

  const [currentMessage, setMessage] = useState<Trade>();
  const [user, setUser] = useState(false)
  const symbols = useSymbols()
  const { isOpen } = useToggle()
  const [selectedSymbol, setSelectedSymbol] = useState<string>('xrp')

  // useEffect(() => {
  //   if (!!selectedSymbol && symbols && symbols.result.length > 0) {
  //     setSelectedSymbol(symbols.result[0].symbol)
  //   }
  // }, [selectedSymbol, symbols])
  // const [in, setBuys] = useState<Trade>();

  const [buyVal, setBuy] = useState(0);
  const [sellVal, setSell] = useState(0);

  console.log({ symbols })

  const {
    // sendMessage,
    lastMessage,
    readyState,
  }: WebSocketHook<MessageEvent<string>> = useWebSocket(`wss://api.bitkub.com/websocket-api/market.trade.thb_${selectedSymbol}`);

  useEffect(() => {
    console.log(lastMessage?.data)
    if (lastMessage?.data) {
      setMessage(JSON.parse(lastMessage?.data) as Trade)
    }
  }, [lastMessage])

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Connected to BitKub',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  const selected = useMemo(() => user ? sellVal : currentMessage?.rat || 0, [currentMessage?.rat, sellVal, user])

  const changes = useMemo(() => ((selected - buyVal) / buyVal), [buyVal, selected])

  const start = 5000;
  const step = 5000;
  const count = 10;

  return (
    <div className="App">
      <header className="App-header">
        <span>{connectionStatus}</span>
        <div style={{ width: '100%' }}>
          <div style={{ display: 'inline-block', width: '50%' }}>
            Symbol:
          </div>
          <div style={{ display: 'inline-block', width: '50%' }} onClick={() => {
            const sym = prompt('Select currency')
            if (sym) {
              setSelectedSymbol(sym)
            }
          }}>
            {isOpen && (
              <select onChange={({ target: { value } }) => setSelectedSymbol(value)}>
                {symbols?.result.map((symbol => (
                  <option key={symbol.id} value={symbol.symbol}>{symbol.symbol}</option>
                )))}
              </select>
            )}
            {currentMessage ? currentMessage.sym : null}
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <div style={{ display: 'inline-block', width: '50%' }}>
            Current Rate:
          </div>
          <div style={{ display: 'inline-block', width: '50%' }}>
            {currentMessage ? currentMessage.rat.toLocaleString('th-TH') : null}
          </div>
        </div>
        <div style={{ marginTop: '20px', width: '100%' }}>
          <div style={{ display: 'inline-block', width: '33%' }}>
            Buy
          </div>
          <div style={{ display: 'inline-block', width: '33%' }}>
            Sell
            <input type="checkbox" checked={user} onChange={() => setUser(!user)} />
          </div>
          <div style={{ display: 'inline-block', width: '33%' }}>
            Change(%)
          </div>
        </div>
        <div style={{ marginTop: '20px', width: '100%' }}>
          <div style={{ display: 'inline-block', width: '33%' }}>
            <input name="in" type="number" placeholder="in" value={buyVal} onChange={({ target: { value } }) => setBuy(parseFloat(value))} />
          </div>
          <div style={{ display: 'inline-block', width: '33%' }}>
            <input name="out" type="number" placeholder="out" value={sellVal} onChange={({ target: { value } }) => setSell(parseFloat(value))} />
          </div>
          <div style={{ display: 'inline-block', width: '33%' }}>
            {`${(changes * 100).toLocaleString('th-TH')} %`}
          </div>
        </div>
        <div style={{ marginTop: '5px', width: '100%' }}>
          {Array.apply(null, Array(count)).map((_, i) => {
            const index = i
            const currentAmount = start + (step * index)
            return (
              <div key={i}>
                <div style={{ display: 'inline-block', width: '50%' }}>
                  {currentAmount.toLocaleString('th-TH')}
                </div>
                <div style={{ display: 'inline-block', width: '50%' }}>
                  {(currentAmount * changes).toLocaleString('th-TH')} BHT
                </div>
              </div>
            )
          })}

        </div>
      </header>
    </div>
  );
}

export default App;
