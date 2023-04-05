import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counter-slice";
import { apiSlice  } from "../features/dogs/dogs-api-slice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    // add custom generated middleware that is part of the slice to the store
    // rtk configured store simplyfies the process of adding middleware to our setup
    middleware: (getDefaultMiddleware) => {
        // combined middleware is everything by default plus this
        // this is going to add some special capabilities that we will be able to track things like cache lifetime
        // ie. if no other part of code base need this data we can remove it from cache after it expires
        return getDefaultMiddleware().concat(apiSlice.middleware);
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;