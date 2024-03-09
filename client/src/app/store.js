import todosSlice from './slices/todoSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    todosSlice,
    
  }
})

