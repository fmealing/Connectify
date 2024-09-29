import path from "path";

// Provide the relative path to your credentials file
const relativePath = "./server/sinuous-city-436905-u6-ad4e64da9e61.json";

// Resolve and log the absolute path
console.log("Absolute path:", path.resolve(__dirname, relativePath));
