import dateFormat from "dateformat";
import { useDateAndTimeContext } from "../contexts/DateAndTimeContext";

function DateDisplay(){
    const {date} = useDateAndTimeContext()
    return (
        <div className="flex flex-row  h-full w-full pl-8 justify-content-center items-center">
            <p className="text-[5vh]">{dateFormat(date.toLocaleDateString(), "UTC:dddd, mmmm dS")}</p>
        </div>
    );
}

export default DateDisplay