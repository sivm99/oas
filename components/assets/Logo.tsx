const Logo = ({
  size = "medium",
}: {
  size?: "small" | "medium" | "big" | "extralarge";
}) => {
  const sizes = {
    small: 24,
    medium: 48,
    big: 64,
    extralarge: 96,
  };

  const dimension = sizes[size];

  return (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="rounded-lg"
    >
      {/* Background Circle */}
      <circle
        cx="24"
        cy="24"
        r="24"
        className="fill-background dark:fill-background transition-colors duration-200"
      />

      {/* Envelope Base */}
      <path
        d="M12 16H36V32H12V16Z"
        className="fill-primary dark:fill-primary transition-colors duration-200"
      />

      {/* Envelope Flap */}
      <path
        d="M12 16L24 26L36 16"
        className="stroke-secondary dark:stroke-secondary transition-colors duration-200"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Arrow Symbol */}
      <path
        d="M24 20V32M20 28L24 32L28 28"
        className="stroke-background dark:stroke-background transition-colors duration-200"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Decorative Lines */}
      <path
        d="M16 22H20M28 22H32"
        className="stroke-secondary dark:stroke-secondary transition-colors duration-200"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Logo;
