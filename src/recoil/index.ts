import { atom, AtomOptions } from "recoil";
import { SYMBOLS } from "../model/symbol";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

const AVAILABLE_SYMBOLS = Object.values(SYMBOLS);

const symbolsStateOptions: AtomOptions<SYMBOLS[]> = {
    key: 'symbolState',
    default: AVAILABLE_SYMBOLS,
    effects_UNSTABLE: [persistAtom],
}

export const symbolsState = atom(symbolsStateOptions)