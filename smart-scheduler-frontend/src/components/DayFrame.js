import React, {useContext, useState} from "react";
import GlobalContext from "../context/GlobalContext";
import Day from "./Day";

export default function DayFrame() {
    const { currentDayFrame } = useContext(GlobalContext);
    const [day, setDay] = useState(currentDayFrame);
    const listTime = Array.from({ length: 23 }, (_, index) => `${(index + 1)%12} ${index > 12? "PM":"AM"}`);

    return (
        <React.Fragment>
            <div className="mt-[12px]">
                {
                    listTime.map((time, i) => {
                        return <div>
                                {(
                                    <React.Fragment>
                                        <p
                                            className={`mt-[53px] `}
                                            style={{fontSize:"12px"}}
                                        >
                                            {time+":"}
                                        </p>
                                    </React.Fragment>
                                )}
                        </div>
                    })
                }
            </div>
            <div className=" grid-rows-4 w-9/12">
                <div className="pt-[10px]">
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
                            <Day day={day.hour(i)} key={i} rowIdx={i}/>
                        </React.Fragment>
                    })
                }
            </div>
        </React.Fragment>
    );
}
