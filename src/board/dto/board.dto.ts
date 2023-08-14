import { IsNotEmpty, IsString } from "class-validator";

export class BoardRequestDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  content?: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}