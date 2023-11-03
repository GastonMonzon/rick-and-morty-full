import './RadioButtons.css'
import { useEffect, useRef } from "react";
import React from "react";

export default function RadioButtons({ name, mainTitle, titles, ids, checkedId, handleOptionsSideBarChange }) {
    const refs = useRef({});

    useEffect(() => {
        if (refs.current[checkedId]) {
            refs.current[checkedId].checked = true;
        }
    }, [checkedId]);

    return (
        <>
            <label htmlFor={name} className={`title-label-${name}`} >{mainTitle}</label>
            <div className={`container-${name}`}>
                {
                    ids.map((id, i) => (
                        <React.Fragment key={id}>
                            <span className={`input-label-container ${name}`} >
                                <input
                                    type="radio"
                                    key={id}
                                    name={name}
                                    id={id}
                                    ref={(ref) => (refs.current[id] = ref)}
                                    onChange={(event) => handleOptionsSideBarChange(refs.current[id].id, event)}
                                />
                                <label htmlFor={id}>{titles[i]}</label>
                            </span>
                        </React.Fragment>
                    ))}
            </div >
        </>
    );
}