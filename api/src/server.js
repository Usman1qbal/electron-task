const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const axios = require('axios');

// defining the Express app
const app = express();

// defining an array to work as the database (temporary solution)
const ads = [{ title: "Hello, world (again)!" }];

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

// defining an endpoint to return all ads
app.get("/", (req, res) => {
  res.send(ads);
});

var fs = require("fs");

const path = `C:/frontEndSample/userData.json`;

app.get("/test",function(req,res){
  console.log("working")
});


app.post("/save", function(req, res) {
  fs.access(path, fs.F_OK, err => {
    if (err) {
      console.error(err);

      fs.promises
        .mkdir("C:/frontEndSample", { recursive: true })
        .catch(console.error);

      fs.writeFile(path, JSON.stringify([req.body]), function(err) {
        if (err) {
          return res.json({
            success: false
          });
        }
        
      });
    }
    else
    {
      let data =req.body;
      fs.readFile(path, (err, data) => {
        if (err && err.code === "ENOENT") {
            // But the file might not yet exist.  If so, just write the object and bail
            return fs.writeFile(path, JSON.stringify([data]), error => console.error);
        }
        else if (err) {
            // Some other error
            console.error(err);
            return res.json({
              success: false
            });
        }    
        // 2. Otherwise, get its JSON content
        else {
            try {
              
                const fileData = JSON.parse(data);
                
                // 3. Append the object you want
                fileData.push(req.body);
                console.log("=>",req.body,data,fileData)
                //4. Write the file back out
                 fs.writeFile(path, JSON.stringify(fileData), error => console.error)
                 return res.json({
                  success: true
                });
            } catch(exception) {
              return res.json({
                success: false
              });
            }
        }
    });
    }
  });
  
});



// starting the server
app.listen(3001, () => {
  console.log("listening on port 3001");
});
