import jwt from 'jsonwebtoken';

export async function GET(request) {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader) {
    return new Response(JSON.stringify({ message: 'No token provided' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const token = authHeader.split(' ')[1]; 

  if (!token) {
    return new Response(JSON.stringify({ message: 'No token provided' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.STRAPI_JWT_SECRET);
    const userEmail = decoded.email;

    return new Response(JSON.stringify({ userEmail }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('JWT verification failed:', error);
    return new Response(JSON.stringify({ message: 'Invalid token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}