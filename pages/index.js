import Head from 'next/head';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { StyledDiv } from '../styles/index.styles';
import { useAppContext } from '../context/context';
import { buildPath, extractData } from '../utils/fetch';

export default function Home(props) {
  const [people, setPeople] = useState(props.data);
  // console.log(people);

  const fNameRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const fName = fNameRef.current.value;

    if (fName) {
      const person = {
        id: Date.now(),
        fName: fName,
      };
      const res = await fetch('/api/handler', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(person),
      });
      const getData = await res.json();
      setPeople(getData.data);
      fNameRef.current.value = '';
    }
  }

  return (
    <>
      <StyledDiv>
        <form onSubmit={handleSubmit}>
          <label htmlFor='fName'>first name</label>
          <input ref={fNameRef} type='text' id='fName' name='fName' />

          <button type='submit'>Submit form</button>
        </form>
        <ul>
          {people.map((person) => {
            const { id, fName } = person;
            return <li key={id}>{fName}</li>;
          })}
        </ul>
      </StyledDiv>
    </>
  );
}

export async function getServerSideProps() {
  const filePath = buildPath();
  const data = extractData(filePath);

  return {
    props: {
      data,
      revalidate: 5,
      notFound: false,
    },
  };
}
