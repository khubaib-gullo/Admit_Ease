import {
  BookOpenIcon,
  GraduationCap,
  ScrollIcon,
  SearchIcon,
} from "lucide-react";
import { useState } from "react";

const programs = [
  {
    id: 1,
    title: "Bachelor of Arts in English",
    level: "undergraduate",
    department: "languages",
    duration: "4 Years",
    description:
      "Comprehensive English language and literature program with a focus on critical thinking and cultural context.",
  },
  {
    id: 2,
    title: "Master of Business Administration",
    level: "postgraduate",
    department: "business",
    duration: "2 Years",
    description:
      "Advanced business education focusing on global management, leadership and strategic planning.",
  },
  {
    id: 3,
    title: "PhD in Applied Linguistics",
    level: "research",
    department: "languages",
    duration: "3-5 Years",
    description:
      "Cutting-edge research in language acquisition, sociolinguistics, and language teaching methodologies.",
  },
  {
    id: 4,
    title: "Bachelor of Computer Science",
    level: "undergraduate",
    department: "it",
    duration: "4 Years",
    description:
      "Comprehensive program covering programming, algorithms, AI, and software engineering principles.",
  },
  {
    id: 5,
    title: "Master of Translation Studies",
    level: "postgraduate",
    department: "languages",
    duration: "2 Years",
    description:
      "Professional training in translation theory and practice across multiple language pairs.",
  },
  {
    id: 6,
    title: "Bachelor of International Relations",
    level: "undergraduate",
    department: "humanities",
    duration: "4 Years",
    description:
      "Interdisciplinary program exploring global politics, diplomacy, and international organizations.",
  },
  {
    id: 7,
    title: "Master of TESOL",
    level: "postgraduate",
    department: "languages",
    duration: "1.5 Years",
    description:
      "Teaching English to Speakers of Other Languages certification for global language educators.",
  },
  {
    id: 8,
    title: "PhD in Computer Science",
    level: "research",
    department: "it",
    duration: "3-5 Years",
    description:
      "Advanced research in artificial intelligence, data science, and computational linguistics.",
  },
];

const Programs = () => {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filterOptions = {
    levels: [
      { value: "undergraduate", label: "Undergraduate" },
      { value: "postgraduate", label: "Postgraduate" },
      { value: "research", label: "Research" },
    ],
    departments: [
      { value: "languages", label: "Languages" },
      { value: "business", label: "Business" },
      { value: "it", label: "IT & Computing" },
      { value: "humanities", label: "Humanities" },
    ],
  };

  const filteredPrograms = programs.filter((program) => {
    const levelMatch = !selectedLevel || program.level === selectedLevel;
    const departmentMatch =
      !selectedDepartment || program.department === selectedDepartment;
    const searchMatch =
      !searchQuery ||
      program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.description.toLowerCase().includes(searchQuery.toLowerCase());

    return levelMatch && departmentMatch && searchMatch;
  });

  const getCardIcon = (department: string) => {
    switch (department) {
      case "languages":
        return (
          <BookOpenIcon className="w-6 h-6 text-numl-600 dark:text-numl-400" />
        );
      case "business":
        return (
          <ScrollIcon className="w-6 h-6 text-numl-600 dark:text-numl-400" />
        );
      case "it":
        return (
          <SearchIcon className="w-6 h-6 text-numl-600 dark:text-numl-400" />
        );
      default:
        return (
          <GraduationCap className="w-6 h-6 text-numl-600 dark:text-numl-400" />
        );
    }
  };

  return (
    <section
      id="programs"
      className="section-container bg-gray-50 dark:bg-gray-900"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Our <span className="text-gradient">Programs</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover our wide range of academic programs designed to prepare you
          for global success.
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-4xl mx-auto mb-10 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search programs..."
              className="w-full p-2 pr-8 border border-gray-200 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-numl-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>

          {/* Level filter */}
          <div>
            <select
              className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-numl-500"
              value={selectedLevel || ""}
              onChange={(e) => setSelectedLevel(e.target.value || null)}
            >
              <option value="">All Levels</option>
              {filterOptions.levels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          {/* Department filter */}
          <div>
            <select
              className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-numl-500"
              value={selectedDepartment || ""}
              onChange={(e) => setSelectedDepartment(e.target.value || null)}
            >
              <option value="">All Departments</option>
              {filterOptions.departments.map((dept) => (
                <option key={dept.value} value={dept.value}>
                  {dept.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Programs grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.length > 0 ? (
          filteredPrograms.map((program, index) => (
            <div
              key={program.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 card-hover animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start">
                <div className="w-12 h-12 bg-numl-50 dark:bg-numl-900/50 rounded-full flex items-center justify-center mr-4">
                  {getCardIcon(program.department)}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">{program.title}</h3>
                  <div className="flex space-x-2 mb-3">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-numl-100 dark:bg-numl-900 text-numl-700 dark:text-numl-300 rounded">
                      {program.duration}
                    </span>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded capitalize">
                      {program.level}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {program.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="text-sm font-medium text-numl-600 dark:text-numl-400 hover:text-numl-700 dark:hover:text-numl-300 transition-colors">
                  Learn more
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No programs match your search criteria.
            </p>
            <button
              className="mt-4 text-numl-600 dark:text-numl-400 hover:underline"
              onClick={() => {
                setSelectedLevel(null);
                setSelectedDepartment(null);
                setSearchQuery("");
              }}
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Programs;
