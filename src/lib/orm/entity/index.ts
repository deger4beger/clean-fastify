import { User } from "./user/user"
import { Paycard } from "./paycard/paycard"
import { Profile } from "./profile/profile"
import { Bill } from "./bill"
import { Message } from './message'

export default [User, Paycard, Profile, Bill, Message]

export * from "./user/user"
export * from "./paycard/paycard"
export * from "./profile/profile"
export * from "./bill"
export * from "./message"