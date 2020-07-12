// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT =  process.env.PORT || 3000;
// var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(express.static("public"));

// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);
// Hot restaurant 

// =============================================================

// new Reservation will construct when adding reservation through POST and it will be pushed to an empty table array
class Reservation {
  constructor(name, phone, email, uniqueId) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.uniqueId = uniqueId;
  }
}

// / Reservatrion arrays
// =============================================================
var reservedTables = [];
var waitingList = [];


// Displays all reservations
app.get("/api/tables", function (req, res) {
  res.json(reservedTables);
});

app.get("/api/add", function (req, res) {
  res.json(waitingList)
});

// create new reservation
// =============================================================
app.post("/api/tables", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var sentReservation = req.body;
  console.log(sentReservation);

  let reservation = new Reservation();

  reservation.name = sentReservation.name;
  reservation.phone = sentReservation.phone;
  reservation.email = sentReservation.email;
  reservation.uniqueId = sentReservation.uniqueId;

  // if (reservedTables == null) {
  //   reservedTables = new Array();
  // }
  if (reservedTables.length < 5) {
    reservedTables.push(reservation);
    res.json(true);
  }else{

    // if (waitingList == null) {
    //   waitingList = new Array();
    // }
    waitingList.push(reservation)
    res.json(false);
  }
  
  console.log(reservation);
  
res.json(reservation)
})






// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});






// // Displays a single reaervation, or returns false
// app.get("/api/reservations/:reservation", function (req, res) {
//   var chosen = req.params.reservation;

//   console.log(chosen);

//   // for (var i = 0; i < reservations.length; i++) {
//   //   if (chosen === characters[i].routeName) {
//   //     return res.json(characters[i]);
//   //   }
//   // }

//   return res.json(false);
// });

// // Create New Characters - takes in JSON input
// app.post("/api/characters", function (req, res) {
//   // req.body hosts is equal to the JSON post sent from the user
//   // This works because of our body parsing middleware
//   var newCharacter = req.body;

//   // Using a RegEx Pattern to remove spaces from newCharacter
//   // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
//   newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

//   console.log(newCharacter);

//   characters.push(newCharacter);

//   res.json(newCharacter);
// });

// // Starts the server to begin listening
// // =============================================================


// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);



app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
