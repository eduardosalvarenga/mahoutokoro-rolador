import { NextApiRequest, NextApiResponse } from 'next';
import { getRolls} from '../../services/fauna';

export default async function roll(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != 'GET') {
        return res.status(405);
    }

    try {
        const rolls = await getRolls();
        return res.status(200).json(rolls)
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Algo deu errado' })
    }
}