# Car Washing System

# live_url: https://assignment-3-zeta-rust.vercel.app/

# Features
   1. Customer and admin registration
   2. Service create, delete and update with jwt token
   3. Make available slots for services
   4. Book a service only by customer
   5. customer bookings collection
   6. Protected routes and Not found route
   7. Global error handler

# Technologies
   1. Node.js
   2. Express.js
   3. Mongoose
   4. TypeScript

# To run the app locally:
   1. Clone the repository: git clone https://github.com/waizul01/assignment-3.git

   2. Navigate to the project directory: cd assignment-3

   3. Install the dependencies: pnpm install

   4. Build the typescript files: tsc

   5. Run the app: node dist/serter.js

   6. API endpoints or routes:
      /api/auth/signup (POST), /api/auth/login(POST), /api/services(POST),/api/services/:id(GET), /api/services(GET), /api/services/:id(PUT), /api/services/:id(DELETE) [SOFT DELETE ], /api/services/slots(POST), /api/slots/availability(GET), /api/bookings(POST), /api/bookings(GET), /api/my-bookings(GET)

   7. Create a env file in the root directory and provide
      required environment variables