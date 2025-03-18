import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("❌ Thêm biến môi trường MONGODB_URI vào .env");
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect().then(async (db) => {
    console.log("✅ MongoDB connected");

    // Lấy danh sách database để kiểm tra kết nối
    const adminDb = db.db().admin();
    const dbList = await adminDb.listDatabases();
    console.log("📂 Danh sách database:", dbList);

    return db;
  }).catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
