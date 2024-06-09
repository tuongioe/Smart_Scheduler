import React, {useContext, useEffect, useRef, useState} from "react";
import {axiosClient} from '../utils/util';
import GlobalContext from "../context/GlobalContext";

export default function EventAddLabelModel() {
    const {
        setShowEventAddLabelModelModal,
        selectedEvent,
        labelClasses,
        addLabel
    } = useContext(GlobalContext);

    const [title, setTitle] = useState(
        selectedEvent ? selectedEvent.title : ""
    );

    const [selectedLabel, setSelectedLabel] = useState(
        selectedEvent
            ? labelClasses.find((lbl) => lbl === selectedEvent.color)
            : labelClasses[0]
    );

    const modalRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowEventAddLabelModelModal(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalRef]);

    function handleSubmit(e) {
        e.preventDefault();

        axiosClient.post('/calendar',{
            title,
            color: selectedLabel,
        })
            .then(result=>{
                addLabel(
                    result.data.id,
                    selectedLabel,
                    title
                );
            })
            .catch(error=>{
                alert(error);
            })

        setShowEventAddLabelModelModal(false);
    }
    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
            <form className="rounded-lg shadow-2xl w-1/4" style={{backgroundColor: "rgb(38,37,37,1)"}}>
                <header className="px-4 py-2 flex justify-between items-center">
                  <span className="material-icons-outlined text-gray-400">
                  </span>
                    <div>
                        <button onClick={() => setShowEventAddLabelModelModal(false)}>
                            <svg widht="20" height="20" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" stroke="#ffff">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                                        fill="#ffffff"></path>
                                </g>
                            </svg>
                        </button>
                    </div>
                </header>
                <div className="p-3">
                    <div className="grid grid-cols-1/5 items-end gap-y-8">
                        <div></div>
                        <input
                            type="text"
                            name="title"
                            placeholder="Calendar title"
                            value={title}
                            required
                            className="pt-3 border-0 text-white text-xl font-semibold pb-2 w-full border-b-2 border-gray-500 focus:outline-none "
                            onChange={(e) => setTitle(e.target.value)}
                            style={{backgroundColor: "rgb(38,37,37,1)"}}
                        />


                        <div className="flex gap-x-2 align-middle">
                            <svg width="30" height="30" fill="#ffffff" viewBox="0 0 512 512"
                                 xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier"><title>ionicons-v5-m</title>
                                    <path
                                        d="M441,336.2l-.06-.05c-9.93-9.18-22.78-11.34-32.16-12.92l-.69-.12c-9.05-1.49-10.48-2.5-14.58-6.17-2.44-2.17-5.35-5.65-5.35-9.94s2.91-7.77,5.34-9.94l30.28-26.87c25.92-22.91,40.2-53.66,40.2-86.59S449.73,119.92,423.78,97c-35.89-31.59-85-49-138.37-49C223.72,48,162,71.37,116,112.11c-43.87,38.77-68,90.71-68,146.24s24.16,107.47,68,146.23c21.75,19.24,47.49,34.18,76.52,44.42a266.17,266.17,0,0,0,86.87,15h1.81c61,0,119.09-20.57,159.39-56.4,9.7-8.56,15.15-20.83,15.34-34.56C456.14,358.87,450.56,345.09,441,336.2ZM112,208a32,32,0,1,1,32,32A32,32,0,0,1,112,208Zm40,135a32,32,0,1,1,32-32A32,32,0,0,1,152,343Zm40-199a32,32,0,1,1,32,32A32,32,0,0,1,192,144Zm64,271a48,48,0,1,1,48-48A48,48,0,0,1,256,415Zm72-239a32,32,0,1,1,32-32A32,32,0,0,1,328,176Z"></path>
                                </g>
                            </svg>

                            {labelClasses.map((lblClass, i) => (
                                <span
                                    key={i}
                                    onClick={() => setSelectedLabel(lblClass.color)}
                                    className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${selectedLabel===lblClass.color? "transition-opacity opacity-20":""}`}
                                    style={{backgroundColor: lblClass.color}}
                                >
                                </span>
                            ))}

                            <input type="color" className="w-6 h-6 rounded-full cursor-pointer border-solid border-red-500 border-2"/>
                            <svg onClick={()=>{
                                alert('show color picker')
                            }}
                                width="15" height="15" className="cursor-pointer" style={{"alignSelf":"middle"}} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M4 12H20M12 4V20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"
                                          strokeLinejoin="round"></path>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
                <footer className="flex justify-end p-3 mt-5">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
                    >
                        Save
                    </button>
                </footer>
            </form>
        </div>
    );
}
