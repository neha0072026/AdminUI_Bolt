/*export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;

  const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT token
  const exp = payload.exp * 1000; // Convert to milliseconds
  console.log("expired time", payload.exp);
  console.log("current time", Date.now());
  return Date.now() >= exp; // Compare with current time
};*/

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;

  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (value) {
        return "%" + ("00" + value.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  const payload = JSON.parse(jsonPayload);
  const exp = payload.exp * 1000; // Convert to milliseconds
  console.log("expired time", exp);
  console.log("current time", Date.now());
  return Date.now() >= exp; // Compare with current time
};
