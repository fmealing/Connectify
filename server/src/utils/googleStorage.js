import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
});

const bucket = storage.bucket(process.env.GCLOUD_BUCKET_NAME);

export default bucket;
