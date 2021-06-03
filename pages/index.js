// CLIENT-SIDE RENDERING
// import { useEffect, useState } from "react";
// import axiosApiIntances from "../utils/axios";
// import Layout from "../components/Layout";
// import Navbar from "../components/module/Navbar";
// import styles from "../styles/Home.module.css";

// // Data yang dilempar akan masuk ke props
// export default function Home() {
//   const [users, setUser] = useState([]);

//   // useEffect di render di client (CSR)
//   useEffect(() => {
//     // Sebelum apa-apa, di console.log dulu
//     console.log("Get Data!");
//     getUsers();
//   }, []);

//   const getUsers = () => {
//     axiosApiIntances
//       .get("users")
//       .then((res) => {
//         setUser(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   return (
//     <Layout title="Home">
//       <Navbar />
//       <h1 className={styles.titleHead}>Home Page !</h1>
//       <h2>{process.env.APP_NAME}</h2>
//       {users.map((item, index) => (
//         <div className="d-grid gap-2">
//           <button className="btn btn-primary" type="button" key={index}>
//             {item.name}
//           </button>
//         </div>
//       ))}
//     </Layout>
//   );
// }

// SERVER SIDE RENDERING
import { useEffect, useState } from "react";
import axiosApiIntances from "../utils/axios";
import Layout from "../components/Layout";
import Navbar from "../components/module/Navbar";
import styles from "../styles/Home.module.css";
import { authPage } from "../middleware/authorizationPage";

// Proses getData dilakukan di server
export async function getServerSideProps(context) {
  const data = await authPage(context); // Untuk halaman yang harus login dulu (katanya)
  console.log(data);
  const res = await axiosApiIntances
    .get("users")
    .then((res) => {
      console.log(res.data);
      return res.data; // return kalau hanya satu baris
    })
    .catch((err) => {
      console.log(err);
      return [];
    });

  // Menjembatani 'getServerSideProps' dan....
  return {
    props: { users: res, userLogin: data }, // will be passed to the page component as props
  };
}

// Data yang dilempar akan masuk ke props
export default function Home(props) {
  console.log(props);
  const [users, setUser] = useState(props.users);

  return (
    <Layout title="Home">
      <Navbar />
      <h1 className={styles.titleHead}>Home Page !</h1>
      <h2>{process.env.APP_NAME}</h2>
      {users.map((item, index) => (
        <div className="d-grid gap-2">
          <button className="btn btn-primary" type="button" key={index}>
            {item.name}
          </button>
        </div>
      ))}
    </Layout>
  );
}
