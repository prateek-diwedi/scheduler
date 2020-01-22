import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

// export default function InterviewerList(props) {
//   const interviewrArr = props.interviewers;
  
//   const interviewers = interviewrArr.map(interviewer => (
//     <InterviewerListItem
//       key={interviewer.id}
//       name={interviewer.name}
//       avatar={interviewer.avatar}
//       selected={interviewer.id === props.interviewer}
//       setInterviewer={props.setInterviewer}
//     />
//   ));

//   return (
//     <section className="interviewers" >
//   <h4 className="interviewers__header text--light">Interviewer</h4>
//   <ul className="interviewers__list">{ interviewers }</ul>
// </section>
//   )
// }

export default function InterviewerList(props) {
  const { interviewers, onChange, value } = props;
  const interviewerList = interviewers.map(({
    id,
    name,
    avatar
  }) => {
    return (
      <InterviewerListItem
        key={id}
        name={name}
        avatar={avatar}
        selected={id === value}
        setInterviewer={() => onChange(id)}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  );
};