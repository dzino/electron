import { Redux, Actions } from "../types"

const initialState: Redux.RootState["data"] = {
  value: [],
}

export const dataReducer = (
  state = initialState,
  action: Actions.List["data"]
): Redux.RootState["data"] => {
  switch (action.type) {
    case "DATA":
      return { ...state, value: [...state.value, action.payload] }
    default:
      return state
  }
}
