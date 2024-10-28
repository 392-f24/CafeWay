import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { database, ref, set, push, onValue } from './firebase.js';

const PORT = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

// Firebase references
const reviewsRef = ref(database, 'reviews');
const availabilityRef = ref(database, 'availability');

// Initialize in-memory storage
let reviews = [];
let availability = {};

// Load initial data from Firebase
onValue(reviewsRef, (snapshot) => {
  reviews = snapshot.val() || [];
  io.emit('updateReviews', reviews); // Emit to all clients when data changes
});

onValue(availabilityRef, (snapshot) => {
  availability = snapshot.val() || {};
  io.emit('updateAvailability', availability);
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.emit('updateReviews', reviews);
  socket.emit('updateAvailability', availability);

  socket.on('newReview', (review) => {
    const newReviewRef = push(reviewsRef);
    set(newReviewRef, review).then(() => {
      // Firebase `onValue` listener will trigger and send updates to all clients
    });
  });

  socket.on('newReply', ({ reviewId, text }) => {
    const reviewIndex = reviews.findIndex((r) => r.id === reviewId);
    if (reviewIndex !== -1) {
      reviews[reviewIndex].replies.push(text);
      set(reviewsRef, reviews).then(() => {
        // Firebase `onValue` listener will handle broadcasting updated reviews
      });
    }
  });

  socket.on('updateAvailability', ({ cafeId, seating, outlets }) => {
    const timestamp = new Date().toLocaleString();
    const update = { seating, outlets, timestamp };

    // Update availability for a cafe in Firebase
    if (!availability[cafeId]) {
      availability[cafeId] = { history: [] };
    }
    availability[cafeId].history.unshift(update);
    availability[cafeId].history = availability[cafeId].history.slice(0, 4);

    set(availabilityRef, availability).then(() => {
      // Firebase `onValue` listener will broadcast updates to all clients
    });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
