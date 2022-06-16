import Head from 'next/head';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { StyledDiv } from '../styles/index.styles';
import { useAppContext } from '../context/context';
import { buildPath, extractData } from './api/people';
// import { getData } from '../utils/fetch';
// import { getFilePathData } from '../utils/fetch';
// import fs from 'fs';
// import path from 'path';

export default function Home(props) {
  const people = props.data;
  // console.log(props.data);
  // const router = useRouter();
  // console.log(router.asPath);

  const fNameRef = useRef();
  const lNameRef = useRef();
  const emailRef = useRef();
  const textRef = useRef();

  function handleSubmit(e) {
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

      fetch('/api/people', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }

  function handleDelete(e) {
    const elementID = Number(e.target.parentNode.dataset.id);
    console.log(elementID);
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
                <button onClick={handleDelete}>Delete</button>
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
