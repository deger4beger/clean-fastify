export interface UserDTO {
	id: string,
	username: string,
	email: string
}

export interface UserRequestBody extends Omit<UserDTO, "id"> {
	password: string
}