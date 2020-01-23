import React, { useState, useEffect } from "react";
import Appointment from "../components/Appointment";
import "components/Application.scss";
import "components/InterviewerListItem.scss";
import DayList from "../components/DayList";
import axios from "axios";

//-------------------------------------- API's ----------------------------------//
const dayList = "api/days";
const appintmentList = "/api/appointments";

const appointments = [
  {
    id: 1,
    time: "10am",
  },
  {
    id: 2,
    time: "11am",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 2,
    time: "12pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "1pm",
    interview: {
      student: "Prateek Diwedi",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "2pm",
    interview: {
      student: "LUKE",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 5,
    time: "3pm",
    interview: {
      student: "Porson",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 6,
    time: "4pm",
    interview: {
      student: "Eminem",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];


export default function Application(props) {

  // ------------------------------ getting days from the api ------------------------------- //
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));

  // useEffect(() => {
  //   axios.get(dayList, { headers: { 'Content-Type': 'application/json' } })
  //     .then((response) => {
  //       console.log("RESPONSE", response);
  //       setState({...state, days: response.data});
        
  //     }).catch((error) => {
  //       console.log(error);
  //       console.log(error.response.headers);
  //       console.log(error.response.data);
  //     });
  // });
  useEffect(() => {
    axios.get(dayList).then(response => setDays(response.data));
  }, []);

  // ------------------------------ use state for setting days data --------------------------//
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  console.log('state---->>', state);
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

        {appointments.map(appointments => {
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
