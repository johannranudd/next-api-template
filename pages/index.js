import Head from 'next/head';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { StyledDiv } from '../styles/index.styles';
import { useAppContext } from '../context/context';
import { buildPath, extractData } from '../utils/fetch';

export default function Home(props) {
  const [people, setPeople] = useState(props.data);

  const fNameRef = useRef();
  const lNameRef = useRef();
  const emailRef = useRef();
  const textRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      fNameRef.current.value &&
      lNameRef.current.value &&
      emailRef.current.value &&
      textRef.current.value
    ) {
      const formData = {
        id: Date.now(),
        'first name': fNameRef.current.value,
        'last name': lNameRef.current.value,
        email: emailRef.current.value,
        text: textRef.current.value,
      };

      fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(setPeople([...people, formData]));
    }
  }

  function handleDelete(e) {
    const elementID = Number(e.target.parentNode.dataset.id);
    const notEqualToID = people.filter((person) => person.id !== elementID);
    // const EqualToID = people.filter((person) => person.id === elementID);

    fetch('/api/delete', {
      method: 'DELETE',
      body: JSON.stringify(notEqualToID),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(setPeople(notEqualToID));
  }

  return (
    <>
      <StyledDiv>
        <form onSubmit={handleSubmit}>
          <label htmlFor='fName'>first name</label>
          <input ref={fNameRef} type='text' id='fName' name='fName' />

          <label htmlFor='lName'>last name</label>
          <input ref={lNameRef} type='text' id='lName' name='lName' />

          <label htmlFor='email'>Email</label>
          <input ref={emailRef} type='email' id='email' name='email' />

          <textarea
            ref={textRef}
            name='text'
            id='text'
            cols='30'
            rows='10'
          ></textarea>

          <button type='submit'>Submit form</button>
        </form>
        <ul>
          {people.map((person) => {
            const {
              id,
              'first name': fName,
              'last name': lName,
              email,
              text,
            } = person;
            return (
              <li key={id} data-id={id}>
                <p>{fName}</p>
                <p>{lName}</p>
                <p>{email}</p>
                <p>{text}</p>
                <button onClick={(e) => handleDelete(e)}>Delete</button>
              </li>
            );
          })}
        </ul>
      </StyledDiv>
    </>
  );
}

export async function getStaticProps() {
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
