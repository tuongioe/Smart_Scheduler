import React, {useContext, useState} from "react";
import GlobalContext from "../context/GlobalContext";
import Day from "./Day";

export default function DayFrame() {
    const { currentDayFrame } = useContext(GlobalContext);
    const [day, setDay] = useState(currentDayFrame);
    const listTime = Array.from({ length: 23 }, (_, index) => `${(index + 1)%12} ${index > 12? "PM":"AM"}`);

    return (
        <div className="flex w-[688px]">
            <div className="flex w-[1024px]">
                <div className="mt-[26px] flex flex-col ">
                    {
                        listTime.map((time, i) => {
                            return <React.Fragment>
                                            <span
                                                className={`mt-[29px] `}
                                                style={{fontSize:"12px",textWrap: "nowrap"}}
                                            >
                                                {time+":"}
                                            </span>
                                </React.Fragment>

                        })
                    }
                </div>
                <div className="grid grid-cols-1 w-9/12">
                    <div>
                        <header className="flex flex-col items-left text-[#00717F]">
                            {(
                                <React.Fragment>
                                    <p className="text-sm mt-1">
                                        {currentDayFrame.format('ddd').toUpperCase()}
                                    </p>
                                    <p
                                        className={`text-sm p-1 my-1 text-left `}
                                    >
                                        {currentDayFrame.format('DD')}
                                    </p>
                                </React.Fragment>
                            )}

                        </header>
                    </div>
                    {
                        listTime.map((_, i) => {
                            return <React.Fragment key={i}>
                                <Day day={currentDayFrame.hour(i)} key={i} rowIdx={i}/>
                            </React.Fragment>
                        })
                    }
                </div>
            </div>
        </div>
    );
}
