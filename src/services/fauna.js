import { Client, query as q } from "faunadb";

export const fauna = new Client({
  secret: process.env.FAUNA_SECRET,
});

export const getRolls = async () => {
  const { data } = await fauna.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection("rolls")), { size: 15 }),
      q.Lambda("ref", q.Get(q.Var("ref")))
    )
  );
  const rolls = data.map((roll) => {
    roll.id = roll.ref.id;
    delete roll.ref;
    return roll;
  });
  return rolls;
};

export const createRoll = async (
  name,
  action,
  difficulty,
  advantage,
  disadvantage,
  roll,
 ) => {
  return await fauna.query(
    q.Create(q.Collection("rolls"), {
      data: { name, action, difficulty, advantage, disadvantage, roll },
    })
  );
};
