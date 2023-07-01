const request = require("supertest");
const app = require("./app");
const jwt = require("jsonwebtoken");
const Users = require("./models/Users");

describe("Authentication and Authorization", () => {
  let userToken;
  let adminToken;

  beforeAll(async () => {
    // Create a user for testing
    const user = new Users({
      email: "testuser@example.com",
      password: "testpassword",
      role: "user",
    });
    await user.save();

    // Generate a JWT token for the user
    userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Create an admin for testing
    const admin = new Users({
      email: "admin@example.com",
      password: "adminpassword",
      role: "admin",
    });
    await admin.save();

    // Generate a JWT token for the admin
    adminToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  });

  afterAll(async () => {
    // Clean up the database after tests
    await Users.deleteMany();
  });

  describe("User Registration", () => {
    it("should register a new user", async () => {
      const newUser = {
        email: "newuser@example.com",
        password: "newpassword",
        role: "user",
      };

      const response = await request(app)
        .post("/api/auth/register")
        .send(newUser)
        .expect(201);

      expect(response.body).toHaveProperty("token");
      expect(response.body).toHaveProperty(
        "message",
        `${newUser.role} registered successfully`
      );
    });

    it("should return an error if user already exists", async () => {
      const existingUser = {
        email: "testuser@example.com",
        password: "existingpassword",
        role: "user",
      };

      const response = await request(app)
        .post("/api/auth/register")
        .send(existingUser)
        .expect(400);

      expect(response.body).toHaveProperty("message", "User already exists");
    });
  });

  describe("User Login", () => {
    it("should log in an existing user", async () => {
      const userCredentials = {
        email: "testuser@example.com",
        password: "testpassword",
      };

      const response = await request(app)
        .post("/api/auth/login")
        .send(userCredentials)
        .expect(200);

      expect(response.body).toHaveProperty("token");
    });

    it("should return an error if user not found", async () => {
      const nonExistingUser = {
        email: "nonexisting@example.com",
        password: "nonexistingpassword",
      };

      const response = await request(app)
        .post("/api/auth/login")
        .send(nonExistingUser)
        .expect(404);

      expect(response.body).toHaveProperty("message", "User not found");
    });

    it("should return an error if invalid credentials", async () => {
      const invalidCredentials = {
        email: "testuser@example.com",
        password: "wrongpassword",
      };

      const response = await request(app)
        .post("/api/auth/login")
        .send(invalidCredentials)
        .expect(401);

      expect(response.body).toHaveProperty("message", "Invalid credentials");
    });
  });

  describe("Admin Registration", () => {
    it("should register a new admin", async () => {
      const newAdmin = {
        email: "newadmin@example.com",
        password: "newpassword",
        role: "admin",
      };

      const response = await request(app)
        .post("/api/auth/admin/register")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(newAdmin)
        .expect(201);

      expect(response.body).toHaveProperty("token");
      expect(response.body).toHaveProperty(
        "message",
        `${newAdmin.role} registered successfully`
      );
    });

    it("should return an error if user already exists", async () => {
      const existingAdmin = {
        email: "admin@example.com",
        password: "existingpassword",
        role: "admin",
      };

      const response = await request(app)
        .post("/api/auth/admin/register")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(existingAdmin)
        .expect(400);

      expect(response.body).toHaveProperty("message", "User already exists");
    });

    it("should return an error if unauthorized", async () => {
      const newAdmin = {
        email: "unauthorizedadmin@example.com",
        password: "newpassword",
        role: "admin",
      };

      const response = await request(app)
        .post("/api/auth/admin/register")
        .set("Authorization", `Bearer ${userToken}`)
        .send(newAdmin)
        .expect(401);

      expect(response.body).toHaveProperty(
        "message",
        "Unauthorized: Admin access required"
      );
    });
  });
});
