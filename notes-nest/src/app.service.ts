import { Injectable, NotFoundException } from "@nestjs/common";
import { Note } from "../models/NotesModels";
import { getDates } from "./helpers";
import { PostgresService } from "./postgres/postgres.service";
import { EditNoteDto, CreateNoteDto, CreateCategoryDto } from "./dto/notes.dto";

@Injectable()
export class AppService {
  constructor(private readonly postgresService: PostgresService) {}

  async getNotes(): Promise<Array<Note>> {
    const result = await this.postgresService.query(`
      SELECT
        n.id,
        n.name,
        n."createdAt",
        n."deletedAt",
        c.name AS category_name,
        n.content,
        n."isArchived"
      FROM
        "notes" n
      JOIN
        "categories" c ON n.category = c.id;`);

    return this.mapToNoteModel(result.rows);
  }

  private mapToNoteModel(rows: any[]): Note[] {
    return rows.map((i) => ({
      id: i.id,
      createdAt: i.createdAt,
      name: i.name,
      category: i.category_name,
      content: i.content,
      dates: getDates(i.content),
      isArchived: i.isArchived,
    }));
  }

  async getNoteById(id: string): Promise<Note | null> {
    const result = await this.postgresService.query(
      `
      SELECT
        n.id,
        n.name,
        n."createdAt",
        n."deletedAt",
        c.name AS category_name,
        n.content,
        n."isArchived"
      FROM
        "notes" n
      JOIN
        "categories" c ON n.category = c.id
      WHERE
        n.id = $1;
    `,
      [id]
    );

    if (result.rows.length === 0) {
      throw new NotFoundException("Note not found");
    }

    const noteData = result.rows[0];
    return {
      id: noteData.id,
      createdAt: noteData.createdAt,
      name: noteData.name,
      category: noteData.category_name,
      content: noteData.content,
      dates: getDates(noteData.content),
      isArchived: noteData.isArchived,
    };
  }

  async createNote(body: CreateNoteDto): Promise<Note | null> {
    const { name, category, content, isArchived } = body;

    const categoryResult = await this.postgresService.query(
      `SELECT id FROM "categories" WHERE name = $1;`,
      [category]
    );

    if (categoryResult.rows.length === 0) {
      throw new NotFoundException(`Category "${category}" not found`);
    }

    const result = await this.postgresService.query(
      `
      INSERT INTO "notes" ("name", "createdAt", "category", "content", "isArchived")
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, "createdAt", "isArchived";
    `,
      [name, new Date(), categoryResult.rows[0].id, content, isArchived]
    );

    if (result.rows.length === 0) {
      throw new Error("Failed to create note");
    }

    const createdNote = result.rows[0];

    return {
      id: createdNote.id,
      createdAt: createdNote.createdAt,
      name: name,
      category: category,
      content: content,
      dates: getDates(content),
      isArchived: createdNote.isArchived,
    };
  }

  async deleteNote(id: string) {
    const result = await this.postgresService.query(
      `
      DELETE FROM "notes"
      WHERE "id" = $1
    `,
      [id]
    );

    if (result.rowCount === 0) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
  }
  async getStats() {
    const result = await this.postgresService.query(`
    WITH note_counts AS (
      SELECT COUNT(*) AS note_count FROM "notes"
    ),
    archived_note_counts AS (
      SELECT COUNT(*) AS archived_note_count FROM "notes" WHERE "isArchived" = true
    ),
    unarchived_note_counts AS (
      SELECT COUNT(*) AS unarchived_note_count FROM "notes" WHERE "isArchived" = false
    )
    SELECT
      (SELECT note_count FROM note_counts) AS note_count,
      (SELECT archived_note_count FROM archived_note_counts) AS archived_note_count,
      (SELECT unarchived_note_count FROM unarchived_note_counts) AS unarchived_note_count;
    `);

    return result.rows;
  }

  async editNote(id: string, body: EditNoteDto): Promise<Note> {
    const result = await this.postgresService.query(
      `
      UPDATE "notes"
      SET
        "name" = COALESCE($1, "name"),
        "category" = COALESCE(
          (SELECT id FROM "categories" WHERE "name" = $2),
          "category"
        ),
        "content" = COALESCE($3, "content"),
        "isArchived" = COALESCE($4, "isArchived")
      WHERE "id" = $5
      RETURNING *;  -- Return the updated row
    `,
      [body.name, body.category, body.content, body.isArchived, id]
    );

    if (result.rows.length === 0) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    const updatedNoteData = result.rows[0];

    return {
      id: updatedNoteData.id,
      createdAt: updatedNoteData.createdAt,
      name: updatedNoteData.name,
      category: updatedNoteData.category_name,
      content: updatedNoteData.content,
      dates: getDates(updatedNoteData.content),
      isArchived: updatedNoteData.isArchived,
    };
  }

  async createCategory(body: CreateCategoryDto): Promise<any> {
    const { name } = body;

    const result = await this.postgresService.query(
      `
      INSERT INTO "categories" ("name")
      VALUES ($1)
      RETURNING id, name;
    `,
      [name]
    );

    if (result.rows.length === 0) {
      throw new Error("Failed to create category");
    }

    return result.rows[0];
  }

  async getCategoryById(id: number): Promise<any> {
    const result = await this.postgresService.query(
      `SELECT id, name FROM "categories" WHERE id = $1;`,
      [id]
    );

    if (result.rows.length === 0) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return result.rows[0];
  }
}
