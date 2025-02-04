# Social Media Profile Link API

## Description

This project is a Node.js application that uses Express to provide an API for retrieving and sanitizing social media profile links. It includes features such as request logging, error handling, and environment variable configuration checks.

## Features

- Retrieve social media profile links using Puppeteer.
- Sanitize URLs to ensure only profile links are returned.
- Validate incoming requests using Joi.
- Log requests and responses for debugging and monitoring.
- Check for required environment variables on startup.

## Prerequisites

- Node.js (version 14 or later)
- npm (Node Package Manager)
- Git
- GitHub CLI (`gh`)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/namekart-rohit/automated-socials.git
   cd automated-socials
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Copy `.env.example` to `.env` and fill in the required environment variables.

   ```bash
   cp .env.example .env
   ```

## Usage

1. **Start the application in production mode:**

   ```bash
   npm run start
   ```

   This command builds and runs the application in production mode. The server will start on the port specified in your `.env` file.

2. **Start the application in development mode:**

   ```bash
   npm run dev
   ```

   This command runs the application with development settings, typically with hot-reloading enabled.

3. **Build the application:**

   ```bash
   npm run build
   ```

   This command compiles the application for production without starting the server.

4. **API Endpoints:**

   - **POST** `/api/socials`: Retrieve sanitized social media profile links.
     - **Request Body:**
       ```json
       {
         "query": "https://www.example.com"
       }
       ```

## Logging

The application logs all incoming requests and outgoing responses. Logs are stored in the directory specified by the `LOG_DIR` environment variable.

## Environment Variables

Ensure the following environment variables are set in your `.env` file:

- `NODE_ENV`: The environment in which the application is running (e.g., `development`, `production`).
- `PORT`: The port on which the server will run.
- `CORS_URL`: The URL allowed for CORS.
- `LOG_DIR`: The directory where logs will be stored.

## Deployment

To deploy this application, ensure all environment variables are set and the application is built for production.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.
