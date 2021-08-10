import firebase from 'firebase'

export interface IAuthState {
  inProcessing: boolean
  user: firebase.User
  isAuthenticated: boolean
}

export const initialAuthState: IAuthState = {
  inProcessing: true,
  user: null,
  isAuthenticated: false,
}

export type AuthAction =
  | {
      type: 'AUTHENTICATE'
      payload: {
        user: firebase.User
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
      return {
        ...prevState,
        ...action.payload,
        isAuthenticated: !!action.payload.user,
        inProcessing: false,
      }
    case 'RESET_AUTH_CONTEXT':
      return { ...initialAuthState }
    default:
      return prevState
  }
}
