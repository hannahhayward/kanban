import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TaskSchema = new Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, default: 'maybe you want to be a little more descriptive ...' },
    completed: { type: Boolean, default: false },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
    listId: { type: Schema.Types.ObjectId, ref: 'List', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
