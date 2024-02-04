import './Checkbox.css'
import { useEffect, useRef } from "react";
import React from "react";

export default function Checkbox({ name, mainTitle, titles, ids, checkedIds, handleChange }) {
  const refs = useRef({});
  useEffect(() => {
    Object.keys(refs.current).forEach((id) => {
      refs.current[id].checked = checkedIds.includes(id);
    });
  }, [checkedIds]);

  return (
    <>
      <label htmlFor={name} className={`${name}-label`} >{mainTitle}</label>
      <div className={`${name}-container`}>
        {ids.map((id, i) => (
          <React.Fragment key={id}>
            <span className={`${name}-checkbox-container checkbox-container`} >
              <input
                type="checkbox"
                key={id}
                name={name}
                id={id}
                ref={ref => (refs.current[id] = ref)}
                onChange={event => handleChange(refs.current[id].id, event.target.checked)} />
              <label htmlFor={id} >{titles[i]}</label>
            </span>
          </React.Fragment>
        ))}
      </div>
    </>
  )
}