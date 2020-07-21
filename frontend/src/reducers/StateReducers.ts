import { GlobalStates, HeaderStates, BottomStates, PageStates } from "../constants/States";
import 
{   State, 
    Action,
    updateItemsAction
} from '../constants/Interfaces';

export default function setState(state: State, action: Action) {
    switch (action.type) {
        case GlobalStates.listSelection:
            return {
                ...state,
                headerState: HeaderStates.title,
                bottomState: BottomStates.itemSelection,
                pageState: PageStates.itemList
            }
        case GlobalStates.searchQuery:
            return {
                ...state,
                headerState: HeaderStates.search,
                bottomState: BottomStates.none,
                pageState: PageStates.none,
            }
        case GlobalStates.searchFilter:
            return {
                ...state,
                headerState: HeaderStates.search,
                bottomState: BottomStates.none,
                pageState: PageStates.searchFilters
            }
        case GlobalStates.searchResults:
            return {
                ...state,
                headerState: HeaderStates.search,
                bottomState: BottomStates.none,
                pageState: PageStates.searchResults
            }
        case GlobalStates.loadingScreen:
            return {
                ...state,
                headerState: HeaderStates.title,
                bottomState: BottomStates.itemSelection,
                pageState: PageStates.loading
            }
        case GlobalStates.finalListSelection:
            return {
                headerState: HeaderStates.storeSelect,
                bottomState: BottomStates.total,
                pageState: PageStates.itemListPrices,
                store: {
                    ...state.store,
                    items: (action as updateItemsAction).updatedItems
                }
            }
    }
}
