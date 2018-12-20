import { combineReducers } from 'redux'

import nav from './nav'
import contactsReducer from '../contacts/reducers'
import categoryReducer from '../notflix/reducers'
import popularReducers from '../notflix/popularreducers'
import moviesReducer from '../notflix/allmoviereducers'
import getCategoriesreducers from '../notflix/getCategoriesreducers'
const appReducer = combineReducers({
  nav,
  contactsReducer,
  categoryReducer,
  popularReducers,
  moviesReducer,
  getCategoriesreducers
})

export default appReducer
