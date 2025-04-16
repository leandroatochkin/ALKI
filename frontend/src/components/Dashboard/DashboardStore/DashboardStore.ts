import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { UserPreview } from "../../../api/UsersSlice"
import { mockUser } from "../../../api/UsersSlice"

interface DashboardState {
    //notifications: Notification[]
    userData: UserPreview
  }

  const initialState: DashboardState = {
    userData: mockUser
  }

  export const dashboardSlice = createSlice({
    name: "dashboardSlice",
    initialState: initialState,
    reducers: {
      setUserData: (state, action: PayloadAction<UserPreview>) => {
        state.userData = action.payload
        //set role
        // if (state.userData.permissions.includes("admin")) {
        //   state.role = "admin"
        //   return
        // } else if (state.userData.permissions.includes("clinician")) {
        //   state.role = "clinician"
        //   return
        // } else {
        //   state.role = "patient"
        // }
      },
    //   setUserNotifications: (state, action: PayloadAction<Notification[]>) => {
    //     state.notifications = action.payload
    //   },
    },
  })
  
  export const {
    setUserData,
  } = dashboardSlice.actions
  export default dashboardSlice.reducer
  