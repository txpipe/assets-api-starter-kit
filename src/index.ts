import express, { Application } from "express";
import { assetsController } from "./controllers/assetsController";

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.get("/assets/policy/:policyId", async (req, res) => {
  const assets = await assetsController.getAssets(req.params.policyId);
  res.send(assets);
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
