function DateDisplay({date}: {date: string}){
    return (
        <div className="flex flex-row  h-full w-full pl-8">
            <p className="text-[5vh]">{date}</p>
        </div>
    );
}

export default DateDisplay