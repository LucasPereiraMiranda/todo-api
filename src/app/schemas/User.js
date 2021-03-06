/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    birthday: {
      type: Date,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'File',
      required: false,
    },
  },
  { timestamps: true }
);

UserSchema.index({ User: 1, avatar_id: 1 });

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

UserSchema.pre('findOneAndUpdate', function(next) {
  this._update.password = bcrypt.hashSync(this._update.password, 10);
  next();
});

UserSchema.methods.checkPassword = function(password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }
      resolve(same);
    });
  });
};

export default mongoose.model('User', UserSchema);
