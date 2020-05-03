import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    path: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

FileSchema.virtual('url').get(function() {
  return `${process.env.APP_URL}/files/${this.path}`;
});

export default mongoose.model('File', FileSchema);
