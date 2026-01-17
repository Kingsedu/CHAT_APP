import express from "express";

const app = express();
app.use(express.json());
const PORT = 8080;

app.get("/", (req, res) => {
  res.json({ status: "successful", message: "the serve is active" });
});
console.log("checking if set-up is correct");

app.listen(PORT, () => {
  console.log(`server is running a http://localhost:${PORT}`);
});
