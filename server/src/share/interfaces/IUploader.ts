import { EFileQuality } from "../enums"

export default interface IUploader {
    connect(): any
    uploadFile(file: Express.Multer.File, quality: EFileQuality): Promise<string>
}
