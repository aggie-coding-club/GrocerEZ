import { Item } from "../../constants/Interfaces";
import { GlobalStates } from "../../constants/States";
import temporaryDB from '../../../temporaryDB.json'; // will be removed later
import { ActionTypes } from "../../constants/ActionTypes";


export async function findItemsWithRoute(dispatch: Function, items: Item[]) {
    // API call using items without stores
    dispatch({type: GlobalStates.finalListSelection, updatedItems: temporaryDB['testItems']});
}


export async function queryItemSearch(query: string, page: number) {
    // most likely pagination will be needed
    // return results
    return [];
}

export async function querySuggestions(dispatch: Function, query: string) {

    dispatch({type: ActionTypes.putSuggestions, suggestions: [/*retrieve suggestions from backend*/]})
}
