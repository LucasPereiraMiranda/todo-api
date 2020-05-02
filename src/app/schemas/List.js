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
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

ListSchema.index({ User: 1, name: 1 }, { unique: true });

export default mongoose.model('List', ListSchema);
