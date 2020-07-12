import setActions from './StateReducers';
import setState from './ActionReducers';
import { State, Action } from '../constants/Interfaces';
import { HeaderStates, BottomStates, PageStates } from "../constants/States";

const initialState: State = {
    headerState: HeaderStates.title,
    bottomState: BottomStates.itemSelection,
    pageState: PageStates.itemList,
    store: {
        searchQuery: '',
        items: []
    }
};

export default function rootReducer(state: State = initialState, action: Action) {
    const reducersToUse = [setActions, setState];

    let newState = undefined;
    for (let i in reducersToUse) {
        newState = reducersToUse[i](state, action);
        if (newState) {
            return newState;
        }
    }

    return state;
}