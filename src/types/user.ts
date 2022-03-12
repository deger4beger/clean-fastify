import { Paycard, Profile } from '../lib/orm/entity';

export interface UserDTO {
	id: string,
	username: string,
	email: string
	token?: string
	paycard?: Paycard
	profile?: Profile
}

export interface UserRequestSignupBody extends Omit<UserDTO, "id" | "token"> {
	password: string
}

export interface UserRequestSigninBody extends Pick<UserDTO, "email"> {
	password: string
}

export interface UserRequestChangeUsernameBody extends Pick<UserDTO, "username"> {}

export interface UserRequestGetInfoParams {
	userId: string
}

export interface UserResponseChangeAvatar extends Pick<Profile, "avatarUrl"> {}

export interface UserRequestTopUpBalanceBody {
	balanceToAdd: number
}

export interface UserResponseTopUpBalance extends Pick<Paycard, "balance"> {}