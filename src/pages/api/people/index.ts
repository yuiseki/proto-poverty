import dbConnect from '../../../utils/dbConnect';
import Person from '../../../models/Person';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const people = await Person.find({});
        res.status(200).json({ success: true, data: people });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
  }
}
