require("dotenv").config();
const path = require("path");
const express = require("express");
require("express-async-errors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("./config/logger");
const app = express();
const compression = require("compression");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors"); 


//* initial start
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/quranAudios/yasser', express.static(__dirname + '/quranAudios/yasser'));

// app.use("/quranAudios", express.static(path.join("/quranAudios")));
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, PUT, DELETE, OPTIONS"
//   );
//   next();
// });

//* mongoose connection



mongoose.set('strictQuery', true);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
// mongoose
//   .connect(process.env.DATABASE_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("connected to database"))
//   .catch((error) => logger.error(error));

//* copmresed requests
app.use(helmet());
//* copmresed requests
app.use(morgan('combined'));
//* copmresed requests
app.use(compression());
app.use(
  cors()
);



const project = require("./routes/project_route");
app.use("/api/project", project);


//* if write invalide url or end point send to user an error message
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "false",
    message: "Page not found !",
  });
});

//* listen on port 8080 local host

connectDB().then(() => {
  app.listen(process.env.PORT || 3030, () => {
      console.log("listening for requests");
  })
})

// app.listen(process.env.PORT || 8080, function () {
//   console.log("Expreass server listening on port 8080");
// });
