import Link from "next/link";

function Footer() {
  return (
    <footer className="text-center text-gray-500 p-2 bg-opacity-75 border-t w-full mt-auto relative">
      <div className="max-w-screen-lg mx-auto">
        <p>
          By using our service, you agree to our{" "}
          <Link href="/legal/tos" className="text-blue-500 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/legal/privacy" className="text-blue-500 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <p>&copy; 2025 One Alias Service. All rights reserved.</p>
        {/* <p className="mt-2">
          <span className="text-primary">
            Managed by Shivam Shukla |{" "}
            <Link
              href="/contact"
              className="text-blue-500 hover:underline animate-pulse"
            >
              Contact Us
            </Link>
          </span>
        </p> */}
      </div>
    </footer>
  );
}

export default Footer;
