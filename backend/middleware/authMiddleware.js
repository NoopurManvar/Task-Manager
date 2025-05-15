import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Authorization Header:', authHeader);

  // Check if there is no token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized - No token' });
  }

  // Extract the token from the header
  const token = authHeader.split(' ')[1];

  try {
    // Verify token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT:', decoded);

    // Attach the user ID from the decoded JWT to the request object
    req.userId = decoded.id;
    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    console.error('JWT error:', err.message);
    res.status(401).json({ error: 'Invalid token' });
  }
};
