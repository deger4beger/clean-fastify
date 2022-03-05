export interface UserDTO {
	id: string,
	username: string,
	email: string
	token?: string
}

export interface UserRequestBody extends Omit<UserDTO, "id" | "token"> {
	password: string
}