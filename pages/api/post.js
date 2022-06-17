import fs from 'fs';
import { buildPath, extractData } from '../../utils/fetch';

export default async function handler(req, res) {
  const filePath = buildPath();
  const data = extractData(filePath);

  if (req.method === 'POST') {
    // Process a POST request

    const newPerson = {
      id: req.body.id,
      'first name': req.body['first name'],
      'last name': req.body['last name'],
      email: req.body.email,
      text: req.body.text,
    };

    data.push(newPerson);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ data });
  }
}
