import React from "react";
import { Navigate, Link } from "react-router-dom";
// import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, User, FileText, Home } from "lucide-react";
import StatusCard from "@/components/dashboard/StatusCard";
import InfoSummary from "@/components/dashboard/InfoSummary";

import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useEffect, useState } from "react";



const Dashboard: React.FC = () => {

  const [applicationStatus, setApplicationStatus] = useState<"pending" | "approved">("pending");
  const [userId, setUserId] = useState<string | null>(null);
  // const { isAuthenticated, user, logout } = useAuth();

  // if (!isAuthenticated) {
  //   return <Navigate to="/" replace />;


  // }


   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);

        const q = query(
          collection(db, "status"),
          where("student_id", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const data = doc.data();
          setApplicationStatus(data.approve ? "approved" : "pending");
        }
      }
    });

    return () => unsubscribe();
  }, []);


  const handleLogout = () => {
    return ;
  };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
//       {/* Enhanced Header */}
//       <header className="bg-gradient-to-r from-admitease-primary to-admitease-light  shadow-md p-4">
//         <div className="container mx-auto flex items-center justify-between">
//           <h1 className="text-xl font-bold flex items-center">
//             <Home className="w-5 h-5 mr-2" />
//             AdmItEase
//           </h1>
//           <div className="flex items-center gap-4">
            
//             <Button
//               variant="ghost"
//               onClick={handleLogout}
//               className="flex items-center gap-2 text-white hover:bg-blue-600"
//             >
//               <LogOut className="w-4 h-4" />
//               Logout
//             </Button>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto mt-8 px-4 pb-8">
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-admitease-dark">
//             Welcome, 
//             {/* {user?.fullName} */}
//           </h1>
//           <p className="text-admitease-muted">
//             {new Date().toLocaleDateString("en-US", {
//               weekday: "long",
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             })}
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Status Card - Enhanced with component */}
//           <StatusCard status={"pending"} />

//           {/* <StatusCard status={user?.applicationStatus || "pending"} /> */}

//           {/* Info Summary Card */}
//           <div className="md:col-span-2">
//             {/* <InfoSummary user={"user"} /> */}
//           </div>

//           {/* Quick Actions */}
//           <Card className="card-shadow bg-gradient-to-br from-white to-blue-50">
//             <CardHeader className="pb-2">
//               <CardTitle className="text-lg text-admitease-dark flex items-center">
//                 <User className="w-5 h-5 mr-2 text-admitease-primary" />
//                 Actions
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex flex-col space-y-3">
//                 <Link to="/edit-profile">
//                   <Button
//                     variant="outline"
//                     className="w-full justify-start border-admitease-primary text-admitease-primary hover:bg-admitease-primary hover:text-white"
//                   >
//                     <User className="mr-2 h-4 w-4" />
//                     Edit Profile
//                   </Button>
//                 </Link>
//                 <Link to="/admission-form">
//                   <Button
//                     variant="outline"
//                     className="w-full justify-start border-admitease-primary text-admitease-primary hover:bg-admitease-primary hover:text-white"
//                   >
//                     <FileText className="mr-2 h-4 w-4" />
//                     Admission Form
//                   </Button>
//                 </Link>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-gradient-to-r from-admitease-primary to-admitease-light shadow-md p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold flex items-center">
            <Home className="w-5 h-5 mr-2" />
            AdmItEase
          </h1>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="flex items-center gap-2 hover:bg-blue-600"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto mt-8 px-4 pb-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-admitease-dark">
            Welcome,
          </h1>
          <p className="text-admitease-muted">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatusCard status={applicationStatus} />

          <div className="md:col-span-2">
            {/* <InfoSummary user={userId} /> */}
          </div>

          <Card className="card-shadow bg-gradient-to-br from-white to-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-admitease-dark flex items-center">
                <User className="w-5 h-5 mr-2 text-admitease-primary" />
                Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-3">
                <Link to="/edit-profile">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-admitease-primary text-admitease-primary hover:bg-admitease-primary hover:text-white"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </Link>
                <Link to="/admission-form">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-admitease-primary text-admitease-primary hover:bg-admitease-primary hover:text-white"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Admission Form
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;