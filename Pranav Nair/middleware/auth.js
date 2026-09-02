function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();

  return res.status(401).json({
    success: false,
    message: 'Authentication required'
  });
}

function ensureAdmin(req, res, next) {
  if (req.user?.role === 'admin') return next();

  return res.status(403).json({
    success: false,
    message: 'Admin access required'
  });
}

module.exports = { ensureAuthenticated, ensureAdmin };
