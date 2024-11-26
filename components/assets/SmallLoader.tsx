import Logo from "./Logo";

const SmallLoader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      {/* Main container with perspective */}
      <div className="relative w-48 h-48 perspective-[500px]">
        {/* Central rotating circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        </div>
        {/* Flying papers container */}
        <div className="absolute inset-0">
          {/* Main paper plane */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[fly_3s_ease-in-out_infinite]">
            <Logo size="extralarge" />
          </div>
        </div>
        {/* Trail effects */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border border-primary/20 animate-ping" />
          <div
            className="absolute w-20 h-20 rounded-full border border-primary/30 animate-ping "
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className="absolute w-16 h-16 rounded-full border border-primary/40 animate-ping"
            style={{ animationDelay: "1s" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SmallLoader;
