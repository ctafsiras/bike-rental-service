import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { bikeApi } from "./api/bikeApi";
// ...

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [bikeApi.reducerPath]: bikeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(bikeApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
