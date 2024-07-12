import { configureStore ,combineReducers} from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";
import { logout } from "./userRedux";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['cart'], // persist cart and user reducers
};

const rootReducer = combineReducers({user:userReducer,cart:cartReducer})

const persistedReducer = persistReducer(persistConfig, rootReducer);
// Middleware to clear cart on logout
const clearCartMiddleware = (store) => (next) => (action) => {
    if (action.type === logout.type) {
      store.dispatch({ type: 'clearCart' }); // Dispatch the clear cart action
    }
    return next(action);
  };

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(clearCartMiddleware),
});

export const persistor = persistStore(store);
