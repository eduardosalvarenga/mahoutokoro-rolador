import { createRoll } from "../../services/fauna";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, action, difficulty, advantage, disadvantage, roll } =
    req.body;

  if (req.method != "POST") {
    return res.status(405).json({ msg: "Method not allowed " });
  }

  try {
    const createdRoll = await createRoll(
      name,
      action,
      difficulty,
      advantage,
      disadvantage,
      roll,
    )
    return res.status(200).json(createdRoll)
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Aldo deu errado" });
  }
}
