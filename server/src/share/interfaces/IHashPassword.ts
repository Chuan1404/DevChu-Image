export interface IHashPassword {
  hash(rawPassword: string): string;
}