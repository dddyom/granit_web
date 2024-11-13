import { createReducer, createAction } from "@reduxjs/toolkit";

export const setIsLogsCollapsed = createAction<boolean>("SET_IS_COLLAPSED");

export const isLogsCollapsed = createReducer<boolean>(false, (builder) => {
  builder.addCase(setIsLogsCollapsed, (_, action) => {
    return action.payload;
  });
});
