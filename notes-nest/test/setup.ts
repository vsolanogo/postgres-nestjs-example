// import { Test, TestingModule } from "@nestjs/testing";
// import { PostgresService } from "../src/postgres/postgres.service";
// import { AppModule } from "../src/app.module";

// let postgresService: PostgresService;

// beforeAll(async () => {
//   const moduleFixture: TestingModule = await Test.createTestingModule({
//     imports: [AppModule],
//   }).compile();

//   postgresService = moduleFixture.get<PostgresService>(PostgresService);
// });

// beforeEach(async () => {
//   await postgresService.query(
//     `TRUNCATE TABLE "notes", "categories" RESTART IDENTITY CASCADE`
//   );
// });
