import {
  Calendar,
  CheckCircle,
  CircleAlert,
  ClipboardList,
  FileText,
} from "lucide-react";
import { useState } from "react";

const Admissions = () => {
  const [activeTab, setActiveTab] = useState("process");

  const admissionProcess = [
    {
      id: 1,
      title: "Research Programs",
      status: "Check eligibility requirements",
      date: "Applications Open: January 15, 2024",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      id: 2,
      title: "Submit Application",
      status: "Complete online form and upload documents",
      date: "Deadline: March 20, 2024",
      icon: <ClipboardList className="w-5 h-5" />,
    },
    {
      id: 3,
      title: "Entrance Test",
      status: "Schedule and prepare for required exams",
      date: "Test Dates: April 5-15, 2024",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      id: 4,
      title: "Merit List",
      status: "Wait for department merit lists to be uploaded",
      date: "Expected: May 1, 2024",
      icon: <CheckCircle className="w-5 h-5" />,
    },
  ];

  const importantDates = [
    { event: "Application Portal Opens", date: "January 15, 2024" },
    { event: "Application Deadline", date: "March 20, 2024" },
    { event: "Document Verification", date: "March 25-30, 2024" },
    { event: "Entrance Tests", date: "April 5-15, 2024" },
    { event: "Merit List Announcement", date: "May 1, 2024" },
    { event: "Fee Submission Deadline", date: "May 15, 2024" },
    { event: "Orientation Week", date: "August 28, 2024" },
    { event: "Classes Begin", date: "September 4, 2024" },
  ];

  const requirements = [
    "Completed application form",
    "Academic transcripts and certificates",
    "Valid CNIC or passport",
    "Passport-sized photographs",
    "Personal statement/statement of purpose",
    "Letters of recommendation",
    "Application fee payment receipt",
    "Additional department-specific requirements",
  ];

  return (
    <section id="admissions" className="section-container">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-gradient">Admissions</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Your journey to becoming part of NUML starts here. Follow our
          streamlined admission process.
        </p>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-800">
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "process"
                ? "border-numl-600 text-numl-600 dark:border-numl-400 dark:text-numl-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("process")}
          >
            Admission Process
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "dates"
                ? "border-numl-600 text-numl-600 dark:border-numl-400 dark:text-numl-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("dates")}
          >
            Important Dates
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "requirements"
                ? "border-numl-600 text-numl-600 dark:border-numl-400 dark:text-numl-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("requirements")}
          >
            Requirements
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-4xl mx-auto">
        {/* Admission Process */}
        {activeTab === "process" && (
          <div className="animate-fade-in">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-7 md:left-1/2 top-0 h-full w-0.5 bg-numl-100 dark:bg-numl-900"></div>

              {/* Process steps */}
              <div className="space-y-12">
                {admissionProcess.map((step, index) => (
                  <div
                    key={step.id}
                    className={`relative flex flex-col md:flex-row ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="flex md:w-1/2">
                      <div
                        className={`ml-16 md:ml-0 md:mx-8 ${
                          index % 2 === 0 ? "md:ml-auto" : ""
                        }`}
                      >
                        <div
                          className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 animate-slide-in"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <h4 className="text-lg font-bold">{step.title}</h4>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {step.status}
                          </p>
                          <div className="flex items-center mt-2 text-sm text-numl-600 dark:text-numl-400">
                            <Calendar className="w-4 h-4 mr-1" />
                            {step.date}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute left-0 md:left-1/2 -ml-3 mt-1.5 md:mt-0 md:-ml-3.5 w-14 h-14 md:w-7 md:h-7 rounded-full bg-white dark:bg-gray-800 border-2 border-numl-500 dark:border-numl-400 shadow flex items-center justify-center z-10">
                      {step.icon}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 text-center">
              <a
                href="#apply"
                className="btn-primary inline-flex items-center"
                onClick={(e) => {
                  e.preventDefault();
                  // Handle application action here
                }}
              >
                Apply Now
              </a>
            </div>
          </div>
        )}

        {/* Important Dates */}
        {activeTab === "dates" && (
          <div className="animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
                {importantDates.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 md:p-6 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start">
                      <div className="mr-4">
                        <div className="w-12 h-12 bg-numl-50 dark:bg-numl-900/50 rounded-full flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-numl-600 dark:text-numl-400" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">{item.event}</h4>
                        <p className="text-numl-600 dark:text-numl-400 font-semibold mt-1">
                          {item.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 p-4 bg-numl-50 dark:bg-numl-900/30 rounded-lg border border-numl-100 dark:border-numl-800 flex items-start">
              <CircleAlert className="w-5 h-5 text-numl-600 dark:text-numl-400 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Dates are subject to change. Please check the official NUML
                website regularly for any updates to the admission schedule.
              </p>
            </div>
          </div>
        )}

        {/* Requirements */}
        {activeTab === "requirements" && (
          <div className="animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">
                Application Requirements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {requirements.map((req, index) => (
                  <div
                    key={index}
                    className="flex items-start animate-slide-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CheckCircle className="w-5 h-5 text-numl-600 dark:text-numl-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {req}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-numl-50 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-numl-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Additional Information</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Some programs may have specific requirements beyond the general
                list above. Please check the detailed admission criteria for
                your chosen program on the department's page.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                International applicants should also provide proof of English
                proficiency (TOEFL/IELTS) and relevant visa documentation.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Admissions;
