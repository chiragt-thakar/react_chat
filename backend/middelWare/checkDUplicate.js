// Define middleware to handle duplicate key errors
const duplicateCheck =  (error, doc, next) => {
    if (error.name === 'MongoError' && error.code === 11000) {
        console.error("Duplicate key error:", error);
        // Handle the error as needed
    } else {
        next();
    }
};
module.exports = duplicateCheck;