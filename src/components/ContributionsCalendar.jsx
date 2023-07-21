import { useEffect, useState } from "react";
import Cell from "./Cell";
import { formatDate, monthNames } from "../utils";

export default function ContributionsCalendar({ data }) {

    const colors = ['0', '1-9', '10-19', '20-29', '30+']; 
    const [months, setMonths] = useState([]);
    const [contributions, setContributions] = useState([]);

    useEffect(() => {
        const arr = [];
        const map = new Map(Object.entries(data));

        const today = new Date();
        const dayOfWeek = today.getDay();
        const daysTillSunday = (7 - dayOfWeek) % 7;

        for(let i = 0; i < daysTillSunday; i++) {
            const date = new Date();
            date.setDate(date.getDate() + (i + 1));
            arr.push({ date, value: 0 });
        }

        const monthsMap = new Map();

        for(let i = 0; i < 357 - daysTillSunday; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const value = map.get(formatDate(date)) || 0;
            arr.unshift({ value, date });
            monthsMap.set(monthNames[date.getMonth()], null);
        }
        setMonths(Array.from(monthsMap.keys()).reverse());
        setContributions(arr);
    }, [data]);

    return (
        <div>
            <div className="mb-2 flex justify-end">
                <div className="text-sm text-gray-500 flex justify-around calendar-width">
                    { months.map(item => <span key={item} className="translate-x-3">{item}</span>) }
                </div>
            </div>
            <div className="flex mb-6">
                <div className="flex flex-col mr-1">
                    <span className="text-sm text-gray-500 translate-y-[-2px] mb-[14px]">Пн</span>
                    <span className="text-sm text-gray-500 mb-[16px]">Ср</span>
                    <span className="text-sm text-gray-500">Пт</span>
                </div>
                <div className="calendar-grid">
                    {
                    Array(51).fill(null).map((item, i) => {
                        const start = i * 7;
                        const week = contributions.slice(start, start + 7);
                        
                        return (
                        <div key={i} className="flex flex-col gap-[2px]">
                            {
                            week.map((item, i) => {
                                return (
                                <Cell 
                                key={item.date.toString()} 
                                date={item.date} 
                                value={item.value} />
                                );
                            })
                            }
                        </div>
                        );
                    })
                    }
                </div>
            </div>

            <div className="flex justify-end">
                <div className="flex items-center calendar-width ">
                    <span className="text-sm text-gray-500">Меньше</span>
                    <div className="mx-4 flex gap-[2px]">
                    {
                        colors.map((item, i) => {
                        const bg = i === 0 ? 'bg-gray-300' : `bg-value-${i}`;
                        return (
                            <div key={i} className="relative">
                                <div className={`h-4 w-4 ${bg} square`}></div>
                                <div className="hint hidden">
                                    <div className="hint-content">
                                        <span className="text-white text-sm mb-1">{item} contributions</span>
                                    </div>
                                    <div className="hint-pick"></div>
                                </div>
                            </div>
                        );
                        })
                    }
                    </div>
                    <span className="text-sm text-gray-500">Больше</span>
                </div>
            </div>
        </div>
    );
}