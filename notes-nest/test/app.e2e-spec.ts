import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { AppService } from "./../src/app.service";
import { randFood, randColor } from "@ngneat/falso";

describe("AppController (e2e)", () => {
  let app: INestApplication;
  let appService: AppService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    appService = moduleFixture.get<AppService>(AppService);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it("/notes (POST)", async () => {
    const newNote = {
      name: randFood(),
      category: "Random Thought",
      content: randFood(),
      isArchived: false,
    };

    const response = await request(app.getHttpServer())
      .post("/notes")
      .send(newNote)
      .expect(201);

    expect(response.body.id).toBeDefined();
    expect(response.body.createdAt).toBeDefined();
    expect(response.body.name).toBe(newNote.name);
    expect(response.body.category).toBe(newNote.category);
    expect(response.body.content).toBe(newNote.content);
    expect(response.body.isArchived).toBe(newNote.isArchived);

    const createdNote = await appService.getNoteById(response.body.id);
    expect(createdNote).toBeDefined();
    expect(createdNote?.name).toBe(newNote.name);
    expect(createdNote?.category).toBe(newNote.category);
    expect(createdNote?.content).toBe(newNote.content);
    expect(createdNote?.isArchived).toBe(newNote.isArchived);
  });

  it("/notes/categories (POST)", async () => {
    const newCategory = {
      name: randColor(),
    };

    const response = await request(app.getHttpServer())
      .post("/notes/categories")
      .send(newCategory)
      .expect(201);

    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe(newCategory.name);

    const createdCategory = await appService.getCategoryById(response.body.id);
    expect(createdCategory).toBeDefined();
    expect(createdCategory?.name).toBe(newCategory.name);
  });

  it("/notes/:id (PATCH)", async () => {
    const newNote = {
      name: randFood(),
      category: "Random Thought",
      content: randFood(),
      isArchived: false,
    };
    const createdNote = await appService.createNote(newNote);

    const updatedNote = {
      name: randFood(),
      content: randFood(),
      isArchived: true,
    };

    const response = await request(app.getHttpServer())
      .patch(`/notes/${createdNote.id}`)
      .send(updatedNote)
      .expect(200);

    expect(response.body.id).toBe(createdNote.id);
    expect(response.body.name).toBe(updatedNote.name);
    expect(response.body.content).toBe(updatedNote.content);
    expect(response.body.isArchived).toBe(updatedNote.isArchived);

    const fetchedUpdatedNote = await appService.getNoteById(createdNote.id);
    expect(fetchedUpdatedNote).toBeDefined();
    expect(fetchedUpdatedNote?.name).toBe(updatedNote.name);
    expect(fetchedUpdatedNote?.content).toBe(updatedNote.content);
    expect(fetchedUpdatedNote?.isArchived).toBe(updatedNote.isArchived);
  });

  it("/notes/:id (GET)", async () => {
    const newNote = {
      name: "Test Note",
      category: "Idea",
      content: "This is a test note content.",
      isArchived: false,
    };
    const createdNote = await appService.createNote(newNote);

    const response = await request(app.getHttpServer())
      .get(`/notes/${createdNote.id}`)
      .expect(200);

    expect(response.body.id).toBe(createdNote.id);
    expect(response.body.name).toBe(newNote.name);
    expect(response.body.category).toBe(newNote.category);
    expect(response.body.content).toBe(newNote.content);
    expect(response.body.isArchived).toBe(newNote.isArchived);
  });
});
