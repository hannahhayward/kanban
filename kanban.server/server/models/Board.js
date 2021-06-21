import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const BoardSchema = new Schema(
  {
    name: { type: String, required: true },
    color: { type: String, default: '#2779bf' },
    backgroundImg: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

BoardSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
