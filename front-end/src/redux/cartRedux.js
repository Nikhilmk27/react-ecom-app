    import {createSlice} from "@reduxjs/toolkit"
    const calculateTotal = (products) => {
        return products.reduce((sum, product) => sum + product.price * product.quantity, 0);
      };

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
                state.total= calculateTotal(state.products)
            },
            clearCart: (state) => {
                state.userId = null;
                state.products = [];
                state.quantity = 0;
                state.total = 0;
            },
            setCart: (state, action) => {
                const { userId, products, quantity } = action.payload;
                state.userId = userId;
                state.products = products;
                state.quantity = quantity;
                state.total = calculateTotal(products);
            },
            recalculateTotal: (state) => {
                state.total = calculateTotal(state.products);
              },
        }
    })

    export const {addProduct,clearCart,setCart,recalculateTotal} = cartSlice.actions;
    export default cartSlice.reducer;

    // setCart: (state, action) => {
    //     const { userId, products, quantity, total } = action.payload;
    //     state.userId = userId;
    //     state.products = products;
    //     state.quantity = quantity;
    //     state.total = total;
    // }