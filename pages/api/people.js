import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // get file path
  const filePath = path.join(process.cwd(), 'data', 'people.json');
  //   read data
  const fileData = fs.readFileSync(filePath);
  //   parse data
  const data = JSON.parse(fileData);

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
  } else {
    // Handle any other HTTP method
    res.status(200).json({ data });
  }
}
