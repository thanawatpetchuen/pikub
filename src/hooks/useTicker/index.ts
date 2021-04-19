import { useEffect, useMemo, useState } from 'react';

import useWebSocket, { ReadyState } from 'react-use-websocket';
import { WebSocketHook } from 'react-use-websocket/dist/lib/types';
import { Ticker } from '../../model/trade';

const status = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Connected to BitKub',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
};

const useTicker = (selectedSymbol: string) => {
    const [currentMessage, setMessage] = useState<Ticker>({} as Ticker);

    const {
        // sendMessage,
        // lastMessage,
        readyState,
        lastJsonMessage,
    }: WebSocketHook<MessageEvent<string>> = useWebSocket(`wss://api.bitkub.com/websocket-api/market.ticker.thb_${selectedSymbol}`);

    const connectionStatus = useMemo(() => {
        return status[readyState]
    }, [readyState])

    useEffect(() => {
        if (lastJsonMessage) {
            setMessage(lastJsonMessage as Ticker)
        }
    }, [lastJsonMessage])

    return { connectionStatusText: connectionStatus, connectionStatus: readyState, currentMessage }
}

export default useTicker;