require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const userRoute = require("./routes/route.user");
const productRoute = require("./routes/route.product");
const orderRoute = require("./routes/route.order");
const cartRoute = require("./routes/route.cart");
const profileRoute = require("./routes/route.profile");
const reviewRoute = require("./routes/route.review");
const port = process.env.PORT;
const uri = process.env.MONGO_URI;

console.log(".envs :" ,process.env);


// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());



// routes
app.use("/api/users", userRoute);
// app.use("/api/products", productRoute);
// app.use("/api/orders", orderRoute);
// app.use("/api/carts", cartRoute);
// app.use("/api/profiles", profileRoute);
// app.use("/api/reviews", reviewRoute);

app.get("/", (req, res) => res.json({message:"hello from ecommerce api!" }));



// connect to db
mongoose
    .connect(uri)
    .then(() => {
        console.log("connected to database");
        // listen to port
        app.listen(port, () => {
            console.log("listening for requests on port", port);
        });
    })
    .catch((err) => {
        console.log(err);
    });
