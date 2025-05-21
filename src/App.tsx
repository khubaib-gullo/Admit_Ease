// const App = () => {
//   return (
//     <div>
//       <h1 className="text-3xl font-bold underline">Hello world!</h1>
//     </div>
//   );
// };

// export default App;

import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Home from "./pages/home";
import SignupForm from "./components/auth/SignUpPanel";
import LoginForm from "./components/auth/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";

import EditProfile from "./pages/EditProfile";
import AdmissionForm from "./pages/ApplicationForm";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin"

import StudentForm from "./pages/studentForm";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/apply" element={<Index />} /> */}
           <Route
              path="/apply"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
          {/* <Route path="/apply" element={<Index />} /> */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />

           <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/admission-form" element={<AdmissionForm />} />

                

            <Route path='/admin' element={<AdminDashboard/>} />

            <Route path="/application/:id" element={<StudentForm/>} />

            <Route path="*" element={<NotFound />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
