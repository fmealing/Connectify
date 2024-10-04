import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: {
    id?: string;
    _id?: mongoose.Types.ObjectId; // For cases where you're using ObjectId
  };
}
