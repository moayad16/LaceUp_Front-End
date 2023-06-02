import React from "react";
import "../css/customSelect.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import'animate.css'

export default function CustomSelect(props) {
  const [showed, setShowed] = useState(false);
  const [orientation, setOrientation] = useState(false);
  const [val, setVal] = useState(props.val);

  return (
    <div className="custom_select animate__animated animate__fadeInRightBig">
      <button
        onClick={() => {
          setShowed(!showed);
          setOrientation(!orientation);
        }}
        style={showed ? { boxShadow: "none" } : null}
      >
        {val}
        <FontAwesomeIcon
          style={orientation ? { transform: "rotate(180deg)" } : null}
          icon={faAngleDown}
          size="xl"
        />
      </button>
      {props.options.map((option, index) => {
        return (
          <div
            onClick={(e) => {
              props.update(e.target.innerHTML);
              setVal(e.target.innerHTML);
              setShowed(false);
              setOrientation(false);
            }}
            key={index}
            style={
              showed
                ? {
                    transform: `translateY(${
                      (index + 1) * 5 + index * 10
                    }%) translateX(-2%)`,
                    position: "relative",
                  }
                : null
            }
            className="option"
          >
            {option}
          </div>
        );
      })}
    </div>
  );
}
