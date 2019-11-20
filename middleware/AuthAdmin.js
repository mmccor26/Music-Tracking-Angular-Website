// JavaScript File
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  //get the token from the header if present
  
  const token = req.headers["authorization"];
  console.log(token);
  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    console.log('Authed');
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, config.get("myprivatekey"));
    
    if(decoded.sitemanager!==false){
      res.status(401).send("User is not a sitemanger");
    }
    req.user = decoded;
    next();
  } catch (ex) {
    
    //if invalid token
    res.status(400).send("Invalid token.");
  }
};