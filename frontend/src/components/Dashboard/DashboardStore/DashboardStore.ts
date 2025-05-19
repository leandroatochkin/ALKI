import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { UserPreview } from "../../../api/UsersSlice"

interface DashboardState {
    //notifications: Notification[]
    userData: UserPreview
    userId: string | null
  }

  const initialState: DashboardState = {
    userData: {
      id: '',
      firstName: '',
      lastName: '',
      middleName: '',
      email: '',
      phoneNumber: '',
      countryCode: '',
      addressLine1: '',
      addressLine2: '',
      monthlyRevenue: 0,
      state: '',
      city: '',
      postalCode: '',
      autoCalculateMRR: false,
      theme: 'dark',
      permissions: '',
      isPremium: false,
      parentUserId: '', 
      password: ''
    },
    userId: null
  }

  export const dashboardSlice = createSlice({
    name: "dashboardSlice",
    initialState: initialState,
    reducers: {
      setUserData: (state, action: PayloadAction<UserPreview>) => {
        state.userData = action.payload
      },
      setUserId: (state, action) => {
        state.userId = action.payload;
      },
      clearUserData: (state) => {
        state.userData = initialState.userData
        state.userId = null
      }
    },
  })
  
  export const {
    setUserData,
    setUserId
  } = dashboardSlice.actions
  export default dashboardSlice.reducer
  