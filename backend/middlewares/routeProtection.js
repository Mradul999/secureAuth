export const routeProtection = async (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ message: "user not authenticated" });
};
