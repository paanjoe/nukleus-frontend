// Checkbox.js
"use client";
import React from "react";

const UserRoleCheckBoxComponent = ({ label, isActive, onChange }) => {
  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={isActive}
        onChange={onChange}
        className="form-checkbox h-5 w-5 text-blue-600"
      />
      <span>{label}</span>
    </label>
  );
};

export default UserRoleCheckBoxComponent;
