const Reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cartItems: state.cartItems.concat(action.payload),
                productQuickviewsOpen: false,
                productQuickviewsItemId: null
            };
        case 'SHOW_PRODUCT_QUICK_VIEWS_CLICK':
            return {
                ...state,
                productQuickviewsOpen: action.payload.open,
                productQuickviewsItemId: action.payload.id
            };
        case 'CART_VIEWS_CLICK':
            return {
                ...state,
                cartOpen: action.payload,
            };
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter(post => post.id !== action.payload)
            };
        default:
            return state;
    }
};

export default Reducer;