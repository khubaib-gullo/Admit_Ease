import { Calendar, Image, Play } from "lucide-react";
import { useState } from "react";

const CampusLife = () => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const campusImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=600&h=400",
      alt: "NUML Main Campus Building",
      caption: "The iconic main campus building",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?auto=format&fit=crop&q=80&w=600&h=400",
      alt: "University Library",
      caption: "State-of-the-art library resources",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600&h=400",
      alt: "Student Lounge",
      caption: "Modern student collaboration spaces",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=600&h=400",
      alt: "Campus Buildings",
      caption: "Contemporary academic architecture",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&q=80&w=600&h=400",
      alt: "University Sports Complex",
      caption: "World-class sports facilities",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?auto=format&fit=crop&q=80&w=600&h=400",
      alt: "Campus Gardens",
      caption: "Beautiful campus green spaces",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "International Language Festival",
      date: "November 15-17, 2024",
      location: "Main Auditorium",
    },
    {
      id: 2,
      title: "Alumni Networking Event",
      date: "December 5, 2024",
      location: "Conference Center",
    },
    {
      id: 3,
      title: "Research Symposium",
      date: "January 20, 2025",
      location: "Research Block",
    },
    {
      id: 4,
      title: "Annual Sports Tournament",
      date: "February 10-20, 2025",
      location: "Sports Complex",
    },
  ];

  return (
    <section id="campus-life" className="section-container">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Campus <span className="text-gradient">Life</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Experience the vibrant community and state-of-the-art facilities at
          NUML.
        </p>
      </div>

      {/* Virtual Campus Highlight */}
      <div className="mb-16 relative overflow-hidden rounded-xl shadow-md">
        <div className="relative aspect-[16/9] bg-gray-200 dark:bg-gray-800 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&q=80&w=1200"
            alt="NUML Campus Aerial View"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <button
              className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-4 rounded-full transition-all transform hover:scale-105"
              onClick={() => {
                /* Handle virtual tour start */
              }}
            >
              <Play className="w-10 h-10 fill-current" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
          <h3 className="text-xl md:text-2xl font-bold mb-2">
            Virtual Campus Tour
          </h3>
          <p className="max-w-2xl">
            Experience NUML's beautiful campus through our immersive virtual
            tour. Explore academic buildings, residential halls, and
            recreational facilities.
          </p>
        </div>
      </div>

      {/* Campus Gallery */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold mb-6">Campus Gallery</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {campusImages.map((image, index) => (
            <div
              key={image.id}
              className="relative overflow-hidden rounded-xl shadow-sm cursor-pointer group animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setActiveImage(image.src)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h4 className="text-white font-medium">{image.alt}</h4>
                <p className="text-white/80 text-sm">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox for gallery */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage}
              alt="Enlarged campus view"
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
              onClick={() => setActiveImage(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Campus Events */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Upcoming Campus Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingEvents.map((event, index) => (
            <div
              key={event.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 card-hover flex items-start animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="mr-4">
                <div className="w-12 h-12 bg-numl-50 dark:bg-numl-900/50 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-numl-600 dark:text-numl-400" />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-1">{event.title}</h4>
                <p className="text-numl-600 dark:text-numl-400 text-sm mb-1">
                  {event.date}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {event.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="#events"
            className="btn-secondary inline-flex items-center"
            onClick={(e) => {
              e.preventDefault();
              // Handle view all events action
            }}
          >
            View All Events
            <Calendar className="ml-2 w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CampusLife;
