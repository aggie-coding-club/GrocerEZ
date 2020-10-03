import { ActionTypes } from '../constants/ActionTypes';
import 
{   State, 
    Action, 
    searchAction, 
    addItemAction, 
    removeItemAction,
    switchStoreAction, suggestionAction
} from "../constants/Interfaces";

export default function setAction(state : State, action: Action) {
    switch (action.type) {  
        case ActionTypes.putSuggestions:
            return {
                ...state,
                store: {
                    ...state.store,
                    suggestions: (action as suggestionAction).suggestions
                }
            }
        case ActionTypes.queryItem:
            // add additional action to perform query against database
            return {
                ...state,
                store: {
                    ...state.store,
                    searchQuery: (action as searchAction).searchQuery
                }
            }
        case ActionTypes.addItem:
            let newItems = state.store.items;
            newItems.push((action as addItemAction).addedItem);
            
            return {
                ...state,
                store: {
                    ...state.store,
                    items: newItems
                }
            }
        case ActionTypes.removeItem:
            let filteredItems = state.store.items;
            filteredItems = filteredItems.filter((item) => item.id !== (action as removeItemAction).removeItem);
            
            return {
                ...state,
                store: {
                    ...state.store,
                    items: filteredItems
                }
            }
        case ActionTypes.changeStoreOpt:
            return {
                ...state,
                store: {
                    ...state.store,
                    isSingleStore: (action as switchStoreAction).isSingleStore
                }
            }
    }
}