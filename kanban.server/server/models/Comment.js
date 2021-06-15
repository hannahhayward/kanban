import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CommentSchema = new Schema(
  {
    body: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
    listId: { type: Schema.Types.ObjectId, ref: 'List', required: true },
    TaskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
CommentSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
