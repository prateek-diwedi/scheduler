
import React, { Fragment } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Header from "../Appointment/Header";
import Show from "../Appointment/Show";
import Empty from "../Appointment/Empty";
import "./styles.scss";



    export default function Appointment(props) {
     // 
    return (
      <article className="{Appointment}">
        <Header time = { props.time } />
      { props.interview ? <Show student={props.interview.student} interviewer = {props.interview.interviewer}/> : <Empty />}
      </article>
    );
    }