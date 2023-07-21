import { useState } from "react";
import { getBgValue, getDateString } from "../utils";

export default function Cell({ date, value }) {

    const [active, setActive] = useState(false);

    function handleBlur(e) {
        e.target.checked = false;
        setActive(false);
    }

    const bg = value === 0 ? 'bg-gray-200' : `bg-value-${getBgValue(value)}`;
    
    return (
        <div className="relative">
            <label
            className={`block ${bg} h-4 w-4 cursor-pointer
            ${active ? 'ring-1 ring-black' : 'hover:ring-[1px] ring-neutral-500'}`}>
                <input
                onChange={e => setActive(e.target.checked)}
                type="radio"
                onBlur={handleBlur}
                value={date.toString()}
                className="opacity-0 cursor-pointer"
                name="calendar" />
            </label>
            <div className={`hint ${active ? 'block' : 'hidden'}`}>
                <div className="hint-content">
                    <span className="text-white text-sm mb-1">{value} contributions</span>
                    <span className="text-[12px] text-gray-400">{getDateString(date)}</span>
                </div>
                <div className="hint-pick"></div>
            </div>
        </div>
    );
}