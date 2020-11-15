import { HeaderStates, BottomStates, PageStates, GlobalStates } from './States';
import { ActionTypes } from './ActionTypes';

// TODO: update interface
export interface Item {
    id: number,
    name: string,
    pic: string, // url to pic
    tags: string[],
    price?: number, // this should be in cents
    store?: string
}

export interface Store {
    isSingleStore?: boolean,
    searchQuery?: string,
    suggestions: string[],
    items: Item[]
}

export interface State {
    headerState: HeaderStates,
    bottomState: BottomStates,
    pageState: PageStates,
    store: Store
}

export interface suggestionAction {
    type: ActionTypes,
    suggestions: string[]
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

export interface replaceItemsAction {
    type: ActionTypes,
    newItems: Item[]
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

// abstract action to include all actions
export type Action = stateAction | suggestionAction | searchAction | addItemAction | removeItemAction |replaceItemsAction | updateItemsAction | switchStoreAction;
