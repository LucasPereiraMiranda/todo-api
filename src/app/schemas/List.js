import mongoose from 'mongoose';

const ListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
    description: {
      type: String,
      required: false,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { timestamps: true }
);

ListSchema.index({ user: 1, name: 1 }, { unique: true });

export default mongoose.model('List', ListSchema);
