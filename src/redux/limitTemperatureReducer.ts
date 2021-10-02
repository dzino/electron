import { Redux, Actions } from "../types"

const initialState: Redux.RootState["limitTemp"] = {
  value: 20,
}

export const limitTemperatureReducer = (
  state = initialState,
  action: Actions.List["limitTemp"]
): Redux.RootState["limitTemp"] =>
  action.type === "LIMIT_TEMP" ? { ...state, value: action.payload } : state
