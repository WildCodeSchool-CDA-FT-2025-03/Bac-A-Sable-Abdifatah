import express from 'express';
import router from './router'
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});