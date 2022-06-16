import fs from 'fs';
import path from 'path';

export function buildPath() {
  return path.join(process.cwd(), 'data', 'people.json');
}

export function extractData(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

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

    await data.push(newPerson);
    fs.writeFileSync(filePath, JSON.stringify(data));

    await res.status(201).json({ data });
  } else if (req.method === 'DELETE') {
    const deleteArray = req.body;
    await data.push(deleteArray);
    fs.writeFileSync(filePath, JSON.stringify(deleteArray));
    await res.status(202).json({ data });
  } else {
    // Handle any other HTTP method
    res.status(200).json({ data });
  }
}
