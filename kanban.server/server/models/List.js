import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const ListSchema = new Schema(
  {
    name: { type: String, required: true },
    color: { type: String, default: '#2779bf' },
    backgroundImg: { type: String },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
ListSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
