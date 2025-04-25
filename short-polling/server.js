const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Simulated database of ride requests
let rideRequests = [];
let rideId = 1;

// Endpoint to create a new ride request
app.post("/api/ride-request", (req, res) => {
	const { passengerName, pickupLocation, destination } = req.body;
	const newRide = {
		id: rideId++,
		passengerName,
		pickupLocation,
		destination,
		status: "pending",
		createdAt: new Date(),
	};
	rideRequests.push(newRide);
	res.json(newRide);
});

// Endpoint to update ride status (simulating driver accepting the ride)
app.put("/api/ride-request/:id/accept", (req, res) => {
	const rideId = parseInt(req.params.id);
	const ride = rideRequests.find((r) => r.id === rideId);
	if (ride) {
		ride.status = "accepted";
		ride.driverName = "Driver " + Math.floor(Math.random() * 1000);
		res.json(ride);
	} else {
		res.status(404).json({ error: "Ride not found" });
	}
});

// Short polling endpoint - clients will call this repeatedly
app.get("/api/ride-request/:id/status", (req, res) => {
	const rideId = parseInt(req.params.id);
	const ride = rideRequests.find((r) => r.id === rideId);

	if (!ride) {
		return res.status(404).json({ error: "Ride not found" });
	}

	res.json({
		id: ride.id,
		status: ride.status,
		driverName: ride.driverName || null,
		updatedAt: new Date(),
	});
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
