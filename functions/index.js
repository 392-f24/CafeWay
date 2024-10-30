const functions = require("firebase-functions");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { database, ref, set, push, onValue } = require("../src/utilities/firebase");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://cafeway-12c73.web.app"],
    methods: ["GET", "POST"],
  },
});

const reviewsRef = ref(database, "reviews");
const availabilityRef = ref(database, "availability");

let reviews = [];
let availability = {};

onValue(reviewsRef, (snapshot) => {
  reviews = snapshot.val() || [];
  io.emit("updateReviews", reviews);
});

onValue(availabilityRef, (snapshot) => {
  availability = snapshot.val() || {};
  io.emit("updateAvailability", availability);
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.emit("updateReviews", reviews);
  socket.emit("updateAvailability", availability);

  socket.on("newReview", (review) => {
    const newReviewRef = push(reviewsRef);
    set(newReviewRef, review).then(() => {
    });
  });

  socket.on("newReply", ({ reviewId, text }) => {
    const reviewIndex = reviews.findIndex((r) => r.id === reviewId);
    if (reviewIndex !== -1) {
      reviews[reviewIndex].replies.push(text);
      set(reviewsRef, reviews).then(() => {
      });
    }
  });

  socket.on("updateAvailability", ({ cafeId, seating, outlets }) => {
    const timestamp = new Date().toLocaleString();
    const update = { seating, outlets, timestamp };

    if (!availability[cafeId]) {
      availability[cafeId] = { history: [] };
    }
    availability[cafeId].history.unshift(update);
    availability[cafeId].history = availability[cafeId].history.slice(0, 4);

    set(availabilityRef, availability).then(() => {
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

exports.api = functions.https.onRequest((req, res) => {
  server.emit("request", req, res);
});
