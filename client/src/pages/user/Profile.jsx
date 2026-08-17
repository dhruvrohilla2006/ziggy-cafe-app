"use client";

import { useState } from "react";
import {
  Mail,
  Shield,
  Calendar,
  Camera,
  User as UserIcon,
  Pencil,
  Check,
  X,
  LogOut,
} from "lucide-react";
import authStore from "../../stores/authStore";

// Temporary mock data — replace with real API call later
const MOCK_USER = {
  name: "gourav sharma",
  email: "gourav@example.com",
  profilepic: "",
  role: "user",
  createdAt: "2025-03-14T10:00:00.000Z",
};

const Profile = () => {
  // const [user, setUser] = useState(MOCK_USER);
  const { user } = authStore();

  const [isEditing, setIsEditing] = useState(false);
  const [nameDraft, setNameDraft] = useState(MOCK_USER.name);

  const handleSaveName = () => {
    if (!nameDraft.trim() || nameDraft === user.name) {
      setIsEditing(false);
      return;
    }
    // Temporary: just update local state, no API call yet
    // setUser((prev) => ({ ...prev, name: nameDraft }));
    setIsEditing(false);
  };

  const handleLogout = () => {
    // Temporary: no real auth yet
    console.log("logout clicked");
  };

  const { name, email, profilepic, role, createdAt } = user;

  const joinedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        {/* Cover */}
        <div className="h-24 bg-linear-to-r from-indigo-500 to-purple-600" />

        <div className="px-6 pb-6">
          {/* Avatar + role badge */}
          <div className="-mt-12 mb-4 flex justify-between items-end">
            <div className="relative">
              {profilepic ? (
                <img
                  src={profilepic}
                  alt={name}
                  className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center shadow-md">
                  <UserIcon className="w-10 h-10 text-gray-400" />
                </div>
              )}
              <button
                type="button"
                className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-1.5 shadow-md transition-colors"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 capitalize ${
                role === "admin"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <Shield className="w-3 h-3" />
              {role}
            </span>
          </div>

          {/* Name (editable) */}
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                autoFocus
                value={nameDraft}
                onChange={(e) => setNameDraft(e.target.value)}
                className="text-xl font-semibold text-gray-900 border-b-2 border-indigo-500 focus:outline-none flex-1"
              />
              <button
                onClick={handleSaveName}
                className="text-green-600 hover:text-green-700"
              >
                <Check className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setNameDraft(name);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 group">
              <h2 className="text-xl font-semibold text-gray-900 capitalize">
                {name}
              </h2>
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-300 group-hover:text-gray-500 transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Details */}
          <div className="mt-4 space-y-2">
            {email && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Mail className="w-4 h-4" />
                <span>{email}</span>
              </div>
            )}
            {joinedDate && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Joined {joinedDate}</span>
              </div>
            )}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="mt-6 w-full flex items-center justify-center gap-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg py-2 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
