const axios = require("axios");

// Function to create a new ride request
async function createRideRequest() {
	try {
		const response = await axios.post(
			"http://localhost:3000/api/ride-request",
			{
				passengerName: "John Doe",
				pickupLocation: "123 Main St",
				destination: "456 Market St",
			}
		);
		console.log("Ride request created:", response.data);
		return response.data.id;
	} catch (error) {
		console.error("Error creating ride request:", error.message);
	}
}

// Function to poll for ride status updates
async function pollRideStatus(rideId) {
	const pollInterval = 2000; // Poll every 2 seconds

	const poll = async () => {
		try {
			const response = await axios.get(
				`http://localhost:3000/api/ride-request/${rideId}/status`
			);
			console.log("Current ride status:", response.data);

			if (response.data.status === "accepted") {
				console.log(
					"Ride accepted by driver:",
					response.data.driverName
				);
				clearInterval(intervalId);
			}
		} catch (error) {
			console.error("Error polling ride status:", error.message);
		}
	};

	// Start polling
	const intervalId = setInterval(poll, pollInterval);

	// Initial poll
	await poll();
}

// Simulate the ride-hailing process
async function simulateRideHailing() {
	const rideId = await createRideRequest();
	if (rideId) {
		console.log("Starting to poll for ride status...");
		await pollRideStatus(rideId);
	}
}

// Run the simulation
simulateRideHailing();
