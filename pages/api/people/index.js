// import { people } from '../../../data/people';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const filePath = path.join(process.cwd(), 'data', 'people.json');
    const readFile = fs.readFileSync(filePath);
    const data = JSON.parse(readFile);

    const newObject = {
      id: new Date().toISOString(),
      name: req.body,
    };
    data.push(newObject);
    console.log({ people: data });
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ people: data });
  } else {
    const filePath = path.join(process.cwd(), 'data', 'people.json');
    const readFile = fs.readFileSync(filePath);
    const data = JSON.parse(readFile);
    res.status(200).json({ people: data });
  }
}
