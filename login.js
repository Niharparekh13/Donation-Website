import express from 'express';
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import crypto from "crypto";
import session from 'express-session'; 

const __dirname = dirname(fileURLToPath(import.meta.url)) + "/views";

const DB_NAME = "project 2"; // Updated database name
const DB_PORT = "5432";
const DB_PASSWORD = "nihar130902";
const DB_HOST = "localhost";

const app = express();
const port = 3000;
app.use(express.static("./public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("style"));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

async function main() {
  const db = new pg.Client({
    user: "postgres",
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
  });

  await db.connect();

  await seeder(db);

  await setupRoutes(db);

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

main();

async function seeder(db) {
  await db.query(
    "CREATE TABLE IF NOT EXISTS users2 ( user_id VARCHAR(64) PRIMARY KEY, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, firstname VARCHAR(100) NOT NULL, lastname VARCHAR(100) NOT NULL, address VARCHAR(255), streetaddress VARCHAR(255), city VARCHAR(100), state VARCHAR(100), phonenumber VARCHAR(20))"
  );

  await db.query(
    "CREATE TABLE IF NOT EXISTS donations2 (id SERIAL PRIMARY KEY, user_id VARCHAR(64) NOT NULL, amount NUMERIC NOT NULL)"
  );
}


async function setupRoutes(db) {
  app.get("/", (req, res) => {
    res.render(__dirname + "/login.ejs");
  });

  app.post("/add-donation", async (req, res) => {
    const { amount } = req.body;
    const userId = req.session.userId;

    if (!userId) {
      console.error("User ID not found in session");
      return res.status(401).send("User not authenticated");
    }

    try {
      await db.query("INSERT INTO donations2 (user_id, amount) VALUES ($1, $2)", [userId, amount]);
      res.redirect(302, "/thankyou.ejs");
    } catch (error) {
      console.error("Error adding donation:", error);
      res.status(500).send("Internal server error");
    }
  });

  app.get("/donors", async (req, res) => {
    try {
      const donations = await db.query("SELECT * FROM donations2");
      res.send(donations.rows);
    } catch (error) {
      console.error("Error fetching donors:", error);
      res.status(500).send("Internal server error");
    }
  });

  app.post("/register", async (req, res) => {
    const {
      email,
      password,
      firstname,
      lastname,
      address,
      streetaddress,
      city,
      state,
      phonenumber,
    } = req.body;

    try {
      const userId = generateUserId(email);

      const checkResult = await db.query("SELECT * FROM users2 WHERE email = $1", [email]);

      if (checkResult.rows.length > 0) {
        return res.send("Email already exists. Try logging in.");
      } else {
        await db.query(
          "INSERT INTO users2 (user_id, email, password, firstname, lastname, address, streetaddress, city, state, phonenumber) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
          [
            userId,
            email,
            password,
            firstname,
            lastname,
            address,
            streetaddress,
            city,
            state,
            phonenumber,
          ]
        );
        
        // Set userId in session after successful registration
        req.session.userId = userId;

        res.render(__dirname + "/login.ejs");
      }
    } catch (err) {
      console.error("Error inserting user:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/check", async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const result = await db.query("SELECT * FROM users2 WHERE email ILIKE $1", [email]);

      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedPassword = user.password;

        if (password === storedPassword) {
          // Set userId in session after successful login
          req.session.userId = user.user_id;
          res.redirect("/index.ejs");
        } else {
          res.status(401).send("Incorrect Password");
        }
      } else {
        res.status(404).send("User not found");
      }
    } catch (err) {
      console.error("Error checking user:", err);
      res.status(500).send("Internal server error");
    }
  });

// Route to retrieve previous donations
app.get("/previous-donations", async (req, res) => {
  try {
    // Assuming you have a way to identify the current user, e.g., through session or token
    const userId = req.session.userId; // Assuming userId is available in the session

    // Check if the current user has made any donations
    const result = await db.query("SELECT * FROM donations2 WHERE user_id = $1", [
      userId,
    ]);

    if (result.rows.length === 0) {
      // If no donations are found for the current user, render a message accordingly
      return res.render(__dirname + "/previous-donations.ejs", { noDonations: true });
    }

    // If donations are found, pass the donations data to the view as a local variable
    const donations = result.rows;
    res.render(__dirname + "/previous-donations.ejs", { donations, noDonations: false });
  } catch (error) {
    console.error("Error fetching previous donations:", error);
    res.status(500).send("Internal server error");
  }
});




}

function generateUserId(email) {
  const hash = crypto.createHash('sha256');
  hash.update(email);
  const userId = hash.digest('hex');
  return userId;
}


app.get("/Aboutus.ejs", (req, res) => {
  res.render(__dirname + "/Aboutus.ejs");
});

app.get("/index.ejs", (req, res) => {
  res.render(__dirname + "/index.ejs");
});

app.get("/Contactus.ejs", (req, res) => {
  res.render(__dirname + "/Contactus.ejs");
});

app.get("/donation.ejs", (req, res) => {
  res.render(__dirname + "/donation.ejs");
});

app.get("/oshosadhantrust.ejs", (req, res) => {
  res.render(__dirname + "/oshosadhantrust.ejs");
});

app.get("/benjaminworld.ejs", (req, res) => {
  res.render(__dirname + "/benjaminworld.ejs");
});

app.get("/paramhit.ejs", (req, res) => {
  res.render(__dirname + "/paramhit.ejs");
});

app.get("/loginsignup.ejs", (req, res) => {
  res.render(__dirname + "/loginsignup.ejs");
});

app.get("/login.ejs", (req, res) => {
  res.render(__dirname + "/login.ejs");
});

app.get("/signup.ejs", (req, res) => {
  res.render(__dirname + "/signup.ejs");
});

app.get("/thankyou.ejs", (req, res) => {
  res.render(__dirname + "/thankyou.ejs");
});


