import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

let reviews = []; // Store all reviews
let availability = {}; // Store availability history for cafes

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.emit('updateReviews', reviews);
  socket.emit('updateAvailability', availability);

  socket.on('newReview', (review) => {
    reviews.push(review);
    io.emit('updateReviews', reviews);
  });

  socket.on('newReply', ({ reviewId, text }) => {
    const review = reviews.find((r) => r.id === reviewId);
    if (review) {
      review.replies.push(text);
      io.emit('updateReviews', reviews);
    }
  });

  socket.on('updateAvailability', ({ cafeId, seating, outlets }) => {
    const timestamp = new Date().toLocaleString();
    const update = { seating, outlets, timestamp };

    // Initialize the availability history if not present
    if (!availability[cafeId]) {
      availability[cafeId] = { history: [] };
    }

    // Add the new update to the history and keep only the last 4
    availability[cafeId].history.unshift(update);
    availability[cafeId].history = availability[cafeId].history.slice(0, 4);

    io.emit('updateAvailability', availability);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
