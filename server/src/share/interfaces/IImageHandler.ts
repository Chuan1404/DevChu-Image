export interface IImageHandler {
  checkFile(file: Express.Multer.File): Promise<boolean>;
  resizedFile(file: Express.Multer.File, targetWidth: number): Promise<Express.Multer.File>;
  resizedFileWithDimensions(
    file: Express.Multer.File,
    targetWidth: number,
    targetHeight: number
  ): Promise<Express.Multer.File>;
  addCopyRight(file: Express.Multer.File): Promise<string>
}
