import { create } from 'zustand'

interface patientStore {
	name: string
	token: string
	isLoggedIn: boolean
	setDetails: (name: string, token: string) => void
}

export const useUserStore = create<patientStore>((set) => ({
	name: '',
	token: '',
	isLoggedIn: false,
	setDetails: (name, token) =>
		set({
			name,
			token,
			isLoggedIn: true
		})
}))

