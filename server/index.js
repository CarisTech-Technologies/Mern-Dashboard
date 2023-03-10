import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

//data imports
import User from "./models/User.js";
import Product from "./models/product.js";
import ProductStat from "./models/productStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import {dataUser, dataProduct,dataProductStat,dataTransaction,dataOverallStat, dataAffiliateStat} from './data/index.js'
import AffiliateStat from "./models/AffiliateStat.js";

/* CONFIRGURATION */

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

/*ROUTES*/

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/*MONGOOSE SETUP */

const PORT =process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
   useNewUrlparser: true,
   useUnifiedTopology: true ,
}).then(() => {
    app.listen(PORT, () => console.log(`server port: ${PORT}`));
    /*ONLY ADD DATA ONE TIME */
    // AffiliateStat.insertMany(dataAffiliateStat);
   // Product.insertMany(dataProduct);
   //OverallStat.insertMany(dataOverallStat);
  // ProductStat.insertMany(dataProductStat);
  // Transaction.insertMany(dataTransaction);
   // User.insertMany(dataUser);
}).catch((error) => console.log(`${error} did not connect`))