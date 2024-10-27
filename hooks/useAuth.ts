// Mock Auth utils
// API routes will be in @/app/api/

// Mock user state
const mockUser = {
  username: "testuser",
  email: "test@example.com",
};

// Mock authentication functions
const signIn = async (credentials: { email: string; password: string }) => {
  console.log("Mock sign in:", credentials);
  return mockUser;
};

const signOut = async () => {
  "use server";
  console.log("Mock sign out");
  return true;
};

const signUp = async (userData: {
  email: string;
  password: string;
  username: string;
}) => {
  console.log("Mock sign up:", userData);
  return mockUser;
};

export { mockUser, signIn, signOut, signUp };
