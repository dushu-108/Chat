import mongoose from "mongoose";

const connectToMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("Connected to MongoDB");

		// Drop the incorrect index if it exists
		const collections = await mongoose.connection.db.collections();
		const usersCollection = collections.find(collection => collection.collectionName === 'users');
		if (usersCollection) {
			try {
				await usersCollection.dropIndex('userName_1');
				console.log('Dropped incorrect userName index');
			} catch (error) {
				// Index might not exist, which is fine
				console.log('Note: userName index not found or already dropped');
			}
		}
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
		process.exit(1);
	}
};

export default connectToMongoDB;
