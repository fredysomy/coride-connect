/* eslint-disable no-undef */
// server.js

const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const axios = require("axios");
const cors = require("cors");
// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json"); // Path to your service account key file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// POST route to handle storing tokens
app.post("/store-token", (req, res) => {
  const { token } = req.body;
  // Store token in your database (e.g., Firestore)
  // You can also perform additional validation or processing here
  console.log("Received token:", token);
  res.status(200).send("Token stored successfully");
});

// POST route to send notifications
app.post("/send-notification", async (req, res) => {
  const { email, title, body, url } = req.body;

  try {
    // Fetch the token from the "tokens" collection based on the email
    const tokenSnapshot = await admin
      .firestore()
      .collection("tokens")
      .where("email", "==", email)
      .get();

    if (tokenSnapshot.empty) {
      console.log("No token found for the email:", email);
      res.status(404).send("No token found for the email");
      return;
    }

    // Send notification to each device associated with the email
    const tokens = tokenSnapshot.docs.map((doc) => doc.data().token);
    const messages = tokens.map((token) => ({
      token: token,
      notification: {
        title: title,
        body: body,
      },
      webpush: {
        fcmOptions: {
          link: url, // Include the URL as the click_action
        },
      },
    }));

    const responses = await admin.messaging().sendAll(messages);
    console.log("Notifications sent successfully:", responses);
    res.status(200).send("Notifications sent successfully");
  } catch (error) {
    console.error("Error sending notifications:", error);
    res.status(500).send("Error sending notifications");
  }
});


app.post("/get_fare",async (req,res)=>{

  const options = {
    method: 'GET',
    url: 'https://maps.googleapis.com/maps/api/distancematrix/json',
    params: {
      destinations: req.body.destinations,
      origins: req.body.origins,
      units: 'metric',
      key: 'AIzaSyDjLpn8fDYOJJ9Yj7PVsJzslIiVfk2iiHg'
    }
  };
  
  try {
    const { data } = await axios.request(options);
    console.log(options)
    res.json(data)
  } catch (error) {
    console.log(error)
    res.json({error:error})
  }
 
})
app.get("/",(req,res)=>{
  res.send("Hii")
})
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
