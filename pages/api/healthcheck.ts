import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.setHeader('Cache-Control', 's-maxage=610');
    return res.status(200).send({ message: 'healthy' });
  }
  return res.status(404).send({ message: 'Not found.' });
}
