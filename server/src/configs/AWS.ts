import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import { v4 } from "uuid";
import { EFileQuality } from "../share/enums";
import IUploader from "../share/interfaces/IUploader";

class AWS implements IUploader {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = this.connect();
  }

  connect() {
    const s3Client = new S3Client({
      region: process.env.AWS_REGION ?? "ap-southeast-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
      },
    });
    return s3Client;
  }

  async uploadFile(file: Express.Multer.File, quality: EFileQuality) {
    const { buffer, originalname, mimetype } = file;
    const bucketName =
      quality == EFileQuality.ROOT
        ? process.env.AWS_S3_BUCKET_PRIVATE_NAME
        : process.env.AWS_S3_BUCKET_PUBLIC_NAME;

    const key = `images/${quality.toLowerCase()}/${v4() + originalname}`;
    try {
      const uploadParams: PutObjectCommandInput = {
        Bucket: bucketName,
        Key: key,
        Body: buffer,
        ContentType: mimetype,
      };

      const command = new PutObjectCommand(uploadParams);
      await this.s3Client.send(command);

      const fileUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
      return fileUrl;
    } catch (error) {
      console.log(error)
      throw new Error(`Failed to upload file: ${(error as Error).message}`);
    }
  }
}

export default AWS;
