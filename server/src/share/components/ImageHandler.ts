import sharp, { Metadata } from "sharp";
import { IImageHandler } from "../interfaces/IImageHandler";
import { EQuantiryValue } from "../enums";

export default class ImageHandler implements IImageHandler {
  async checkFile(file: Express.Multer.File): Promise<boolean> {
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      throw new Error("Unsupported file type. Only JPEG and PNG are allowed.");
    }

    const metadata: Metadata = await sharp(file.buffer).metadata();

    const { width, height } = metadata;

    if (!width || !height) {
      throw new Error("Width or Height of image is not valid");
    }

    if (height < EQuantiryValue.MINIMUM && width < EQuantiryValue.MINIMUM) {
      throw new Error(
        `Minimum quality required is ${EQuantiryValue.MINIMUM} pixels. Current is ${width}x${height}`
      );
    }

    return true;
  }
  async resizedFile(
    file: Express.Multer.File,
    targetWidth: number
  ): Promise<Express.Multer.File> {
    const metadata = await sharp(file.buffer).metadata();
    const { width: originWidth, height: originHeight } = metadata;

    if (!originWidth || !originHeight) {
      throw new Error("Width or Height of image is not valid");
    }

    let rate = originHeight / originWidth;
    rate = rate > 1 ? 1 / rate : rate;

    let targetHeight = Math.round(targetWidth * rate);

    if (originWidth < originHeight) {
      [targetWidth, targetHeight] = [targetHeight, targetWidth];
    }

    const mimeToFormat: { [key: string]: keyof sharp.FormatEnum } = {
      "image/jpeg": "jpeg",
      "image/png": "png",
      "image/webp": "webp",
      // Add more formats as needed
    };

    const resizedImageBuffer = await sharp(file.buffer)
      .resize(Math.round(targetWidth), Math.round(targetHeight))
      .toFormat(mimeToFormat[file.mimetype])
      .toBuffer();
    let resizedFile: Express.Multer.File = {
      ...file,
      buffer: resizedImageBuffer,
      size: resizedImageBuffer.length,
    };
    return resizedFile;
  }

  async resizedFileWithDimensions(
    file: Express.Multer.File,
    targetWidth: number,
    targetHeight: number
  ): Promise<Express.Multer.File> {
    const mimeToFormat: { [key: string]: keyof sharp.FormatEnum } = {
      "image/jpeg": "jpeg",
      "image/png": "png",
      "image/webp": "webp",
      // Add more formats as needed
    };

    const resizedImageBuffer = await sharp(file.buffer)
      .resize(Math.round(targetWidth), Math.round(targetHeight))
      .toFormat(mimeToFormat[file.mimetype])
      .toBuffer();
    let resizedFile: Express.Multer.File = {
      ...file,
      buffer: resizedImageBuffer,
      size: resizedImageBuffer.length,
    };
    return resizedFile;
  }

  async addCopyRight(file: Express.Multer.File): Promise<string> {
    //
    throw new Error();
  }
}
