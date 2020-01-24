import React, { useState, useEffect } from "react";
import Appointment from "../components/Appointment";
import "components/Application.scss";
import "components/InterviewerListItem.scss";
import DayList from "../components/DayList";
import axios from "axios";
import { getAppointmentsForDay } from "../helpers/selectors";
import { getInterview } from "../helpers/selectors";



export default function Application(props) {


  const setDay = day => setState({ ...state, day });

  // --------------------------------- getting data from api ------------------------------//
  useEffect(() => {
    const day = axios.get("api/days");
    const appointment = axios.get("/api/appointments");
    const interviewer = axios.get("/api/interviewers");
    Promise.all([
      Promise.resolve(day),
      Promise.resolve(appointment),
      Promise.resolve(interviewer)
    ]).then((all) => {
      setState(prev => ({ days: all[0].data, appointments: all[1].data, interviews: all[2].data }))
    });

  }, []);

  // ------------------------------ use state for setting days data --------------------------//
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviews: {}
  });

  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    
    const interview = getInterview(state, appointment.interview);
    // console.log("interviewer in application", interviewer);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={state.interviewers}
        //interviewer={interviewer}
      />
    );
  });


  return (
    <main className="layout">
      <section className="sidebar">
        
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
        {schedule}
        <Appointment interviewers={state.interviewers} key="last" time="5pm" />
      </section>
    </main>
  );
}
