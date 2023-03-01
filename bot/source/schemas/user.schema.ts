import mongoose, {Document, Schema} from "mongoose";
import {UserInterface} from "../models";

export interface UserSchemaInterface extends UserInterface, Document {

}

const UserSchema: Schema = new Schema(
    {
        user_id: {type: Number, required: true},
        currentQuestion: {type: Object, default: null},
    },
    {
        timestamps: true
    }
);

export default mongoose.model<UserSchemaInterface>('User', UserSchema);
