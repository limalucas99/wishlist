import {
  MongoClient,
  type Collection,
  type Db,
  type Document,
  type WithId,
} from "mongodb";

class MongoHelperClass {
  private client: MongoClient | null = null;
  private db: Db | null = null;

  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri);
    this.db = this.client.db();
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
    }
  }

  getCollection(name: string): Collection {
    if (!this.client || !this.db) {
      throw new Error("Not connected to MongoDB");
    }
    return this.db.collection(name);
  }

  mongoMapper<T extends Document>(mongoObject: WithId<T>): unknown {
    const { _id, ...rest } = mongoObject;
    return { ...rest, id: _id.toHexString() };
  }
}

export const MongoHelper = new MongoHelperClass();
