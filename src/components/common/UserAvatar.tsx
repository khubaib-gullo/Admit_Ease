// import React from "react";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { User } from "lucide-react";

// interface UserAvatarProps {
//   user: {
//     fullName?: string;
//     profilePicture?: string;
//   } | null;
//   size?: "sm" | "md" | "lg";
// }

// const UserAvatar: React.FC<UserAvatarProps> = ({ user, size = "md" }) => {
//   const getInitials = (name?: string) => {
//     if (!name) return "U";
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase()
//       .substring(0, 2);
//   };

//   const sizeClasses = {
//     sm: "h-8 w-8",
//     md: "h-10 w-10",
//     lg: "h-16 w-16",
//   };

//   return (
//     <Avatar className={sizeClasses[size]}>
//       {user?.profilePicture ? (
//         <AvatarImage src={user.profilePicture} alt={user?.fullName || "User"} />
//       ) : null}
//       <AvatarFallback className="bg-admitease-primary text-white">
//         {user?.fullName ? (
//           getInitials(user.fullName)
//         ) : (
//           <User className="w-4 h-4" />
//         )}
//       </AvatarFallback>
//     </Avatar>
//   );
// };

// export default UserAvatar;

import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface UserAvatarProps {
  user: {
    fullName?: string;
    profilePicture?: string;
  } | null;
  size?: "sm" | "md" | "lg";
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, size = "md" }) => {
  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  };

  const ringClass = "ring-2 ring-admitease-primary/20 ring-offset-2";

  return (
    <Avatar className={`${sizeClasses[size]} ${ringClass}`}>
      {user?.profilePicture ? (
        <AvatarImage src={user.profilePicture} alt={user?.fullName || "User"} />
      ) : null}
      <AvatarFallback className="bg-gradient-to-br from-admitease-primary to-admitease-light text-white">
        {user?.fullName ? (
          getInitials(user.fullName)
        ) : (
          <User className="w-4 h-4" />
        )}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
