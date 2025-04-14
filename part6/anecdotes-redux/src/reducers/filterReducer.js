import { createSlice } from "@reduxjs/toolkit"

// export const filterActionCreator = (filter) => {
//   return {
//     type: 'FILTER',
//     payload: filter
//   }
// }

// const filterReducer = (state = '', action) => {
//   switch (action.type) {
//     case 'FILTER':
//       return action.payload
//     default: return state
//   }
// }

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterReducer(state, action) {
      return action.payload
    }
  }
})

export const { filterReducer } = filterSlice.actions
export default filterSlice.reducer