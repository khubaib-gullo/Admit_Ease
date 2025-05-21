

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

import { useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";



const AdmissionForm: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  

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


//   useEffect(() => {
//   const unsubscribe = onAuthStateChanged(auth, async (user) => {
//     if (user) {
//       const docRef = doc(db, "students", user.uid);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         setFormData((prev) => ({
//           ...prev,
//           ...(docSnap.data() as Partial<typeof formData>),
//         }));
//       }
//     }
//   });

//   return () => unsubscribe();
// }, []);


useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(`No document found for ${user.email}`);
        
        const docRef = doc(db, "students", user.uid);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          console.log("Fetched data from Firestore:", docSnap.data()); // ✅ Add this
          setFormData((prev) => ({
            ...prev,
            ...(docSnap.data() as Partial<typeof formData>),
          }));
          } else {
        console.log("No document found for user.");
        }
      }
    });
  
    return () => unsubscribe();
  }, []);


  
  const handleDecision = () => {

          return 

          // Replace this with actual Firestore update logic
        };


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");

    const docRef = doc(db, "students", user.uid);
    await setDoc(docRef, formData, { merge: true });

    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  } catch (error) {
    console.error(error);
    toast({
      title: "Error",
      description: "Failed to update profile.",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};


  return (

    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-gradient-to-r from-admitease-primary to-admitease-light  shadow-md p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">AdmItEase - User Dashboard</h1>
          <div className="flex space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" className="text-white hover:bg-blue-600">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto mt-8 px-4 pb-8 max-w-4xl">
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="flex items-center text-admitease-primary hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-admitease-dark mb-6">
            Admission Application
          </h1>

          <Card className="shadow-lg border border-blue-100 mb-6">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b">
              <CardTitle className="text-admitease-dark">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="father_name">Father's Name</Label>
                <Input
                  id="father_name"
                  name="father_name"
                  value={formData.father_name}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>

             

              <div className="space-y-2">
                <Label htmlFor="cnic">CNIC</Label>
                <Input
                  id="cnic"
                  name="cnic"
                  value={formData.cnic}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  placeholder="90000-0000000-0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Input
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  placeholder="M / F / Other"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergency_contact">Emergency Contact</Label>
                <Input
                  id="emergency_contact"
                  name="emergency_contact"
                  value={formData.emergency_contact}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="permanent_address">Permanent Address</Label>
                <Textarea
                  id="permanent_address"
                  name="permanent_address"
                  value={formData.permanent_address}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="domicile">Domicile</Label>
                <Input
                  id="domicile"
                  name="domicile"
                  value={formData.domicile}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="religion">Religion</Label>
                <Input
                  id="religion"
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="blood_group">Blood Group</Label>
                <Input
                  id="blood_group"
                  name="blood_group"
                  value={formData.blood_group}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="marital_status">Marital Status</Label>
                <Input
                  id="marital_status"
                  name="marital_status"
                  value={formData.marital_status}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="disabilities">Disabilities</Label>
                <Textarea
                  id="disabilities"
                  name="disabilities"
                  value={formData.disabilities}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="languages_known">Languages Known</Label>
                <Input
                  id="languages_known"
                  name="languages_known"
                  value={formData.languages_known}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              

              
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-blue-100 mb-6">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b">
              <CardTitle className="text-admitease-dark">Program & Academic Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="program">Program</Label>
                <Input
                  id="program"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="campus">Campus</Label>
                <Input
                  id="campus"
                  name="campus"
                  value={formData.campus}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Input
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="study_mode">Study Mode</Label>
                <Input
                  id="study_mode"
                  name="study_mode"
                  value={formData.study_mode}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

             

              <div className="space-y-2">
                <Label htmlFor="scholarship_applied">Scholarship Applied</Label>
                <Input
                  id="scholarship_applied"
                  name="scholarship_applied"
                  value={formData.scholarship_applied}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="need_financial_aid">Need Financial Aid</Label>
                <Input
                  id="need_financial_aid"
                  name="need_financial_aid"
                  value={formData.need_financial_aid}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              

              <div className="space-y-2 col-span-full">
                <Label htmlFor="extra_curricular">Extra Curricular Activities</Label>
                <Textarea
                  id="extra_curricular"
                  name="extra_curricular"
                  value={formData.extra_curricular}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2 col-span-full">
                <Label htmlFor="additional_qualification">Additional Qualification</Label>
                <Textarea
                  id="additional_qualification"
                  name="additional_qualification"
                  value={formData.additional_qualification}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-blue-100 mb-6">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b">
              <CardTitle className="text-admitease-dark">Academic History</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Matriculation */}
              <div className="space-y-2">
                <Label htmlFor="matric_board">Matric Board</Label>
                <Input
                  id="matric_board"
                  name="matric_board"
                  value={formData.matric_board}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="matric_passing_year">Matric Passing Year</Label>
                <Input
                  id="matric_passing_year"
                  name="matric_passing_year"
                  value={formData.matric_passing_year}
                  onChange={handleChange}
                  disabled={isLoading}
                  type="number"
                />
              </div>
             
              <div className="space-y-2">
                <Label htmlFor="matric_roll_number">Matric Roll Number</Label>
                <Input
                  id="matric_roll_number"
                  name="matric_roll_number"
                  value={formData.matric_roll_number}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>


              {/* FSc / Equivalent */}
              <div className="space-y-2">
                <Label htmlFor="fsc_board">FSc Board</Label>
                <Input
                  id="fsc_board"
                  name="fsc_board"
                  value={formData.fsc_board}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fsc_passing_year">FSc Passing Year</Label>
                <Input
                  id="fsc_passing_year"
                  name="fsc_passing_year"
                  value={formData.fsc_passing_year}
                  onChange={handleChange}
                  disabled={isLoading}
                  type="number"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fsc_roll_number">FSc Roll Number</Label>
                <Input
                  id="fsc_roll_number"
                  name="fsc_roll_number"
                  value={formData.fsc_roll_number}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              
            </CardContent>
          </Card>

          {/* <div className="flex justify-end gap-2 pt-4">
            <Link to="/dashboard">
              <Button
                variant="outline"
                disabled={isLoading}
                className="border-admitease-primary text-admitease-primary hover:bg-admitease-primary hover:text-white"
              >
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isLoading}
              onClick={handleSubmit}
              className="bg-gradient-to-r from-admitease-primary to-admitease-light hover:from-admitease-light hover:to-admitease-primary text-white"
            >
              {isLoading ? "Submitting..." : "Submit Application"}
            </Button>
          </div> */}



        </div>
      </div>
    </div>
  );
};

export default AdmissionForm;
