import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PostgresModule } from "./postgres/postgres.module";
import { PostgresService } from "./postgres/postgres.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: !!process.env.NODE_ENV,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    PostgresModule,
  ],
  controllers: [AppController],
  providers: [AppService, PostgresService],
})
export class AppModule {}
