import Head from 'next/head';
import Image from 'next/image';
import { StyledDiv } from '../styles/index.styles';
import { useAppContext } from '../context/context';
// import fs from 'fs';
// import path from 'path';
import { getApiData } from '../utils/filePath';

export default function Home(props) {
  const people = props.data.people;

  function handleSubmit(e) {
    e.preventDefault();
    postData();
  }

  async function postData() {
    // // create file path
    // const filePath = path.join(process.cwd(), 'data', 'jsonAPI.json');
    // //   read file
    // const fileData = fs.readFileSync(filePath);
    // //   parse file data
    // const data = JSON.parse(fileData);
    // console.log(data);
    // return data;
  }

  return (
    <>
      <StyledDiv>
        <form onSubmit={handleSubmit}>
          <label htmlFor='fName'>First name</label>
          <input type='text' id='fName' name='fName' />
          <label htmlFor='lName'>Last name</label>
          <input type='text' id='lName' name='lName' />
          <button type='submit'>Submit</button>
        </form>
        <hr />
        <ul>
          {people.map((person) => {
            const { id, fName, lName } = person;
            return (
              <li key={id}>
                {fName} {lName}
              </li>
            );
          })}
        </ul>
      </StyledDiv>
    </>
  );
}

export async function getStaticProps(context) {
  // // create file path
  // const filePath = path.join(process.cwd(), 'data', 'jsonAPI.json');
  // //   read file
  // const fileData = fs.readFileSync(filePath);
  // //   parse file data
  // const data = JSON.parse(fileData);

  const data = await getApiData();
  return {
    props: {
      data,
      revalidate: 5,
      notFound: false,
    },
  };
}
