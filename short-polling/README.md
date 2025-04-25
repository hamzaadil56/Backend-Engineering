# Short Polling Implementation in Node.js

This project demonstrates the concept of short polling using a ride-hailing platform as an example. It shows how a client can repeatedly check for updates from a server at regular intervals.

## What is Short Polling?

Short polling is a technique where a client repeatedly requests updates from a server at regular intervals. In this example, we simulate a ride-hailing platform where:

-   A passenger creates a ride request
-   The client (passenger's app) continuously polls the server to check if a driver has accepted the ride
-   Once a driver accepts the ride, the polling stops

## Project Structure

```
short-polling/
├── server.js        # Express server implementation
├── client.js        # Client-side polling implementation
└── package.json     # Project dependencies
```

## Key Components

### Server-side (server.js)

The server implements three main endpoints:

1. `POST /api/ride-request`

    - Creates a new ride request
    - Returns the created ride details

2. `PUT /api/ride-request/:id/accept`

    - Simulates a driver accepting a ride
    - Updates the ride status to 'accepted'

3. `GET /api/ride-request/:id/status`
    - The polling endpoint
    - Returns current ride status
    - Called repeatedly by the client

### Client-side (client.js)

The client implementation includes:

1. `createRideRequest()`

    - Creates a new ride request
    - Returns the ride ID

2. `pollRideStatus(rideId)`
    - Polls the status endpoint every 2 seconds
    - Stops polling when ride is accepted

## How to Run the Example

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
node server.js
```

3. In another terminal, run the client:

```bash
node client.js
```

4. To simulate a driver accepting the ride, use curl:

```bash
curl -X PUT http://localhost:3000/api/ride-request/1/accept -H "Content-Type: application/json"
```

## Advantages of Short Polling

-   Simple to implement
-   Works with any HTTP server
-   No special server requirements

## Disadvantages

-   Creates more server load due to frequent requests
-   Higher latency (up to the polling interval)
-   Less efficient than WebSockets or Server-Sent Events

## Real-world Use Cases

Short polling is commonly used in:

-   Ride-hailing applications (as demonstrated)
-   Order tracking systems
-   Simple chat applications
-   Status monitoring systems

## Alternative Approaches

For more efficient real-time communication, consider:

-   WebSockets
-   Server-Sent Events (SSE)
-   Long Polling
-   WebRTC

## Dependencies

-   express: ^4.18.2
-   cors: ^2.8.5
-   axios: ^1.6.2 (for client-side implementation)
