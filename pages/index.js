import { server } from '../config/index';
import Head from 'next/head';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { StyledDiv } from '../styles/index.styles';
import { useAppContext } from '../context/context';
import { buildPath, extractData } from '../utils/fetch';
import { getData } from '../utils/fetch';

export default function Home(props) {
  const [people, setPeople] = useState(props.data.people);
  const nameRef = useRef();

  // async function getdataOnLoad() {
  //   const data = await getData(`${server}/api/people`);
  //   setPeople(data.people);
  // }
  // useEffect(() => {
  //   getdataOnLoad();
  // }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (nameRef.current.value) {
      const newObject = {
        id: Date.now(),
        name: nameRef.current.value,
      };

      const res = await fetch(`${server}/api/people`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newObject),
      });
      const newData = await res.json();
      setPeople(newData.people);
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
  const data = await getData(`${server}/api/people`);
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
