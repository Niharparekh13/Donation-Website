import express from "express";

const app = express();
const port = 3000;

app.set("view engine","ejs");

app.use(express.static("./public"));


app.get("/", (req,res)=>{
  res.render("index.ejs");
});
app.get("/index.ejs", (req,res)=>{
  res.render("index.ejs");
});
app.get("/Aboutus.ejs", (req, res) => {
  res.render("Aboutus.ejs");
});
app.get("/Contactus.ejs", (req, res) => {
  res.render("Contactus.ejs");
});

app.get("/signup.ejs",(req,res) => {
    res.render("signup.ejs");
});
app.get("/login.ejs",(req,res) => {
  res.render("login.ejs");
});

app.get("/oshosadhantrust.ejs",(req,res) =>{
  res.render("oshosadhantrust.ejs");
} );

app.get("/paramhit.ejs",(req,res) => {
  res.render("paramhit.ejs")
});

app.get("/loginsignup.ejs",(req,res) =>{
  res.render("loginsignup.ejs");
});

app.get("/donation.ejs",(req,res) =>{
  res.render("donation.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});