// import { people } from '../../../data/people';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'people.json');
  const readFile = fs.readFileSync(filePath);
  const people = JSON.parse(readFile);
  // console.log(data);
  if (req.method === 'POST') {
    console.log('POST req');
    people.push(req.body);
    fs.writeFileSync(filePath, JSON.stringify(people));
    res.status(201).json({ people });
  } else {
    console.log('GET req');
    res.status(200).json({ people });
  }
}
