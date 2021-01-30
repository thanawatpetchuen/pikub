import React, {createContext, useContext} from "react"

import { makeAutoObservable } from 'mobx'
import {observer} from 'mobx-react-lite'

class Timer {
    secondsPassed = 0

    constructor() {
        makeAutoObservable(this)
    }

    increaseTimer() {
        this.secondsPassed += 1
    }
}

const TimerContext = createContext<Timer | null>(null)

export const TimerView = observer(() => {
    // Grab the timer from the context.
    const timer = useContext(TimerContext) // See the Timer definition above.
    return (
        <span>Seconds passed: {timer?.secondsPassed}</span>
    )
})