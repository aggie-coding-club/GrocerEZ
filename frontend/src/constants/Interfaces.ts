import { headerStates, bottomStates, pageStates, globalStates } from './States';
import { actionTypes } from './ActionTypes';

export interface Item {
    id: number,
    name: string,
    tags: string[],
    price?: number, // this should be in cents
    store?: string
}

export interface Store {
    isSingleStore?: boolean,
    searchQuery?: string,
    items: Item[]
}

export interface State {
    headerState: headerStates,
    bottomState: bottomStates,
    pageState: pageStates,
    store: Store
}

export interface searchPayload {
    searchQuery: string
}

export interface addItemPayload {
    addedItem: Item
}

export interface removeItemPayload {
    removeItem: number // ID of item
}

export interface updateItemsPayload {
    updatedItems: Item[]
}

export interface switchStorePayload {
    isSingleStore: boolean
}

export interface Action {
    type: globalStates | actionTypes,
    payload: searchPayload | addItemPayload | removeItemPayload | updateItemsPayload | switchStorePayload
}