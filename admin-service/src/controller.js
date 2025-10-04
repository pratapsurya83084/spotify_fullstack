

export const AdminController = (req, res) => {
  return res.json({
    message: "This is the admin controller",
    success: true,
    user: req.user 
  });
};
