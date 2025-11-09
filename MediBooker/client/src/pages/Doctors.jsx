// import React, { useEffect, useState } from "react";
// import DoctorCard from "../components/DoctorCard";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import "../styles/doctors.css";
// import fetchData from "../helper/apiCall";
// import Loading from "../components/Loading";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading } from "../redux/reducers/rootSlice";
// import Empty from "../components/Empty";

// const Doctors = () => {
//   const [doctors, setDoctors] = useState([]);
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.root);

//   const fetchAllDocs = async () => {
//     dispatch(setLoading(true));
//     const data = await fetchData(`/doctor/getalldoctors`);
//     setDoctors(data);
//     dispatch(setLoading(false));
//   };

//   useEffect(() => {
//     fetchAllDocs();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       {loading && <Loading />}
//       {!loading && (
//         <section className="container doctors">
//           <h2 className="page-heading">Our Doctors</h2>
//           {doctors.length > 0 ? (
//             <div className="doctors-card-container">
//               {doctors.map((ele) => {
//                 return (
//                   <DoctorCard
//                     ele={ele}
//                     key={ele._id}
//                   />
//                 );
//               })}
//             </div>
//           ) : (
//             <Empty />
//           )}
//         </section>
//       )}
//       <Footer />
//     </>
//   );
// };

// export default Doctors;
// Doctors Listing Page
// Developed by Priyanshu for MediBooker

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DoctorCard from "../components/DoctorCard";
import Loading from "../components/Loading";
import Empty from "../components/Empty";
import fetchData from "../helper/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/reducers/rootSlice";
import "../styles/doctors.css";
import toast from "react-hot-toast";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const loadAllDoctors = async () => {
    try {
      dispatch(setLoading(true));
      const response = await fetchData("/doctor/getalldoctors");
      setDoctors(response || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("Unable to fetch doctors at the moment.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    loadAllDoctors();
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <section className="container doctors">
          <h2 className="page-heading">Our Verified Doctors</h2>
          {doctors.length > 0 ? (
            <div className="doctors-card-container">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor._id} ele={doctor} />
              ))}
            </div>
          ) : (
            <Empty />
          )}
        </section>
      )}
      <Footer />
    </>
  );
};

export default Doctors;
