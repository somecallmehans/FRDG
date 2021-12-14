import "dotenv/config";

export default {
  name: "FRDG",
  version: "1.0.0",
  extra: {
    JWT: process.env.JWT,
    BASE_URL: process.env.BASE_URL
  }
}
