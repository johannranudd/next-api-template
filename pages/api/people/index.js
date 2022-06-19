import { people } from '../../../data/people';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'people.json');
  const readFile = fs.readFileSync(filePath);
  const data = JSON.parse(readFile);

  if (req.method === 'POST') {
    console.log('POST request');
    console.log(req.body);
    const newObject = {
      id: new Date().toISOString(),
      name: req.body,
    };
    console.log(JSON.stringify(newObject));
    console.log(newObject);
    data.push(newObject);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ people: data });
  } else {
    // console.log('GET request');

    res.status(200).json({ people: data });
  }
}
