import express from "express";
import cors from "cors";
import router from "./routes";
import notFound from "./middlewares/notFound";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import Env from "./config";
import ImageKit from "imagekit";

const app = express();

// Middleware to parse JSON request bodies
app.use(
  cors({
    origin: ["http://localhost:5173", "https://cleanridebd.netlify.app"],
    credentials: true,
  })
);
app.use(express.json());

const imagekit = new ImageKit({
  urlEndpoint: Env.imagekit_urlEndpoint as string,
  publicKey: Env.imagekit_publicKey as string,
  privateKey: Env.imagekit_privateKey as string,
});

// Routes
app.use("/api", router);

//upload image with imagekit
// allow cross-origin requests
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.get("/api/image-upload", function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
