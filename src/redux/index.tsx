import { compose, createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import createSagaMiddleware from "@redux-saga/core"
import { rootReducer } from "./rootReducer"
import { sagaWatcher } from "../sagas"

/**
 * # Redux
 * Chrome: Redux DevTools
 */
const saga = createSagaMiddleware()
const devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__
  ? [(window as any).__REDUX_DEVTOOLS_EXTENSION__()]
  : []
const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk, saga), ...devTools)
)
saga.run(sagaWatcher)

export default function redux(props: { children: JSX.Element }) {
  return <Provider store={store}>{props.children}</Provider>
}
