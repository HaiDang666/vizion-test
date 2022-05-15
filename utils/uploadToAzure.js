const { ContainerClient } = require("@azure/storage-blob");
const config = require("../config").azure;

const uploadToAzure = async (file, subPath) => {
	const azureStorageBlobConnectionString = config.connectionString;
	if (!azureStorageBlobConnectionString) {
		console.log(
			"Required environment variable AZURE_STORAGE_BLOB_CONNECTION_STRING is either missing or empty."
		);
		return null;
	}

	const azureStorageBlobContainerName = config.containerName;
	if (!azureStorageBlobContainerName) {
		console.log(
			"Required environment variable AZURE_STORAGE_BLOB_CONTAINER_NAME is either missing or empty."
		);
		return null;
	}

	const containerClient = new ContainerClient(
		azureStorageBlobConnectionString,
		azureStorageBlobContainerName
	);
	const blockBlobClient = containerClient.getBlockBlobClient(
		`${subPath}/${file.originalname}`
	);
	await blockBlobClient.uploadFile(file.path);

	return blockBlobClient.url.replace("%2F", "/");
};

module.exports = uploadToAzure;
