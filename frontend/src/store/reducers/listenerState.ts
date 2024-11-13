import { createReducer, createAction } from "@reduxjs/toolkit";

export const setIsListenerOn = createAction<Boolean>("SET_IS_LISTENER_ON");

export const listenerState = createReducer<Boolean>(false, (builder) => {
  builder.addCase(setIsListenerOn, (_, action) => {
    return action.payload;
  });
});
