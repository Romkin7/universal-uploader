/** Universal uploaders main server file */
/** Start NodeJS process by running this file */

/** External npm packages */
require('dotenv').config();
const express = require('express'); // webserver is made with express
const bodyParser = require('body-parser'); //used to parse http request body
const fileUpload = require('express-fileupload'); // used to enable req.files in express app
const cors = require('cors'); //used to handle cross origin http requests
const morgan = require('morgan'); //used for logging all incoming http requests

/** NodeJs own internal packages */
const path = require('path');

/** custom built middleware */
const errorHandler = require('./api/handlers/errorHandler');

/** API route endpoints required here
 * 
 * they are used after middleware setup 
 */
const handleFilesRoutes = require('./api/routes/handleFiles');

/** Inintialize express App here */
const app = express();

/** Setup proxy pass and define port,
 *  that node server will listen to incoming requests */
app.set("trust proxy", true);
app.set("port", process.env.PORT || 8080); //If prcess.env.PORT is defined use it or default tot 8080

//use cors
app.use(cors());
//Setup middleware to parse incoming requests to this web api
app.use(bodyParser.json());
app.use(fileUpload());

//Setup morgan production and development logging here
if(app.get("env") === "Websiteion") {
    app.use(morgan("common", {
        skip: function(req, res) {
            return res.statusCode < 400
        }, stream: __dirname + '/../morgan.log'
    }));
} else {
    //In development mode incoming request are logged to console with details
    app.use(morgan('dev'));
}

//Serve react app in production to the browser
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname + "/universal-uploader-client/build")));
    app.get("*", (req, res) => {
        res.sendFile("index.html");
    });
}

//
app.use("/api/files", handleFilesRoutes);

/** Here error handler is returning all kinds of errors app might ecounter */
app.use(errorHandler);

app.listen(app.get("port"), () => {
    console.info(`Universal uploader is now running on port ${app.get("port")}`);
});