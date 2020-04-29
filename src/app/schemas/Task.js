import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'complete', 'pastdue'],
      default: 'active',
    },
    color: {
      type: String,
      default: 'gray',
    },
    notes: String,
    due: Date,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
    list: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'list',
      required: true,
    },
  },
  { timestamps: true }
);

TaskSchema.index({ list: 1, name: 1 }, { unique: true });

export default mongoose.model('item', TaskSchema);
