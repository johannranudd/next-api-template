import Head from 'next/head';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { StyledDiv } from '../styles/index.styles';
import { useAppContext } from '../context/context';
// import { getApiData } from '../utils/filePath';
import { getData } from '../utils/fetch';

export default function Home(props) {
  const [people, setPeople] = useState(props.loadedData.data);
  // const people = props.loadedData.data;
  // console.log(props.loadedData.data);
  const fNameRef = useRef();
  const lNameRef = useRef();
  const ageRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const fName = fNameRef.current.value;
    const lName = lNameRef.current.value;
    const age = ageRef.current.value;

    const newPerson = {
      id: Date.now(),
      fName: fName,
      lName: lName,
      age: age,
    };
    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(newPerson),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // .then((res) => res.json())
    // .then((data) => console.log(data));

    setPeople((prev) => {
      const newArray = [...prev, newPerson];
      return newArray;
    });
  }

  async function handleDelete(e) {
    const targetID = Number(e.currentTarget.parentNode.dataset.id);
    // console.log(targetID);

    const filteredPeople = people.filter((person) => person.id === targetID);
    const notEqualPerson = people.filter((person) => person.id !== targetID);
    // console.log(filteredPeople[0].id);
    fetch('/api/feedback', {
      method: 'DELETE',
      body: JSON.stringify(filteredPeople[0].id),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setPeople(notEqualPerson);
  }

  return (
    <>
      <StyledDiv>
        <form onSubmit={handleSubmit}>
          <label htmlFor='fName'>First name</label>
          <input ref={fNameRef} type='text' id='fName' name='fName' />

          <label htmlFor='lName'>Last name</label>
          <input ref={lNameRef} type='text' id='lName' name='lName' />

          <label htmlFor='age'>Age</label>
          <input ref={ageRef} type='number' id='age' name='age' />

          <button type='submit'>Submit</button>
        </form>
        <hr />
        <ul>
          {people.map((person) => {
            const { id, fName, lName } = person;
            return (
              <li key={id} data-id={id}>
                {fName} {lName}
                <button onClick={(e) => handleDelete(e)}>delete</button>
              </li>
            );
          })}
        </ul>
      </StyledDiv>
    </>
  );
}

export async function getStaticProps(context) {
  const data = await getData('http://localhost:3000/api/feedback');

  return {
    props: {
      loadedData: data,
      revalidate: 5,
      notFound: false,
    },
  };
}
