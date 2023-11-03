import './Checkbox.css'
import { useEffect, useRef } from "react";
import React from "react";

export default function Checkbox({ name, mainTitle, titles, ids, checkedIds, handleOptionsSideBarChange }) {
    const refs = useRef({});
    useEffect(() => {
        Object.keys(refs.current).forEach((id) => {
            refs.current[id].checked = checkedIds.includes(id);
        });
    }, [checkedIds]);

    return (
        <>
            <label htmlFor={name} className={`title-label-${name}`} >{mainTitle}</label>
            <div className={`container-${name}`}>
                {
                    ids.map((id, i) => (
                        <React.Fragment key={id}>
                            <span className={`checkbox-input-label-container ${name}`} >
                                <input
                                    type="checkbox"
                                    key={id}
                                    name={name}
                                    id={id}
                                    ref={ref => (refs.current[id] = ref)}
                                    onChange={event => handleOptionsSideBarChange(refs.current[id].id, event)} />
                                <label htmlFor={id} >{titles[i]}</label>
                            </span>
                        </React.Fragment>
                    ))
                }
            </div >
        </>
    )
}