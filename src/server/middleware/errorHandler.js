export const errorHandler = (err, req, res, next) => {
  console.error('API Error:', err);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      success: false,
      message: messages.join(', '),
      errors: messages
    });
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    return res.status(404).json({
      success: false,
      message: 'Resource not found with specified ID'
    });
  }

  // Default server error
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
};
