export enum EFileType {
  JPEG = "jpeg",
  JPG = "jpg",
  PNG = "png",
}

export enum EAccountStatus {
  VERIFIED = "VERIFIED",
  UNVERIFIED = "UNVERIFIED",
  BANNED = "BANNED",
}

export enum EFileQuality {
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  DISPLAY = "DISPLAY",
  ROOT = "ROOT",
  AVATAR = "AVATAR",
}

export enum EQuantiryValue {
  MEDIUM = 1280,
  HIGH = 1920,
  DISPLAY = 640,
  AVATAR = 180,

  MINIMUM = 2000
}

export enum EPaymentMethod {
  MOMO = "MOMO",
  CASH = "CASH",
}

export enum EUserRole {
  ROLE_CUSTOMER = "ROLE_CUSTOMER",
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_EDITOR = "ROLE_EDITOR",
}

export enum EModelStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DELETED = "DELETED",
}