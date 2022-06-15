import Head from 'next/head';
import Image from 'next/image';
import { StyledDiv } from '../styles/index.styles';
import { useAppContext } from '../context/context';

export default function Home() {
  const { state, dispatch } = useAppContext();
  // console.log(state);
  return (
    <>
      <StyledDiv>
        test 1
        <button
          onClick={() =>
            dispatch({ type: 'CHANGE_STATE', payload: 'new state value' })
          }
        >
          {state.value}
        </button>
      </StyledDiv>
    </>
  );
}
