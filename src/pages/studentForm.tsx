import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const StudentForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    full_name: "",
    father_name: "",
    mother_name: "",
    cnic: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    permanent_address: "",
    city: "",
    domicile: "",
    nationality: "",
    religion: "",
    blood_group: "",
    marital_status: "",
    disabilities: "",
    languages_known: "",
    emergency_contact: "",
    income_source: "",
    monthly_income: "",
    program: "",
    campus: "",
    department: "",
    semester: "",
    study_mode: "",
    fee_payment_method: "",
    scholarship_applied: "",
    need_financial_aid: "",
    how_did_you_hear: "",
    extra_curricular: "",
    additional_qualification: "",
    matric_board: "",
    matric_passing_year: "",
    matric_percentage: "",
    matric_roll_number: "",
    matric_subjects: "",
    fsc_board: "",
    fsc_passing_year: "",
    fsc_percentage: "",
    fsc_roll_number: "",
    fsc_subjects: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchStudentData = async () => {
        try {
          const docRef = doc(db, "students", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setFormData(docSnap.data() as typeof formData);
          } else {
            console.warn("No such document found.");
          }
        } catch (error) {
          console.error("Failed to fetch student data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchStudentData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 max-w-4xl mx-auto space-y-4">
        {[...Array(6)].map((_, idx) => (
          <div key={idx}>
            <Skeleton className="h-4 w-1/4 mb-1" />
            <Skeleton className="h-5 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-md border rounded-2xl">
          <CardHeader className="bg-admitease-primary  rounded-t-2xl px-6 py-4">
            <CardTitle className="text-xl">🎓 Student Application Form</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 p-6">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key}>
                <p className="text-sm font-medium text-gray-600 capitalize">
                  {key.replace(/_/g, " ")}
                </p>
                <p className="text-gray-900">{value || "N/A"}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentForm;
