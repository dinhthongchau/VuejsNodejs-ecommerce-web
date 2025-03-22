// server.js (hoặc index.js)
require("dotenv").config();
const app = require("./src/app");

// Start the server với port được Google Cloud App Engine cấp
const port = process.env.PORT || 8080; // Mặc định là 8080 cho Google Cloud

app.listen(port, () => {
  console.log(`Server (${process.pid}) is running on port ${port}.`);
});
