import { Item } from "../../constants/Interfaces";
import { GlobalStates } from "../../constants/States";
import temporaryDB from '../../../temporaryDB.json'; // FIXME: will be removed later
import { ActionTypes } from "../../constants/ActionTypes";

// All asyncrhonous calls to backend
// TODO: implement backend calls once backend is completed

// fill in the store information for selected items
export async function findItemsWithRoute(dispatch: Function, items: Item[]) {
    // API call using items without the store variable filled in
    dispatch({type: GlobalStates.finalListSelection, updatedItems: temporaryDB['testItems']});
}

// query backend for search results to populate app
export async function queryItemSearch(query: string, page: number) {
    // most likely pagination will be needed
    // return results
    return [];
}

// query search suggestions so autofill is possible
export async function querySuggestions(dispatch: Function, query: string) {

    dispatch({type: ActionTypes.putSuggestions, suggestions: [/*retrieve suggestions from backend*/]})
}
