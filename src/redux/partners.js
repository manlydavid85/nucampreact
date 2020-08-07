import { PARTNERS } from '../shared/partners';

// all reducers take two parameters. previous(current) state and an action object 
export const Partners = (state = PARTNERS, action) => {
    switch(action.type){
        default:
            return state;
    }
} 