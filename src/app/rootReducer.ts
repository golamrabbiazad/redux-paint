import { Action } from "./action";
import { RootState } from "../utils/types";

const initialState: RootState = {
  currentStroke: {
    points: [],
    color: "#000",
  },
  strokes: [],
};

export const rootReducer = (
  state: RootState = initialState,
  action: Action
) => {
  // begin stokes action
  if (action.type === "BEGIN_STROKE") {
    return {
      ...state,
      currentStroke: {
        ...state.currentStroke,
        points: [action.payload],
      },
    };
  }

  // update stokes action
  if (action.type === "UPDATE_STROKE") {
    return {
      ...state,
      currentStroke: {
        ...state.currentStroke,
        points: [...state.currentStroke.points, action.payload],
      },
    };
  }

  // end stokes action
  if (action.type === "END_STROKE") {
    if (!state.currentStroke.points.length) return state;

    return {
      ...state,
      currentStroke: {
        ...state.currentStroke,
        points: [],
      },
    };
  }

  return state;
};
