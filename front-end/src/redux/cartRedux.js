    import {createSlice} from "@reduxjs/toolkit"

    const cartSlice = createSlice({
        name:"cart",
        initialState:{
            userId : null,
            products : [],
            quantity : 0,
            total :0,
        },
        reducers :{
            addProduct :(state,action) =>{
                const product = action.payload;
                state.quantity+= product.quantity;
                state.products.push(product);
                state.total+= product.price * product.quantity;
            },
            clearCart: (state) => {
                state.products = [];
                state.quantity = 0;
                state.total = 0;
            },
            setCart: (state, action) => {
                const { userId, products, quantity, total } = action.payload;
                state.userId = userId;
                state.products = products;
                state.quantity = quantity;
                state.total = total;
            }
        }
    })

    export const {addProduct,clearCart,setCart} = cartSlice.actions;
    export default cartSlice.reducer;