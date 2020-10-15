import setActions from './StateReducers';
import setState from './ActionReducers';
import { State, Action } from '../constants/Interfaces';
import { HeaderStates, BottomStates, PageStates } from "../constants/States";
import temporaryDB from '../../temporaryDB.json';

const initialState: State = {
    headerState: HeaderStates.title,
    bottomState: BottomStates.itemSelection,
    pageState: PageStates.itemList,
    store: {
        searchQuery: "",
        suggestions: temporaryDB['suggestions'], // FIXME: should be empty at start (currently testing)
        items: temporaryDB['testItems'] // FIXME: should be empty at start (currently testing)
    }
};

// combining reducers for action and state
export default function rootReducer(state: State = initialState, action: Action) {
    const reducersToUse = [setActions, setState];

    let newState = undefined;
    for (let i in reducersToUse) {
        newState = reducersToUse[i](state, action);
        if (newState) { // return state if the state and action are found in the reducersToUse
            return newState;
        }
    }

    return state;
}