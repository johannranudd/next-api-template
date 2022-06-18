import { people } from '../../../data/people';
// import fs from 'fs';
// import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log('POST request');
    console.log(req.body);
    people.push(req.body);
    res.status(201).json({ people: people });
  } else {
    console.log('GET request');

    res.status(200).json({ people: people });
  }
}
