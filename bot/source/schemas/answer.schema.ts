import mongoose, {Document, Schema, Types} from "mongoose";
import {UserInterface} from "../models";

export interface AnswerSchemaInterface extends Document {
    user: UserInterface,
    question: string,
    answer: string
}

const UserSchema: Schema = new Schema(
    {
        user: {ref: 'User', type: Types.ObjectId},
        question: {type: String},
        answer: {type: String}
    },
    {
        timestamps: true
    }
);

export default mongoose.model<AnswerSchemaInterface>('Answer', UserSchema);
