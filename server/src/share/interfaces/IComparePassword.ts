export interface IComparePassword {
  compare(rawPassword: string, hashedPassword: string): boolean;
}
