import { Module } from "@nestjs/common";
import { PostgresService } from "./postgres.service";
import { PostgresController } from "./postgres.controller";

@Module({
  providers: [PostgresService],
  controllers: [PostgresController],
})
export class PostgresModule {}
