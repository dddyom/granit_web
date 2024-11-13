import { createReducer, createAction } from "@reduxjs/toolkit";
import { Point } from "../../types";

export const setPoints = createAction<Point[]>("SET_POINTS");
export const onPointHover = createAction<Point>("ON_POINT_HOVER");
export const offPointHover = createAction<Point>("OFF_POINT_HOVER");
export const hidePoint = createAction<Point>("HIDE_POINT");
export const showPoint = createAction<Point>("SHOW_POINT");

export const pointsReducer = createReducer<Point[]>([], (builder) => {
  builder
    .addCase(setPoints, (_, action) => {
      return action.payload.map((point, index) => ({ ...point, id: index }));
    })
    .addCase(onPointHover, (state, action) => {
      return state.map((point: Point) =>
        point.id === action.payload.id
          ? { ...point, hovered: true }
          : { ...point },
      );
    })
    .addCase(offPointHover, (state, action) => {
      return state.map((point: Point) =>
        point.id === action.payload.id
          ? { ...point, hovered: false }
          : { ...point },
      );
    })
    .addCase(hidePoint, (state, action) => {
      return state.map((point: Point) =>
        point.id === action.payload.id
          ? { ...point, hidden: true }
          : { ...point },
      );
    })
    .addCase(showPoint, (state, action) => {
      return state.map((point: Point) =>
        point.id === action.payload.id
          ? { ...point, hidden: false }
          : { ...point },
      );
    });
});
