
import React, { Fragment } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Header from "../Appointment/Header";
import Show from "../Appointment/Show";
import Empty from "../Appointment/Empty";
import Status from "../Appointment/Status";
import Form from "../Appointment/Form";
import Error from "../Appointment/Error";
import Confirm from "../Appointment/Confirm";
import "./styles.scss";
import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment({
  id,
  time,
  interview,
  interviewers
}) {
  // 
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  console.log('INTERVIEWERS >>', interviewers)

  return (
    <article className="{Appointment}">
      <Header time={time} />
      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          //onSave={ () => save()}
          onCancel={ () => back()}
        />
      )}
    </article>
  );
}

