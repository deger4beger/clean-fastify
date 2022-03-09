export interface UserDTO {
	id: string,
	username: string,
	email: string
	token?: string
}

export interface UserRequestSignupBody extends Omit<UserDTO, "id" | "token"> {
	password: string
}

export interface UserRequestSigninBody extends Pick<UserDTO, "email"> {
	password: string
}

export interface UserRequestChangeUsernameBody extends Pick<UserDTO, "username"> {}