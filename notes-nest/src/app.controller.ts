import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Delete,
  Patch,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { Note } from "../models/NotesModels";
import { EditNoteDto, CreateNoteDto, CreateCategoryDto } from "./dto/notes.dto";

@Controller("notes")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/stats")
  async getStats(): Promise<any> {
    return this.appService.getStats();
  }

  @Get()
  async getNotes(): Promise<Array<Note>> {
    return this.appService.getNotes();
  }

  @Get("/:id")
  async getNoteById(@Param("id") id: string): Promise<Note | null> {
    return this.appService.getNoteById(id);
  }

  @Post()
  async createNote(@Body() body: CreateNoteDto): Promise<Note> {
    return this.appService.createNote(body);
  }

  @Delete("/:id")
  async deleteNote(@Param("id") id: string) {
    this.appService.deleteNote(id);
  }

  @Patch("/:id")
  async editNote(
    @Param("id") id: string,
    @Body() body: EditNoteDto
  ): Promise<Note> {
    return this.appService.editNote(id, body);
  }

  @Post("/categories")
  async createCategory(@Body() body: CreateCategoryDto): Promise<any> {
    return this.appService.createCategory(body);
  }

  @Get("/categories/:id")
  async getCategoryById(@Param("id") id: string): Promise<any> {
    return this.appService.getCategoryById(+id);
  }
}
