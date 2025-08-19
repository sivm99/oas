const Logo = ({
  size = "medium",
}: {
  size?: "small" | "medium" | "big" | "extralarge" | "fullpage";
}) => {
  const sizes = {
    small: 24,
    medium: 48,
    big: 64,
    extralarge: 96,
    fullpage: 512,
  };

  const dimension = sizes[size];

  return (
    <svg
      className="rounded-lg"
      fill="none"
      height={dimension}
      viewBox="0 0 48 48"
      width={dimension}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>One Alias Service logo</title>
      {/* Background Circle */}
      <circle
        className="fill-background dark:fill-background transition-colors duration-200"
        cx="24"
        cy="24"
        r="24"
      />

      {/* Envelope Base */}
      <path
        className="fill-primary dark:fill-primary transition-colors duration-200"
        d="M12 16H36V32H12V16Z"
      />

      {/* Envelope Flap */}
      <path
        className="stroke-secondary dark:stroke-secondary transition-colors duration-200"
        d="M12 16L24 26L36 16"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />

      {/* Arrow Symbol */}
      <path
        className="stroke-background dark:stroke-background transition-colors duration-200"
        d="M24 20V32M20 28L24 32L28 28"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />

      {/* Decorative Lines */}
      <path
        className="stroke-secondary dark:stroke-secondary transition-colors duration-200"
        d="M16 22H20M28 22H32"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export default Logo;
