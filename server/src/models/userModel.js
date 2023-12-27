import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    role: {
      type: String,
      enum: ['user', 'admin', 'superAdmin'],
      default: 'user'
    },
    basket: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Products' },
        quantity: { type: Number, default: 1 }
      }
    ],
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Products' }]
  },
  { timestamps: true }
)

export const User = mongoose.model('Users', userSchema)
