import { ImageResponse } from "next/og";
import { ReactElement } from "react";

// Define different style configurations
const styleConfigs = [
  {
    borderColor: "#ff0080",
    shadowColor: "#ff0080",
    name: "Neon Pink",
  },
  {
    borderColor: "#00ff66",
    shadowColor: "#00ff66",
    name: "Matrix Green",
  },
  {
    borderColor: "#33ccff",
    shadowColor: "#33ccff",
    name: "Electric Blue",
  },
  {
    borderColor: "#ffcc00",
    shadowColor: "#ffcc00",
    name: "Cyber Orange",
  },
  {
    borderColor: "#cc66ff",
    shadowColor: "#cc66ff",
    name: "Purple Haze",
  },
];

// Simple components for OG images
const elements = {
  root: (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 style={{ color: "white", fontSize: "48px", marginBottom: "20px" }}>
        One Alias Service
      </h1>
      <p style={{ color: "white", fontSize: "24px" }}></p>
    </div>
  ),
  privacy: (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 style={{ color: "white", fontSize: "48px", marginBottom: "20px" }}>
        Privacy Policy
      </h1>
      <p style={{ color: "white", fontSize: "24px" }}>Protecting Your Data</p>
    </div>
  ),
  tos: (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 style={{ color: "white", fontSize: "48px", marginBottom: "20px" }}>
        Terms of Service
      </h1>
      <p style={{ color: "white", fontSize: "24px" }}>Our Commitment to You</p>
    </div>
  ),
  login: (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 style={{ color: "white", fontSize: "48px", marginBottom: "20px" }}>
        Login
      </h1>
      <p style={{ color: "white", fontSize: "24px" }}>Access Your Account</p>
    </div>
  ),
  signup: (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 style={{ color: "white", fontSize: "48px", marginBottom: "20px" }}>
        Sign Up
      </h1>
      <p style={{ color: "white", fontSize: "24px" }}>Join Our Community</p>
    </div>
  ),
  deleteme: (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 style={{ color: "white", fontSize: "48px", marginBottom: "20px" }}>
        Delete Account
      </h1>
      <p style={{ color: "white", fontSize: "24px" }}>Account Management</p>
    </div>
  ),
};

// Function to get random style
const getRandomStyle = () => {
  const randomIndex = Math.floor(Math.random() * styleConfigs.length);
  return styleConfigs[randomIndex];
};

// Simple Navbar component for OG images
const SimpleNavbar = () => (
  <div
    style={{
      width: "100%",
      padding: "20px",
      marginBottom: "20px",
      borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <h2 style={{ color: "white", fontSize: "32px" }}>One Alias Service</h2>
  </div>
);

export async function GET(request: Request) {
  try {
    const style = getRandomStyle();
    const a = new URL(request.url).searchParams.get("a");

    // Determine which element to render
    const elementToRender =
      a && a in elements ? elements[a as keyof typeof elements] : elements.root;

    const res = new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            padding: "40px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#000000",
              border: `4px solid ${style.borderColor}`,
              borderRadius: "20px",
              boxShadow: `0 0 40px ${style.shadowColor}`,
            }}
          >
            <SimpleNavbar />
            {elementToRender}
          </div>
        </div>
      ) as ReactElement,
      {
        width: 1200,
        height: 630,
        emoji: "twemoji",
      },
    );
    return res;
  } catch (error) {
    console.error("Error generating image:", error);
    return new Response(`Failed to generate image: ${error}`, {
      status: 500,
    });
  }
}
