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
        <div>
            <label htmlFor={name}>{mainTitle}</label>
            {
                ids.map((id, i) => (
                    <React.Fragment key={id}>
                        <input
                            type="radio"
                            key={id}
                            name={name}
                            id={id}
                            ref={(ref) => (refs.current[id] = ref)}
                            onChange={(event) => handleOptionsSideBarChange(refs.current[id].id, event)}
                        />
                        <label htmlFor={id}>{titles[i]}</label>
                    </React.Fragment>
                ))}
        </div>
    );
}