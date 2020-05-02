/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
// import Task from './Task';

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

/* ListSchema.pre('remove', function(next) {
  Task.remove(
    { list: this._id },
    { $pull: { list: this._id } },
    { multi: true }
  ) // if reference exists in multiple documents
    .exec();
  next();
}); */

export default mongoose.model('List', ListSchema);
