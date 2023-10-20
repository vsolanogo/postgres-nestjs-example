import { Injectable } from "@nestjs/common";
import { Pool, QueryResult } from "pg";

@Injectable()
export class PostgresService {
  private pool: Pool;

  constructor() {
    const wewe = {
      user: "vitalii",
      host: process.env.DB_HOST || "db",
      database: process.env.DB_NAME || "example",
      password: "vitalii",
      port: +process.env.DB_PORT || 5432,
    };
    this.pool = new Pool(wewe);
  }

  async query(text: string, values: any[] = []): Promise<QueryResult<any>> {
    const client = await this.pool.connect();
    try {
      return await client.query(text, values);
    } finally {
      client.release();
    }
  }
}
