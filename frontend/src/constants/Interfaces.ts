import { HeaderStates, BottomStates, PageStates, GlobalStates } from './States';
import { ActionTypes } from './ActionTypes';

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
    headerState: HeaderStates,
    bottomState: BottomStates,
    pageState: PageStates,
    store: Store
}

export interface searchAction {
    type: ActionTypes,
    searchQuery: string
}

export interface addItemAction {
    type: ActionTypes,
    addedItem: Item
}

export interface removeItemAction {
    type: ActionTypes,
    removeItem: number // ID of item
}

export interface updateItemsAction {
    type: GlobalStates,
    updatedItems: Item[]
}

export interface switchStoreAction {
    type: ActionTypes,
    isSingleStore: boolean
}

export interface stateAction {
    type: GlobalStates
}

export type Action = stateAction | searchAction | addItemAction | removeItemAction | updateItemsAction | switchStoreAction;