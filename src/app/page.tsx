import { RainbowButton } from "@/components/magicui/rainbow-button";
import Link from "next/link";

const Home = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen overflow-y-hidden">
      <div className="relative flex flex-col items-center justify-center py-16 lg:py-24">
        <div className="text-center">
          <span className="text-sm text-primary font-medium tracking-tight bg-primary/10 px-4 py-2 rounded-full">
            Streamline Your Invoicing Today
          </span>
          <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter">
            Effortless Invoice{" "}
            <span className="block -mt-2 bg-gradient-to-l from-blue-500 via-teal-500 to-green-500 text-transparent bg-clip-text p-2">
              Management
            </span>
          </h1>

          <div className="mt-8 mb-16">
            <Link href="/dashboard">
              <RainbowButton>Start Managing Invoices</RainbowButton>
            </Link>
            <p className="mt-6">
              <Link href="/terms" className="text-blue-500 hover:underline">View Terms and Conditions</Link>
            </p>
          </div>
        </div>

        <div className="relative items-center w-full py-12 mx-auto mt-24">
          <svg
            className="absolute inset-0 -mt-48 blur-3xl opacity-60"
            style={{ zIndex: -1 }}
            fill="none"
            viewBox="0 0 400 400"
            height="100%"
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <g filter="url(#filter0_f_10_20)">
                <path
                  d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z"
                  fill="#FF6B6B"
                ></path>
                <path
                  d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z"
                  fill="#6A82FB"
                ></path>
                <path
                  d="M320 400H400V78.75L106.2 134.75L320 400Z"
                  fill="#4A55A2"
                ></path>
                <path
                  d="M400 0H128.6L106.2 134.75L400 78.75V0Z"
                  fill="#2C3E50"
                ></path>
              </g>
            </g>
            <defs>
              <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="720.666"
                id="filter0_f_10_20"
                width="720.666"
                x="-160.333"
                y="-160.333"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  mode="normal"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  result="effect1_foregroundBlur_10_20"
                  stdDeviation="80.1666"
                ></feGaussianBlur>
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </main>
  );
};

export default Home;