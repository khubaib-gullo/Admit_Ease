import React from "react";
import { Bell } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import UserAvatar from "../common/UserAvatar";
import { Badge } from "@/components/ui/badge";

const Topbar: React.FC = () => {
  const { user } = useAuth();
  const notificationCount = 2; // Mock notification count

  return (
    <div className="bg-white shadow-sm border-b p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">
            Welcome, {user?.fullName || "User"}
          </h2>
          <p className="text-sm text-admitease-muted">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="w-5 h-5 text-admitease-muted" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-admitease-primary">
                  {notificationCount}
                </Badge>
              )}
            </button>
          </div>
          <UserAvatar user={user} />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
