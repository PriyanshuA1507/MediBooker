// import React, { useEffect, useState } from "react";
// import Empty from "../components/Empty";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import fetchData from "../helper/apiCall";
// import { setLoading } from "../redux/reducers/rootSlice";
// import Loading from "../components/Loading";
// import { useDispatch, useSelector } from "react-redux";
// import jwt_decode from "jwt-decode";
// import axios from "axios";
// import toast from "react-hot-toast";
// import "../styles/user.css";

// const Appointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.root);
//   const { userId } = jwt_decode(localStorage.getItem("token"));

//   const getAllAppoint = async (e) => {
//     try {
//       dispatch(setLoading(true));
//       const temp = await fetchData(
//         `/appointment/getallappointments?search=${userId}`
//       );
//       setAppointments(temp);
//       dispatch(setLoading(false));
//     } catch (error) {}
//   };

//   useEffect(() => {
//     getAllAppoint();
//   }, []);

//   const complete = async (ele) => {
//     try {
//       await toast.promise(
//         axios.put(
//           "/appointment/completed",
//           {
//             appointid: ele?._id,
//             doctorId: ele?.doctorId?._id,
//             doctorname: `${ele?.userId?.firstname} ${ele?.userId?.lastname}`,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         ),
//         {
//           success: "Appointment booked successfully",
//           error: "Unable to book appointment",
//           loading: "Booking appointment...",
//         }
//       );

//       getAllAppoint();
//     } catch (error) {
//       return error;
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       {loading ? (
//         <Loading />
//       ) : (
//         <section className="container notif-section">
//           <h2 className="page-heading">Your Appointments</h2>

//           {appointments.length > 0 ? (
//             <div className="appointments">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>S.No</th>
//                     <th>Doctor</th>
//                     <th>Patient</th>
//                     <th>Appointment Date</th>
//                     <th>Appointment Time</th>
//                     <th>Booking Date</th>
//                     <th>Booking Time</th>
//                     <th>Status</th>
//                     {userId === appointments[0].doctorId?._id ? (
//                       <th>Action</th>
//                     ) : (
//                       <></>
//                     )}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {appointments?.map((ele, i) => {
//                     return (
//                       <tr key={ele?._id}>
//                         <td>{i + 1}</td>
//                         <td>
//                           {ele?.doctorId?.firstname +
//                             " " +
//                             ele?.doctorId?.lastname}
//                         </td>
//                         <td>
//                           {ele?.userId?.firstname + " " + ele?.userId?.lastname}
//                         </td>
//                         <td>{ele?.date}</td>
//                         <td>{ele?.time}</td>
//                         <td>{ele?.createdAt.split("T")[0]}</td>
//                         <td>{ele?.updatedAt.split("T")[1].split(".")[0]}</td>
//                         <td>{ele?.status}</td>
//                         {userId === ele?.doctorId?._id ? (
//                           <td>
//                             <button
//                               className={`btn user-btn accept-btn ${
//                                 ele?.status === "Completed" ? "disable-btn" : ""
//                               }`}
//                               disabled={ele?.status === "Completed"}
//                               onClick={() => complete(ele)}
//                             >
//                               Complete
//                             </button>
//                           </td>
//                         ) : (
//                           <></>
//                         )}
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
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
// export default Appointments;
// User Appointment Management Page
// Developed by Priyanshu for MediBooker

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Empty from "../components/Empty";
import fetchData from "../helper/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/reducers/rootSlice";
import jwtDecode from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/user.css";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);
  const token = localStorage.getItem("token");

  let userId = "";
  try {
    const decoded = jwtDecode(token);
    userId = decoded?.userId;
  } catch {
    localStorage.removeItem("token");
  }

  const fetchAppointments = async () => {
    try {
      dispatch(setLoading(true));
      const response = await fetchData(`/appointment/getallappointments?search=${userId}`);
      setAppointments(response || []);
    } catch (error) {
      toast.error("Failed to fetch appointments. Please try again later.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const markCompleted = async (appointment) => {
    try {
      await toast.promise(
        axios.put(
          "/appointment/completed",
          {
            appointid: appointment?._id,
            doctorId: appointment?.doctorId?._id,
            doctorname: `${appointment?.userId?.firstname} ${appointment?.userId?.lastname}`,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        {
          loading: "Updating appointment status...",
          success: "Appointment marked as completed!",
          error: "Unable to update appointment. Please try again.",
        }
      );
      fetchAppointments();
    } catch (error) {
      console.error("Appointment update error:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  useEffect(() => {
    if (userId) fetchAppointments();
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <section className="container notif-section">
          <h2 className="page-heading">Your Appointments</h2>

          {appointments.length > 0 ? (
            <div className="appointments">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Doctor</th>
                    <th>Patient</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                    <th>Booking Date</th>
                    <th>Booking Time</th>
                    <th>Status</th>
                    {appointments.some((a) => a?.doctorId?._id === userId) && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment, index) => (
                    <tr key={appointment?._id}>
                      <td>{index + 1}</td>
                      <td>
                        {appointment?.doctorId?.firstname} {appointment?.doctorId?.lastname}
                      </td>
                      <td>
                        {appointment?.userId?.firstname} {appointment?.userId?.lastname}
                      </td>
                      <td>{appointment?.date}</td>
                      <td>{appointment?.time}</td>
                      <td>{appointment?.createdAt?.split("T")[0]}</td>
                      <td>{appointment?.updatedAt?.split("T")[1]?.split(".")[0]}</td>
                      <td>{appointment?.status}</td>
                      {userId === appointment?.doctorId?._id && (
                        <td>
                          <button
                            className={`btn user-btn accept-btn ${
                              appointment?.status === "Completed" ? "disable-btn" : ""
                            }`}
                            disabled={appointment?.status === "Completed"}
                            onClick={() => markCompleted(appointment)}
                          >
                            Complete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
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

export default Appointments;
