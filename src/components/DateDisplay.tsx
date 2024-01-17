import dateFormat from "dateformat";

function DateDisplay({date}: {date: Date}){
    return (
        <div className="flex flex-row  h-full w-full pl-8">
            <p className="text-[5vh]">{dateFormat(date.toLocaleDateString(), "UTC:dddd, mmmm dS")}</p>
        </div>
    );
}

export default DateDisplay