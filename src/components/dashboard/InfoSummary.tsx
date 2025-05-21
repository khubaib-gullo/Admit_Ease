import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Paperclip } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import UserAvatar from "../common/UserAvatar";

interface InfoSummaryProps {
  user: {
    fullName?: string;
    email?: string;
    cnic?: string;
    appliedProgram?: string;
    profilePicture?: string;
    documents?: Array<{
      name: string;
      status: "pending" | "verified" | "rejected";
    }>;
  } | null;
}

const InfoSummary: React.FC<InfoSummaryProps> = ({ user }) => {
  return (
    <Card className="card-shadow border border-blue-100 bg-gradient-to-br from-white to-blue-50">
      <CardHeader className="pb-2 border-b border-blue-100">
        <CardTitle className="text-lg font-medium flex items-center text-admitease-dark">
          <FileText className="w-5 h-5 mr-2 text-admitease-primary" />
          Application Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 items-start pt-4">
          <div className="flex flex-col items-center gap-2 bg-blue-50 p-4 rounded-lg border border-blue-100">
            <UserAvatar user={user} size="lg" />
            <h3 className="font-medium text-admitease-dark">
              {user?.fullName || "User"}
            </h3>
          </div>

          <Separator
            orientation="vertical"
            className="hidden sm:block h-auto"
          />

          <div className="flex-1 space-y-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-md shadow-sm">
                <p className="text-xs text-admitease-muted">Full Name</p>
                <p className="font-medium text-admitease-dark">
                  {user?.fullName || "Not Provided"}
                </p>
              </div>
              <div className="bg-white p-3 rounded-md shadow-sm">
                <p className="text-xs text-admitease-muted">Email Address</p>
                <p className="font-medium text-admitease-dark">
                  {user?.email || "Not Provided"}
                </p>
              </div>
              <div className="bg-white p-3 rounded-md shadow-sm">
                <p className="text-xs text-admitease-muted">CNIC</p>
                <p className="font-medium text-admitease-dark">
                  {user?.cnic || "Not Provided"}
                </p>
              </div>
              <div className="bg-white p-3 rounded-md shadow-sm">
                <p className="text-xs text-admitease-muted">Applied Program</p>
                <p className="font-medium text-admitease-dark">
                  {user?.appliedProgram || "Not Selected"}
                </p>
              </div>
            </div>

            {user?.documents && user.documents.length > 0 && (
              <>
                <Separator />
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <p className="text-xs text-admitease-muted mb-2 flex items-center">
                    <Paperclip className="w-4 h-4 mr-1 text-admitease-primary" />{" "}
                    Documents
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {user.documents.map((doc, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className={cn(
                          "flex items-center gap-1.5",
                          doc.status === "verified" &&
                            "border-green-500 text-green-700 bg-green-50",
                          doc.status === "rejected" &&
                            "border-red-500 text-red-700 bg-red-50",
                          doc.status === "pending" &&
                            "border-amber-500 text-amber-700 bg-amber-50"
                        )}
                      >
                        {doc.name}
                        <span className="w-2 h-2 rounded-full bg-current"></span>
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoSummary;
