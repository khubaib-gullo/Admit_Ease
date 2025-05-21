import React, { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, Home } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";


interface Student {
  id: string;
  full_name: string;
  father_name: string;
}

type StudentWithApproval = Student & {
  approved: boolean;
};

const AdminPage: React.FC = () => {
  const [students, setStudents] = useState<StudentWithApproval[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  // Check if user is admin
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsAdmin(false);
        return;
      }

      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const snapshot = await getDocs(q);
      const userDoc = snapshot.docs[0]?.data();

      if (userDoc?.role === "admin") {
        setIsAdmin(true);
        await fetchStudents();
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchStudents = async () => {
    const studentSnap = await getDocs(collection(db, "students"));
    const statusSnap = await getDocs(collection(db, "status"));

    const statusMap: Record<string, boolean> = {};
    statusSnap.forEach((doc) => {
      const data = doc.data();
      statusMap[data.student_id] = data.approve ?? false;
    });

    const merged: StudentWithApproval[] = studentSnap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        full_name: data.full_name || "N/A",
        father_name: data.father_name || "N/A",
        approved: statusMap[doc.id] ?? false,
      };
    });

    setStudents(merged);
  };

  const approveApplication = async (studentId: string) => {
    const q = query(collection(db, "status"), where("student_id", "==", studentId));
    console.log()
    const snapshot = await getDocs(q);
        console.log(snapshot)

    if (!snapshot.empty) {
      const statusDocRef = snapshot.docs[0].ref;
      await updateDoc(statusDocRef, { approve: true });

      setStudents((prev) =>
        prev.map((s) => (s.id === studentId ? { ...s, approved: true } : s))
      );
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    window.location.href = "/";
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-gradient-to-r from-admitease-primary to-admitease-light shadow-md p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold flex items-center">
            <Home className="w-5 h-5 mr-2" />
            Admin Panel
          </h1>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="flex items-center gap-2  hover:bg-blue-600"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto mt-8 px-4">
        <h2 className="text-2xl font-bold text-admitease-dark mb-4">
          Student Applications
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {students.map((student) => (
            <Card key={student.id} className="shadow border">
              <CardHeader>
                <CardTitle>{student.full_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Student ID:</strong> {student.id}</p>
                <p><strong>Father Name:</strong> {student.father_name}</p>
                <div className="flex gap-2 mt-4 items-center">
                  {student.approved ? (
                    <span className="text-green-700 font-semibold">✅ Approved</span>
                  ) : (
                    <Button
                      onClick={() => approveApplication(student.id)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Approve
                    </Button>
                  )}
                  <Link to={`/application/${student.id}`}>
                    <Button variant="outline">More Info</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
