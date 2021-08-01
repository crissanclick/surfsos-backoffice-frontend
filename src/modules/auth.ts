
// import api from './api'
import { computed, inject, reactive, toRefs, watch } from 'vue'

const AUTH_KEY = 'surfsos_backoffice_token'
export const AUTH_TOKEN = 'token'

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    [ AUTH_TOKEN ]: string;
}

interface AuthState {
    authenticating: boolean;
    user?: User;
    error?: Error;
}

const state = reactive<AuthState>({
    authenticating: false,
    user: undefined,
    error: undefined,
})

export const useAuth = () => {
    const setUser = (payload: User, remember: boolean = true): void => {
        if ( remember ) {
            window.localStorage.setItem(AUTH_KEY, payload[ AUTH_TOKEN ])
        }

        state.user = payload
        state.error = undefined
    }

    const logout = (): Promise<void> => {
        window.localStorage.removeItem(AUTH_KEY)
        return Promise.resolve(state.user = undefined)
    }


    return {
        setUser,
        logout,
        ...toRefs(state),
    }

}