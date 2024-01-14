// import React, { useEffect, useState } from "react";
// import "./style.css";
// import { Link } from "react-router-dom";
// import { USER } from "../../API/Api";
// import { Axios } from "../../API/axios";
// import dev from "./webDev.jpg";

// export default function HomePage() {
//   const [name, setName] = useState("");

//   // useEffect(() => {
//   //   Axios.get(`${USER}`).then((data) => setName(data.data.name));
//   // }, []);

//   return (
//     <div>
//       <div className="navBar" />
//       <div className="container">
//         <Link className="items" to={"/"}>
//           Home
//         </Link>
//         <Link className="items" to={"/about"}>
//           About
//         </Link>{" "}
//         <Link className="items" to={"/"}>
//           Contact us
//         </Link>
//         <div>
//           <Link className="userName" to={"/dashboard"}>
//             <div class="userName1">
//               <img
//                 width="36"
//                 height="36"
//                 src="https://img.icons8.com/material-outlined/48/user--v1.png"
//                 alt="user--v1"
//               />
//               {name}
//             </div>
//           </Link>
//         </div>
//         <div className="underLine" />
//         <div>
//           <img className="Vector10" src={dev} />
//           <div className="paragraph2">Ahmed Saud Alazhrani</div>
//           <div class="paragraph3">You will see my project</div>
//           <div className="paragraph1">
//             I'm full stack developer by using HTML,CSS,PHP and JavaScript with
//             Laravel framework and react JS library
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
