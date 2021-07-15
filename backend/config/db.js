import mongoose from 'mongoose';


const connecDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })

        console.log(`MongoDB connected: ${conn.connection.host}`.bgYellow)
    } catch (error) {
        console.error(`Error: ${error,message}`.red.underline)
        process.exit(1)
    }
};

export default connecDB;