import React from "react";
import "components/InterviewerListItem.scss"
import classnames from "classnames"

export default function InterviewerListItem({avatar,
  selected,
  name,
  setInterviewer}) {
    const interviewerClass = classnames("interviewers__item", {
      "interviewers__item--selected": selected,
      "interviewers__item-image": avatar
    });
    return (
      <li className={interviewerClass} onClick= {() => setInterviewer(name)}>
        <img
          className="interviewers__item-image"
          src={avatar}
          alt={name}
        />
        {selected && name}
      </li>
    );
  }