import { createReducer, createAction } from "@reduxjs/toolkit";
import { ICOPoint } from "../../types";

export const setIcoPoints = createAction<ICOPoint[]>("SET_ICO_POINTS");
export const onIcoPointHover = createAction<ICOPoint>("ON_ICO_POINT_HOVER");
export const offIcoPointHover = createAction<ICOPoint>("OFF_ICO_POINT_HOVER");
export const hideIcoPoint = createAction<ICOPoint>("HIDE_ICO_POINT");
export const showIcoPoint = createAction<ICOPoint>("SHOW_ICO_POINT");

export const IcoPointsReducer = createReducer<ICOPoint[]>([], (builder) => {
  builder
    .addCase(setIcoPoints, (_, action) => {
      return action.payload.map((point, index) => ({ ...point, id: index }));
    })
    .addCase(onIcoPointHover, (state, action) => {
      return state.map((point: ICOPoint) =>
        point.id === action.payload.id
          ? { ...point, hovered: true }
          : { ...point },
      );
    })
    .addCase(offIcoPointHover, (state, action) => {
      return state.map((point: ICOPoint) =>
        point.id === action.payload.id
          ? { ...point, hovered: false }
          : { ...point },
      );
    })
    .addCase(hideIcoPoint, (state, action) => {
      return state.map((point: ICOPoint) =>
        point.id === action.payload.id
          ? { ...point, hidden: true }
          : { ...point },
      );
    })
    .addCase(showIcoPoint, (state, action) => {
      return state.map((point: ICOPoint) =>
        point.id === action.payload.id
          ? { ...point, hidden: false }
          : { ...point },
      );
    });
});
