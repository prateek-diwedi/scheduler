import React, { useState, useEffect } from "react";
import Appointment from "../components/Appointment";
import "components/Application.scss";
import "components/InterviewerListItem.scss";
import DayList from "../components/DayList";
import axios from "axios";
import { getAppointmentsForDay } from "../helpers/selectors";

//-------------------------------------- API's ----------------------------------//


// const appointments = [
//   {
//     id: 1,
//     time: "10am",
//   },
//   {
//     id: 2,
//     time: "11am",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 2,
//     time: "12pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "1pm",
//     interview: {
//       student: "Prateek Diwedi",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "2pm",
//     interview: {
//       student: "LUKE",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "3pm",
//     interview: {
//       student: "Porson",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 6,
//     time: "4pm",
//     interview: {
//       student: "Eminem",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   }
// ];


export default function Application(props) {

  // ------------------------------ getting days from the api ------------------------------- //
  const setDay = day => setState({ ...state, day });
  //const setDays = days => setState(prev => ({ ...prev, days }));


  useEffect(() => {
    const day = axios.get("api/days");
    const appointment = axios.get("/api/appointments");

    Promise.all([
      Promise.resolve(day),
      Promise.resolve(appointment),
    ]).then((all) => {
      setState(prev => ({ days: all[0].data, appointments: all[1].data }))
      console.log('all---->', all);
    });

  }, []);

  // ------------------------------ use state for setting days data --------------------------//
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  console.log('state---->>', state);
  const pen = getAppointmentsForDay(state, state.day)
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}

        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">

          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />


      </section>
      <section className="schedule">

        {pen.map(appointments => {
          return (
            <Appointment
              key={appointments.id}
              time={appointments.time}
              interview={appointments.interview}
            />
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
