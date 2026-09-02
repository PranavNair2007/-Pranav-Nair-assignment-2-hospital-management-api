function errorHandler(err, req, res, next) {
  console.error(err.stack || err);

  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: `Duplicate value for: ${Object.keys(err.keyPattern || {}).join(', ')}`
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: Object.values(err.errors).map((e) => e.message)
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid resource ID'
    });
  }

  return res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
}

module.exports = errorHandler;
