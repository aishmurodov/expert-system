import { Context } from "telegraf"
import {UserModel} from "../models";

export interface UserContext extends Context {
    user: UserModel
}