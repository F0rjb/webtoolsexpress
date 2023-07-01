const request = require("supertest");
const app = require("./app");

require("./testSetup");

describe("User Registration", () => {
  it("should register a new user", async () => {
    const newUser = {
      username: "testuser",
      password: "testpassword",
    };

    const response = await request(app)
      .post("/api/register")
      .send(newUser)
      .expect(201);

    expect(response.body).toHaveProperty("token");
  });

  it("should return an error if user already exists", async () => {
    const existingUser = {
      email: "existing@example.com",
      password: "existingpassword",
    };

    const response = await request(app)
      .post("/api/register")
      .send(existingUser)
      .expect(400);

    expect(response.body).toHaveProperty("message", "User already exists");
  });
});

describe("User Login", () => {
  it("should log in an existing user", async () => {
    const userCredentials = {
      email: "test@example.com",
      password: "testpassword",
    };

    const response = await request(app)
      .post("/api/login")
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
      .post("/api/login")
      .send(nonExistingUser)
      .expect(404);

    expect(response.body).toHaveProperty("message", "User not found");
  });

  it("should return an error if invalid credentials", async () => {
    const invalidCredentials = {
      email: "test@example.com",
      password: "wrongpassword",
    };

    const response = await request(app)
      .post("/api/login")
      .send(invalidCredentials)
      .expect(401);

    expect(response.body).toHaveProperty("message", "Invalid credentials");
  });
});

describe("Admin Registration", () => {
  it("should register a new admin", async () => {
    const newAdmin = {
      username: "adminuser",
      password: "adminpassword",
    };

    const response = await request(app)
      .post("/api/admin/register")
      .set("Authorization", `Bearer your-admin-token`) // Replace with an actual admin token
      .send(newAdmin)
      .expect(201);

    expect(response.body).toHaveProperty("token");
  });

  it("should return an error if admin already exists", async () => {
    const existingAdmin = {
      email: "existingadmin@example.com",
      password: "existingadminpassword",
      role: "admin",
    };

    const response = await request(app)
      .post("/api/admin/register")
      .set("Authorization", `Bearer your-admin-token`) // Replace with an actual admin token
      .send(existingAdmin)
      .expect(400);

    expect(response.body).toHaveProperty("message", "User already exists");
  });
});
