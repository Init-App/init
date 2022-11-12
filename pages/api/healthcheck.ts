import { NextApiResponse, NextApiRequest } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') return res.status(204).send({ message: 'healthy' });
  return res.status(404).send({ message: 'Not found.' });
}
