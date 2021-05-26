export interface IAuthState {
  isAuthenticated: boolean
}

export const initialAuthState: IAuthState = {
  isAuthenticated: false
}

export type AuthAction =
  | {
      type: 'AUTHENTICATE'
      payload: {
        isAuthenticated: boolean
      }
    }
  | {
      type: 'RESET_AUTH_CONTEXT'
    }

export const authReducer = (
  prevState: IAuthState,
  action: AuthAction
): IAuthState => {
  switch (action.type) {
    case 'AUTHENTICATE':
      return { ...prevState, isAuthenticated: action.payload.isAuthenticated }
    case 'RESET_AUTH_CONTEXT':
      return { ...initialAuthState }
    default:
      return prevState
  }
}
