// utils/roles.js
export const isAdmin = () => {
  return localStorage.getItem("isAdmin") === "true";
};
