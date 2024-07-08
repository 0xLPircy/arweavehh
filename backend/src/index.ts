import express, { Request, Response } from "express";
import { unstake } from "./unstake";
import cors from "cors";

const app = express();
const port = 3000;
// Use the CORS middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.post("/unstake", async (req: Request, res: Response) => {
  console.log("body", req.body);
  try {
    const address = req.body.address;

    const txn = await unstake(address);
    res.json({
      transaction: txn,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Error in unstaking the tokens");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
