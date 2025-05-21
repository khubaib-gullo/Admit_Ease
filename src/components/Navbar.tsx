// import { useEffect, useState } from "react";
// import ThemeToggle from "./ThemeToggle";
// import { Globe, Menu, Search, X } from "lucide-react";
// import { cn } from "../lib/utils";

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const navItems = [
//     { name: "Home", href: "#home" },
//     { name: "About", href: "#about" },
//     { name: "Programs", href: "#programs" },
//     { name: "Admissions", href: "#admissions" },
//     { name: "Campus Life", href: "#campus-life" },
//     { name: "Contact", href: "#contact" },
//   ];

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToSection = (sectionId: string) => {
//     const section = document.querySelector(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//       setIsMobileMenuOpen(false);
//     }
//   };

//   return (
//     <nav
//       className={cn(
//         "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
//         isScrolled
//           ? "py-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm"
//           : "py-4 bg-transparent"
//       )}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <a
//               href="#home"
//               className="text-numl-800 dark:text-white font-bold text-xl flex items-center"
//               onClick={(e) => {
//                 e.preventDefault();
//                 scrollToSection("#home");
//               }}
//             >
//               <div className="mr-2 flex items-center">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   className="h-6 w-6"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 14l9-5-9-5-9 5 9 5z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 14l9-5-9-5-9 5 9 5z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 14v7"
//                   />
//                 </svg>
//               </div>
//               <span className="font-heading">NUML University</span>
//             </a>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-1">
//             {navItems.map((item) => (
//               <a
//                 key={item.name}
//                 href={item.href}
//                 className="nav-item text-gray-700 dark:text-gray-300 hover:text-numl-600 dark:hover:text-white"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   scrollToSection(item.href);
//                 }}
//               >
//                 {item.name}
//               </a>
//             ))}
//           </div>

//           {/* Right side items */}
//           <div className="flex items-center space-x-4">
//             <div className="relative hidden md:flex items-center">
//               <button className="p-1 text-gray-700 dark:text-gray-300 flex items-center">
//                 <span className="mr-1">English</span>
//                 <Globe className="h-4 w-4" />
//               </button>
//             </div>

//             <div className="hidden md:flex relative">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <Search className="h-4 w-4 text-gray-400" />
//               </div>
//               <input
//                 type="search"
//                 placeholder="Search..."
//                 className="py-1.5 pl-10 pr-4 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-numl-600"
//               />
//             </div>

//             <ThemeToggle />

//             <div className="hidden md:flex space-x-3">
//               <a
//                 href="#"
//                 className="px-4 py-1.5 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//               >
//                 Sign In
//               </a>
//               <a
//                 href="#"
//                 className="px-4 py-1.5 text-sm font-medium bg-numl-600 text-white rounded hover:bg-numl-700 transition-colors"
//               >
//                 Apply Now
//               </a>
//             </div>

//             {/* Mobile Navigation Button */}
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors md:hidden"
//             >
//               {isMobileMenuOpen ? (
//                 <X className="h-5 w-5" />
//               ) : (
//                 <Menu className="h-5 w-5" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation Menu */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-800 animate-fade-in">
//           <div className="px-4 pt-2 pb-4 space-y-1">
//             {navItems.map((item) => (
//               <a
//                 key={item.name}
//                 href={item.href}
//                 className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   scrollToSection(item.href);
//                 }}
//               >
//                 {item.name}
//               </a>
//             ))}

//             <div className="pt-2 border-t border-gray-200 dark:border-gray-800 mt-2">
//               <a
//                 href="#"
//                 className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//               >
//                 Sign In
//               </a>
//               <a
//                 href="#"
//                 className="block px-3 py-2 mt-2 rounded-md text-base font-medium bg-numl-600 text-white hover:bg-numl-700 transition-colors text-center"
//               >
//                 Apply Now
//               </a>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { Globe, Menu, Search, X } from "lucide-react";
import { cn } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";

import { query, collection, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";



const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); 

  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const auth = getAuth();


  //  useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });

  //   return () => unsubscribe();
  // }, []);
  

   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const role = userDoc.data().role;
          setIsAdmin(role === "admin");

        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  



  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Programs", href: "#programs" },
    { name: "Admissions", href: "#admissions" },
    { name: "Campus Life", href: "#campus-life" },
    { name: "Contact", href: "#contact" },
  ];

  

  // const handleApplyNow = () => {
  //   navigate("/apply");                    //  ←  now it exists
  // };


const handleApplyNow = async () => {
  const user = auth.currentUser;

  if (!user) {
    console.warn("User not logged in");
    return;
  }

  try {
    // 🔍 Fetch user role from Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();

      if (userData.role === "admin") {
        // 🛠️ Admin detected — go to admin dashboard
        navigate("/admin");
        return;
      }
    }

    // 👤 If not admin, check if user has already applied
    const q = query(
      collection(db, "status"),
      where("student_id", "==", user.uid)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // ✅ Already applied — redirect to dashboard
      navigate("/dashboard");
    } else {
      // 🚀 Not applied yet — go to apply page
      navigate("/apply");
    }
  } catch (error) {
    console.error("Error checking application status or role:", error);
  }
};


  const handelSignIn = () => {
    navigate("/login");                  //  ←  now it exists
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Signed out");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };


  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "py-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm"
          : "py-4 bg-transparent"
      )}
    >
      <div className="container max-w-screen-xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-numl-600 dark:text-white">
          NUML
        </div>

        {/* Desktop Navigation Items */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className="text-gray-700 dark:text-gray-300 hover:text-numl-600 dark:hover:text-numl-400 transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Right side items */}
        <div className="flex items-center space-x-4">
          {/* Language Selector (Example) */}
          <div className="relative">
            <button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-numl-600 dark:hover:text-numl-300 transition-colors">
              <Globe className="w-4 h-4 mr-1" />
              EN
            </button>
            {/* Add language selection dropdown here */}
          </div>

          {/* Search Icon (Example) */}
          <button className="text-gray-600 dark:text-gray-400 hover:text-numl-600 dark:hover:text-numl-300 transition-colors">
            <Search className="w-5 h-5" />
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          <div className="hidden md:flex space-x-3">
            {/* <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handelSignIn()
              }}

              className="px-4 py-1.5 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Sign In
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleApplyNow();
              }}
              className="px-4 py-1.5 text-sm font-medium bg-numl-600 text-white rounded hover:bg-numl-700 transition-colors"
            >
              Apply Now
            </a> */}
            {user ? (
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleSignOut();
                          }}
                          className="px-4 py-1.5 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          Sign Out
                        </a>
                      ) : (
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handelSignIn();
                          }}
                          className="px-4 py-1.5 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          Sign In
                        </a>
                      )}

              <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleApplyNow();
              }}
                          className="px-4 py-1.5 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isAdmin ? "Admin Dashboard" : "Apply Now"}
            </a>

          </div>

          {/* Mobile Navigation Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-600 dark:text-gray-400 hover:text-numl-600 dark:hover:text-numl-300 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-800 animate-fade-in">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {item.name}
              </a>
            ))}

            <div className="pt-2 border-t border-gray-200 dark:border-gray-800 mt-2">
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Sign In
              </a>
              {/* <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleApplyNow();
                }}
                className="block px-3 py-2 mt-2 rounded-md text-base font-medium bg-numl-600 text-white hover:bg-numl-700 transition-colors text-center"
              >
                Apply Now
              </a> */}


              <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleApplyNow();
              }}
                          className="px-4 py-1.5 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isAdmin ? "Admin Dashboard" : "Apply Now"}
            </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
