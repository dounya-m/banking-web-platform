const mongoose = require("mongoose")

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.DB_URI)
        console.log(`MongoDB Connected: : ${conn.connection.host}` .yellow )
    }catch(error){
        console.log(error);
        process.exit(1)
    }
}
module.exports = connectDB