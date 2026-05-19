import { Schema, model, type HydratedDocument, type Model } from "mongoose";

export const USER_ROLES = ["admin", "sales"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export interface User {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

type UserDocument = HydratedDocument<User> & {
  toAuthJSON: () => AuthUser;
};

type UserModel = Model<User, object, object, object, UserDocument>;

const userSchema = new Schema<User, UserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      enum: USER_ROLES,
      default: "sales",
      required: true
    }
  },
  {
    timestamps: true
  }
);

userSchema.method("toAuthJSON", function toAuthJSON(): AuthUser {
  return {
    id: this._id.toString(),
    name: this.name,
    email: this.email,
    role: this.role
  };
});

export const UserModel = model<User, UserModel>("User", userSchema);

