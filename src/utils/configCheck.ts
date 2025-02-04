import Logger from "../core/Logger";

const requiredEnvVars = [
  "NODE_ENV",
  "PORT",
  "CORS_URL",
  "LOG_DIR",
  // Add any other required environment variables here
];

export const checkEnvVariables = () => {
  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    Logger.error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
    process.exit(1); // Terminate the program
  }
};
