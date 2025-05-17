import {
  GlobeIcon,
  Trophy,
  Users,
  Award,
  BookOpen,
  GraduationCap,
} from "lucide-react";

const About = () => {
  const timelineItems = [
    {
      year: "1969",
      title: "Foundation",
      description:
        "NUML was established as National Institute of Modern Languages.",
    },
    {
      year: "1987",
      title: "University Status",
      description: "Granted university status by the federal government.",
    },
    {
      year: "2000",
      title: "Expansion",
      description: "Major campus expansion and introduction of new programs.",
    },
    {
      year: "2012",
      title: "International Recognition",
      description:
        "Achieved international accreditation for language programs.",
    },
    {
      year: "2023",
      title: "Innovation Hub",
      description:
        "Launched state-of-the-art language learning technology center.",
    },
  ];

  return (
    <section id="about" className="section-container">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          About <span className="text-gradient">NUML</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Dedicated to excellence in modern language education and cultural
          understanding.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* University Image Collage */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-numl-100 dark:bg-numl-800/30 p-2 rounded-lg transform rotate-3 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&q=80&w=500"
                  alt="NUML Campus"
                  className="w-full h-auto rounded"
                />
              </div>
              <div className="bg-numl-100 dark:bg-numl-800/30 p-2 rounded-lg transform -rotate-2 shadow-md mt-4">
                <img
                  src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=500"
                  alt="NUML Architecture"
                  className="w-full h-auto rounded"
                />
              </div>
              <div className="bg-numl-100 dark:bg-numl-800/30 p-2 rounded-lg transform -rotate-1 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?auto=format&fit=crop&q=80&w=500"
                  alt="Campus Buildings"
                  className="w-full h-auto rounded"
                />
              </div>
              <div className="bg-numl-100 dark:bg-numl-800/30 p-2 rounded-lg transform rotate-2 shadow-md mt-4">
                <img
                  src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=500"
                  alt="Modern Architecture"
                  className="w-full h-auto rounded"
                />
              </div>
            </div>

            {/* Central badge */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg border-4 border-numl-100 dark:border-numl-800">
              <div className="text-center">
                <div className="font-bold text-xl text-numl-600 dark:text-numl-400">
                  NUML
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Est. 1969
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* University stats and info */}
        <div>
          <h3 className="text-2xl font-bold mb-6">
            National University of Modern Languages
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            NUML stands as Pakistan's premier institution for language education
            and cultural studies. With a commitment to academic excellence and
            innovation, we offer diverse programs across multiple disciplines
            while specializing in language acquisition, translation, and
            intercultural communication.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md hover:-translate-y-1">
              <div className="w-12 h-12 bg-numl-50 dark:bg-numl-900/50 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-numl-600 dark:text-numl-400" />
              </div>
              <h4 className="text-lg font-semibold mb-1">15,000+</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Students Enrolled
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md hover:-translate-y-1">
              <div className="w-12 h-12 bg-numl-50 dark:bg-numl-900/50 rounded-full flex items-center justify-center mb-4">
                <GlobeIcon className="w-6 h-6 text-numl-600 dark:text-numl-400" />
              </div>
              <h4 className="text-lg font-semibold mb-1">26</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Languages Taught
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md hover:-translate-y-1">
              <div className="w-12 h-12 bg-numl-50 dark:bg-numl-900/50 rounded-full flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-numl-600 dark:text-numl-400" />
              </div>
              <h4 className="text-lg font-semibold mb-1">50+</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Years of Excellence
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline - Redesigned */}
      <div className="mt-20">
        <h3 className="text-2xl font-bold text-center mb-12">
          Our Journey Through Time
        </h3>

        <div className="relative">
          {/* Timeline items in a horizontal layout for desktop */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Horizontal line */}
              <div className="absolute left-0 right-0 h-1 top-16 bg-gradient-to-r from-numl-300 via-numl-500 to-numl-700 dark:from-numl-700 dark:via-numl-500 dark:to-numl-300"></div>

              {/* Timeline items */}
              <div className="grid grid-cols-5 gap-4">
                {timelineItems.map((item, index) => (
                  <div key={item.year} className="relative pt-24 px-2">
                    {/* Year circle */}
                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-numl-800 border-4 border-numl-500 dark:border-numl-400 flex items-center justify-center z-10">
                      <span className="text-xs font-bold text-numl-600 dark:text-numl-300">
                        {item.year}
                      </span>
                    </div>

                    {/* Content card */}
                    <div className="bg-white dark:bg-numl-800 p-4 rounded-lg shadow-md h-full border border-gray-100 dark:border-numl-700 hover:shadow-lg transition-shadow">
                      <h4 className="text-lg font-semibold mb-2 text-numl-700 dark:text-numl-300">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline for mobile as cards */}
          <div className="md:hidden space-y-4">
            {timelineItems.map((item) => (
              <div
                key={item.year}
                className="bg-white dark:bg-numl-800 p-4 rounded-lg shadow border border-gray-100 dark:border-numl-700"
              >
                <div className="flex items-center mb-2">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-numl-100 dark:bg-numl-700 flex items-center justify-center mr-4 border-2 border-numl-500 dark:border-numl-400">
                    <span className="font-bold text-numl-600 dark:text-numl-300">
                      {item.year}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-numl-700 dark:text-numl-300">
                    {item.title}
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 pl-16">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
