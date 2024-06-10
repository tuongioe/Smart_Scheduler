import {dayMapping} from "../utils/renderArr";
import DatePicker from "react-datepicker";
import {useState} from "react";
import {toISOWithoutZ} from "../utils/dateFormat";
import {createManyTasks, generateTask, getAllCalendars} from "../apis/generate";

export default function RepeatModel() {
    const [formData, setFormData] = useState({
        title: '',
        estimatedTime: '30',
        calendarId: '',
        description: '',
        isRecurring: false,
    });
    const [repeat, setRepeat] = useState({
        type: 'day',
        repeatGap: '1',
        dayOfWeek: [],
        endDate: new Date(),
        hasEndDate: false,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [generatedTasks, setGeneratedTasks] = useState([]);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isRepeatOpen, setIsRepeatOpen] = useState(false);
    const [calendars, setCalendars] = useState([]);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRepeatChange = (e) => {
        setRepeat({
            ...repeat,
            [e.target.name]: e.target.value,
        });
    };

    const handleGenerateBtnClick = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        const { title, calendarId, description, estimatedTime, isRecurring } =
            formData;
        const request = {
            title,
            calendarId,
            description,
            estimatedTime,
            isRecurring,
        };
        if (isRecurring === 'true') {
            const cleanRepeat = {
                type: repeat.type,
                repeatGap: repeat.repeatGap,
                dayOfWeek: repeat.dayOfWeek,
            };
            if (repeat.hasEndDate === 'true')
                cleanRepeat.endDate = toISOWithoutZ(repeat.endDate);
            request.repeat = cleanRepeat;
        }
        console.log(request);
        const task = await generateTask(request);
        setGeneratedTasks([...generatedTasks, task]);
        console.log(task);
        setIsLoading(false);
    };

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        const createdTasks = await createManyTasks(generatedTasks);
        console.log(createdTasks);
        setIsLoading(false);
    };

    const fetchCalendars = async () => {
        const { data } = await getAllCalendars();
        setCalendars(data);
        setFormData({ ...formData, calendarId: data[0].id });
        setIsLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <div className="bg-[#262525] p-6 rounded-xl w-[300px]">
                <h2 className="text-xl font-bold mb-4">Repeat Options</h2>
                <div className="mb-4">
                    <label className="block mb-2">Repeat every:</label>
                    <div className="grid grid-cols-2">
                        <input
                            name="repeatGap"
                            min={1}
                            type="number"
                            value={repeat.repeatGap}
                            onChange={handleRepeatChange}
                            className="text-center"
                        />
                        <select
                            name="type"
                            value={repeat.type}
                            onChange={handleRepeatChange}
                            className="w-full p-2 rounded bg-[#262525] border border-primary-200"
                        >
                            <option value="day">Day</option>
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                            <option value="year">Year</option>
                        </select>
                    </div>
                </div>
                {repeat.type === 'week' && (
                    <div className="mb-4">
                        <label className="block mb-2">Days:</label>
                        <div className="flex space-x-2">
                            {dayMapping.map(({ value, label }) => (
                                <button
                                    key={value}
                                    className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                        repeat.dayOfWeek.includes(value)
                                            ? 'bg-primary-50 text-white'
                                            : 'bg-[#262525] border border-primary-200'
                                    }`}
                                    onClick={() =>
                                        setRepeat({
                                            ...repeat,
                                            dayOfWeek: [...repeat.dayOfWeek, value],
                                        })
                                    }
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                <div className="mb-4">
                    <label className="block mb-2">End:</label>
                    <select
                        value={repeat.hasEndDate}
                        name="hasEndDate"
                        onChange={handleRepeatChange}
                        className="w-full p-2 rounded bg-[#262525] border border-primary-200"
                    >
                        <option value={false}>Never</option>
                        <option value={true}>On Date</option>
                    </select>
                </div>
                {repeat.hasEndDate === 'true' && (
                    <div className="mb-4">
                        <label className="block mb-2">End Date:</label>
                        <DatePicker
                            selected={repeat.endDate}
                            onChange={(date) => setRepeat({ ...repeat, endDate: date })}
                            className="w-full p-2 rounded bg-[#262525] border border-primary-200"
                        />
                    </div>
                )}
                <button
                    onClick={() => setIsRepeatOpen(!isRepeatOpen)}
                    className="w-full mt-4 bg-primary-50 p-2 rounded text-white"
                >
                    Save
                </button>
            </div>
        </div>
    );
}