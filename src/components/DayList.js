import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const dayListArr = props.days;
  const output = dayListArr.map(day => (
    <DayListItem 
    key={day.id}
    name={day.name}
    spots={day.spots}
    selected={day.name === props.day}
    setDay={props.setDay}/> 
    )
    );

  return <ul> { output } </ul>
}
