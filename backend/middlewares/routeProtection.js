export const routeProtection = async (req, res, next) => {
  console.log("checking authentication", req.isAuthenticated());

  if (req.isAuthenticated()) return next();
  return res.status(401).json({ message: "user not authenticated" });
};
