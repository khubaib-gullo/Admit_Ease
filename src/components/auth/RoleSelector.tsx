import { useState } from "react";
import { cn } from "@/lib/utils";

interface RoleSelectorProps {
  onRoleChange: (role: string) => void;
  className?: string;
}

const RoleSelector = ({ onRoleChange, className }: RoleSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Select Role");

  const roles = ["Select Role", "Admin", "User"];

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    onRoleChange(role);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative inline-block text-left", className)}>
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
          id="role-menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedRole}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="role-menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {roles.map((role) => (
              <button
                key={role}
                className={cn(
                  "block w-full px-4 py-2 text-sm text-left hover:bg-gray-100",
                  selectedRole === role
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700"
                )}
                role="menuitem"
                tabIndex={-1}
                onClick={() => handleRoleSelect(role)}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleSelector;
