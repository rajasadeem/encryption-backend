import express, { response } from "express";
import cors from "cors";
import CryptoJS from "crypto-js";

const app = express();

app.use(express.json());
app.use(cors());

const secretKey =
  "cc8c82f863ebef860de235244fa77d283e25d97f17ea036242d3237b39e3dbfe";

const decryptPayload = (ciphertext, secretKey) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};

app.get("/", (_, res) => {
  res.send("Server Running");
});

app.post("/api/user", (req, res) => {
  try {
    const { data } = req.body;

    const decryptedData = decryptPayload(data, secretKey);

    console.log("Decrypted Data", decryptedData);

    return res.status(200).json(decryptedData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running: http://localhost:${PORT}`);
});
