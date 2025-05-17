import { ArrowRight } from "lucide-react";
import ThreeDCampusModel from "../components/ThreeDCampusModel";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-numl-50/30 via-white to-white dark:from-numl-950/30 dark:via-gray-900 dark:to-gray-900"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 text-xs font-medium text-numl-600 dark:text-numl-300 bg-numl-50 dark:bg-numl-900/50 rounded-full">
              A Gateway to Knowledge & Innovation
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white font-heading leading-tight">
              Welcome to NUML <br className="hidden sm:block" />
              University{" "}
              <span className="text-gray-600 dark:text-gray-400">
                — Where
              </span>{" "}
              <br className="hidden sm:block" />
              Future Leaders Emerge
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
              Empowering Minds, Transforming Futures. Join our community of
              innovators, leaders, and change-makers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#programs"
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#programs")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore NUML
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>

              <a href="#" className="btn-secondary">
                Sign In
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-none">
              <ThreeDCampusModel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
