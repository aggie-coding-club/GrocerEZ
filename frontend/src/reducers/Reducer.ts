import { globalStates, headerStates, bottomStates, pageStates } from "../constants/States";
import { actionTypes } from '../constants/ActionTypes';
import 
{   State, 
    Action, 
    searchPayload, 
    addItemPayload, 
    removeItemPayload, 
    updateItemsPayload, 
    switchStorePayload
} from "../constants/Interfaces";

const initialState : State = {
    headerState: headerStates.title,
    bottomState: bottomStates.itemSelection,
    pageState: pageStates.itemList,
    store: {
        searchQuery: '',
        items: []
    }
};

export default function setState(state : State = initialState, action: Action) {
    switch (action.type) {
        case globalStates.listSelection:
            return {
                ...state,
                headerState: headerStates.title,
                bottomState: bottomStates.itemSelection,
                pageState: pageStates.itemList
            }
        case globalStates.searchQuery:
            return {
                ...state,
                headerState: headerStates.search,
                bottomState: bottomStates.none,
                pageState: pageStates.none,
            }
        case globalStates.searchFilter:
            return {
                ...state,
                headerState: headerStates.search,
                bottomState: bottomStates.none,
                pageState: pageStates.searchFilters
            }
        case globalStates.searchResults:
            return {
                ...state,
                headerState: headerStates.search,
                bottomState: bottomStates.none,
                pageState: pageStates.searchResults
            }
        case globalStates.optionsDialog:
            return {
                ...state,
                headerState: headerStates.title,
                bottomState: bottomStates.itemSelection,
                pageState: pageStates.itemListDialogue
            }
        case globalStates.loadingScreen:
            return {
                ...state,
                headerState: headerStates.title,
                bottomState: bottomStates.itemSelection,
                pageState: pageStates.loading
            }
        case globalStates.finalListSelection:
            return {
                headerState: headerStates.storeSelect,
                bottomState: bottomStates.total,
                pageState: pageStates.itemListPrices,
                store: {
                    ...state.store,
                    items: (action.payload as updateItemsPayload).updatedItems
                }
            }
        case actionTypes.queryItem:
            // add additional action to perform query against database
            return {
                ...state,
                store: {
                    ...state.store,
                    searchQuery: (action.payload as searchPayload).searchQuery
                }
            }
        case actionTypes.addItem:
            let newItems = state.store.items;
            newItems.push((action.payload as addItemPayload).addedItem);
            
            return {
                ...state,
                store: {
                    ...state.store,
                    items: newItems
                }
            }
        case actionTypes.removeItem:
            let filteredItems = state.store.items;
            filteredItems = filteredItems.filter((item) => item.id !== (action.payload as removeItemPayload).removeItem);
            
            return {
                ...state,
                store: {
                    ...state.store,
                    items: filteredItems
                }
            }
        case actionTypes.changeStoreOpt:
            return {
                ...state,
                store: {
                    ...state.store,
                    isSingleStore: (action.payload as switchStorePayload).isSingleStore
                }
            }
        default:
            return state;   
    }
}