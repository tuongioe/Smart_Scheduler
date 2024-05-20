import React, {useContext, useState} from "react";
import GlobalContext from "../context/GlobalContext";
import Day from "./Day";

export default function DayFrame() {
    const { currentDayFrame } = useContext(GlobalContext);
    const [day, setDay] = useState(currentDayFrame);
    const listTime = Array.from({ length: 23 }, (_, index) => `${(index + 1)%12} ${index > 12? "PM":"AM"}`);

    return (
        <React.Fragment>
            <div className="text-red">
                <div className="min-h-11"></div>
                {
                    listTime.map((time, i) => {
                        return <div className="border-gray-200">
                                {(
                                    <React.Fragment>
                                        <p
                                            className={`mt-[42px] text-md `}
                                        >
                                            {time+":"}
                                        </p>
                                    </React.Fragment>
                                )}
                        </div>
                    })
                }
            </div>
            <div className="flex-1 grid-rows-5 text-red">
                <div className="pt-5 pb-5 flex flex-col">
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
