import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  status: "pending" | "under_review" | "approved" | "rejected";
}

const StatusCard: React.FC<StatusCardProps> = ({ status }) => {
  const getStatusDetails = () => {
    switch (status) {
      case "pending":
        return {
          title: "Application Pending",
          description:
            "Your application has been submitted and is waiting for review.",
          icon: <Clock className="w-8 h-8 text-amber-500" />,
          color: "text-amber-500",
          progress: 25,
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
        };
      case "under_review":
        return {
          title: "Under Review",
          description:
            "Your application is currently being reviewed by the admissions committee.",
          icon: <Clock className="w-8 h-8 text-admitease-primary" />,
          color: "text-admitease-primary",
          progress: 50,
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
        };
      case "approved":
        return {
          title: "Application Approved",
          description: "Congratulations! Your application has been approved.",
          icon: <Check className="w-8 h-8 text-green-600" />,
          color: "text-green-600",
          progress: 100,
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
        };
      case "rejected":
        return {
          title: "Application Rejected",
          description:
            "We regret to inform you that your application was not approved.",
          icon: <AlertCircle className="w-8 h-8 text-red-600" />,
          color: "text-red-600",
          progress: 100,
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
        };
      default:
        return {
          title: "Status Unknown",
          description: "Please contact support for more information.",
          icon: <AlertCircle className="w-8 h-8 text-admitease-muted" />,
          color: "text-admitease-muted",
          progress: 0,
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
        };
    }
  };

  const { title, description, icon, color, progress, bgColor, borderColor } =
    getStatusDetails();

  return (
    <Card className={cn("card-shadow border-2", borderColor, bgColor)}>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span className={cn("text-lg font-medium", color)}>{title}</span>
          {icon}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-admitease-muted mb-4">{description}</p>
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-2 text-xs text-admitease-muted">
          <span>Submitted</span>
          <span>Under Review</span>
          <span>Decision</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
