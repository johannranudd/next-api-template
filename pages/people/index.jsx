// import { buildPath, extractData } from '../api/get';

// const People = (props) => {
//   const { data } = props;
//   console.log(data);
//   return (
//     <ul>
//       {data.map((person) => {
//         const {
//           id,
//           'first name': fName,
//           'last name': lName,
//           email,
//           text,
//         } = person;
//         return (
//           <li key={id}>
//             <p>{fName}</p>
//           </li>
//         );
//       })}
//     </ul>
//   );
// };

// export async function getStaticProps() {
//   const filePath = buildPath();
//   const data = extractData(filePath);
//   return {
//     props: {
//       data,
//       revalidate: 5,
//       notFound: false,
//     },
//   };
// }

// export default People;
