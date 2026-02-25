



// import { MongoClient } from 'mongodb';

// const uri = process.env.MONGODB_URI;
// const options = {
//   maxPoolSize: 10,
//   serverSelectionTimeoutMS: 10000, // 10 seconds timeout
//   socketTimeoutMS: 45000,
//   connectTimeoutMS: 10000,
// };

// let client;
// let clientPromise: Promise<MongoClient>;

// if (!process.env.MONGODB_URI) {
//   throw new Error('Please add your Mongo URI to .env.local');
// }

// // Global error handler for unhandled rejections
// if (typeof process !== 'undefined') {
//   process.on('unhandledRejection', (reason, promise) => {
//     console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
//   });
// }

// if (process.env.NODE_ENV === 'development') {
//   let globalWithMongo = global as typeof globalThis & {
//     _mongoClientPromise?: Promise<MongoClient>;
//   };

//   if (!globalWithMongo._mongoClientPromise) {
//     console.log('⏳ Connecting to MongoDB...');
//     client = new MongoClient(uri, options);
//     globalWithMongo._mongoClientPromise = client.connect()
//       .then((client) => {
//         console.log('✅ MongoDB connected successfully');
//         return client;
//       })
//       .catch((err) => {
//         console.error('❌ MongoDB connection failed:', err);
//         console.error('❌ Connection string:', uri?.replace(/\/\/[^:]+:[^@]+@/, '//****:****@'));
//         throw err;
//       });
//   }
//   clientPromise = globalWithMongo._mongoClientPromise;
// } else {
//   console.log('⏳ Connecting to MongoDB in production...');
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect()
//     .then((client) => {
//       console.log('✅ MongoDB connected successfully');
//       return client;
//     })
//     .catch((err) => {
//       console.error('❌ MongoDB connection failed:', err);
//       throw err;
//     });
// }

// export default clientPromise;   





import { MongoClient, MongoClientOptions } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 10000, // 10 seconds timeout
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
};

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Global error handler for unhandled rejections
if (typeof process !== 'undefined') {
  process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  });
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    console.log('⏳ Connecting to MongoDB...');
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect()
      .then((client) => {
        console.log('✅ MongoDB connected successfully');
        return client;
      })
      .catch((err) => {
        console.error('❌ MongoDB connection failed:', err);
        console.error('❌ Connection string:', uri.replace(/\/\/[^:]+:[^@]+@/, '//****:****@'));
        throw err;
      });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  console.log('⏳ Connecting to MongoDB in production...');
  client = new MongoClient(uri, options);
  clientPromise = client.connect()
    .then((client) => {
      console.log('✅ MongoDB connected successfully');
      return client;
    })
    .catch((err) => {
      console.error('❌ MongoDB connection failed:', err);
      throw err;
    });
}

export default clientPromise;