require('dotenv').config();

module.exports = {
  port: process.env.PORT || 4000,
  db: {
    uri: process.env.MONGODB_URI || "mongodb://localhost/test",
  },
  azure: {
    accountName: process.env.AZURE_STORAGE_BLOB_ACCOUNT_NAME,
    accountKey: process.env.AZURE_STORAGE_BLOB_ACCOUNT_KEY,
    containerName: process.env.AZURE_STORAGE_BLOB_CONTAINER_NAME,
    connectionString: process.env.AZURE_STORAGE_BLOB_CONNECTION_STRING
  }
}