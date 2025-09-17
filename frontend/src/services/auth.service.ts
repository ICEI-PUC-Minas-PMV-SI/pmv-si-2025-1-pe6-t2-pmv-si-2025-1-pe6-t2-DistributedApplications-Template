// Simple auth service for the frontend
import axios from "axios";

// Mock data for demonstration
const USERS = [
  {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    password: "password123",
    photoUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop",
    preferences: ["fiction", "sci-fi", "fantasy"],
    joinDate: new Date("2023-01-15"),
  },
];

// This would be replaced with actual API calls in a real app
export const authService = {
  // Login function
  login: async (email: string, password: string) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
      { email, password }
    );
    const data = await response.data;

    if (!data) {
      throw new Error("Invalid credentials");
    }

    return {
      user: data,
      // user: {
      //   id: user.id,
      //   name: user.name,
      //   email: user.email,
      //   photoUrl: user.photoUrl,
      // },
      // token,
    };
  },

  // Register function

  register: async (name: string, email: string, password: string) => {
    const newUser = {
      name,
      email,
      password,
      photoUrl: "",
      preferences: [],
      joinDate: new Date(),
    };

    console.log("BCK", import.meta.env.VITE_BACKEND_URL);

    //localhost:3000
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/users`,
      newUser
    );
    const userData = response.data;

    const token = "mock-jwt-token";

    localStorage.setItem(
      "user",
      JSON.stringify({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        photoUrl: userData.photoUrl,
        token,
      })
    );

    return userData;
  },

  // Logout function
  logout: () => {
    localStorage.removeItem("user");
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // Check if user is logged in
  isLoggedIn: () => {
    return !!localStorage.getItem("user");
  },
};
