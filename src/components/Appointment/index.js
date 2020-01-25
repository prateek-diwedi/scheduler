
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
//import bookInterview from "../Application";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment({
  id,
  time,
  interview,
  interviewers,
  bookInterview,
  cancelInterview
}) {

  // -------------------------------------- function to save --------------------------------- //
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer
    };
    //bookInterview(id, interview)
    return interview;
  }


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
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={Object.values(interviewers)}
          onCancel={() => back()}
          onSave={(name, interviewer) => {
            transition(SAVING);
            bookInterview(id, save(name, interviewer))
              //transition(SHOW);
              .then(() => transition(SHOW))
              .catch((err) => console.log(err))
            //.catch(() => transition(ERROR_SAVE, true))
          }}
        />
      )}

      {mode === SAVING && <Status message="Saving" />}

      {mode === CONFIRM && (
        <Confirm
          onCancel={() => transition(SHOW)}
          onConfirm={() => {
            transition(DELETING, true)
            cancelInterview(id)
              .then(() => transition(EMPTY))
          }
          }
          message="Are you sure you would like to delete?"

        />
      )}


      {mode === DELETING && <Status message="DELETING" />}
    </article>
  );
}

