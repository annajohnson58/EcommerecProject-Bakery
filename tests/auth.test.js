const jwt = require('jsonwebtoken');
const auth1 = require('../backend/routes/auth1');

describe('Auth Middleware Unit Test', () => {
  let req, res, next;

  beforeEach(() => {
    process.env.JWT_SECRET = 'testsecretkey';
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should return 401 if no authorization header is provided', () => {
    auth1(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'No token provided' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 403 if token verification fails', () => {
    req.headers['authorization'] = 'Bearer invalidtoken';

    auth1(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Failed to authenticate token' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next() and attach userId if token is valid', () => {
    const token = jwt.sign({ userId: 'user123' }, process.env.JWT_SECRET);
    req.headers['authorization'] = `Bearer ${token}`;

    auth1(req, res, next);

    expect(req.userId).toBe('user123');
    expect(next).toHaveBeenCalled();
  });
});