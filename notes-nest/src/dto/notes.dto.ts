import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class EditNoteDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsOptional()
  isArchived: boolean;
}

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsOptional()
  isArchived: boolean;
}

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}