const User = require('../models/User');
const passport = require('../config/passport');
const asyncHandler = require('../utils/asyncHandler');

const register = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'username, email and password are required'
    });
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email: email.toLowerCase() }]
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'Username or email already exists'
    });
  }

  const user = await User.create({
    username,
    email,
    password,
    role: role === 'admin' ? 'admin' : 'staff'
  });

  return res.status(201).json({
    success: true,
    message: 'User registered successfully',
    user: user.toSafeJSON()
  });
});

const login = asyncHandler(async (req, res, next) => {
  passportAuthenticate(req, res, next);
});

function passportAuthenticate(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: info?.message || 'Invalid username or password'
      });
    }

    req.logIn(user, (loginError) => {
      if (loginError) return next(loginError);

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        user: user.toSafeJSON()
      });
    });
  })(req, res, next);
}

const logout = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy((sessionError) => {
      if (sessionError) return next(sessionError);
      res.clearCookie('connect.sid');
      return res.status(200).json({
        success: true,
        message: 'Logout successful'
      });
    });
  });
});

const me = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user.toSafeJSON()
  });
});

module.exports = { register, login, logout, me };
