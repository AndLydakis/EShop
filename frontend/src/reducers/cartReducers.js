import {CART_ADD_ITEM, CART_REMOVE_ITEM} from "../constants/cartConstants";

export const cartReducer = (state = {cartItems: []}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            /*if item exists increase qty, else add*/
            const existsItem = state.cartItems.find(x => x.product === item.product)
            if (existsItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existsItem ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        default:
            return state;
    }
}