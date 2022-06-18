import { server } from '../config/index';
import Head from 'next/head';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { StyledDiv } from '../styles/index.styles';
import { useAppContext } from '../context/context';
import { buildPath, extractData } from '../utils/fetch';

export default function Home(props) {
  const [people, setPeople] = useState(props.data.people);

  async function fetchOnLoad() {
    const res = await fetch(`${server}/api/people`);
    const data = await res.json();
    setPeople(data.people);
  }

  useEffect(() => {
    fetchOnLoad();
  }, []);

  const nameRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(`${server}/api/people`);

    if (nameRef.current.value) {
      fetch(`${server}/api/people`, {
        method: 'POST',
        body: JSON.stringify({
          id: Date.now(),
          name: nameRef.current.value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      fetchOnLoad();
    }
  }

  return (
    <>
      <StyledDiv>
        <form onSubmit={handleSubmit}>
          <label htmlFor='fName'>first name</label>
          <input ref={nameRef} type='text' id='fName' name='fName' />

          <button type='submit'>Submit form</button>
        </form>
        <ul>
          {people.map((person) => {
            const { id, name } = person;
            return <li key={id}>{name}</li>;
          })}
        </ul>
      </StyledDiv>
    </>
  );
}

export async function getStaticProps(context) {
  const res = await fetch(`${server}/api/people`);
  const data = await res.json();

  return {
    props: {
      data,
      revalidate: 10,
      notFound: false,
    },
  };
}

// export async function getStaticProps() {
//   const res = await fetch(`http://localhost:3000/api/people`);
//   const data = await res.json();

//   return {
//     props: {
//       data,
//       revalidate: 5,
//       notFound: false,
//     },
//   };
// }
