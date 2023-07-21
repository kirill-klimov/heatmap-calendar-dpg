import ContributionsCalendar from "./components/ContributionsCalendar";
import { useEffect, useState } from "react";

export default function App() {

  useEffect(() => {
    fetchData();
  }, []);

  const [data, setData] = useState([]);

  async function fetchData() {
    const res = await fetch('https://dpg.gg/test/calendar.json');
    const data = await res.json();
    setData(data);
  }

  return (
    <div className="canvas grid place-items-center">
      {
      data.length === 0 ?
      <div>
        <div className="spinner"></div>
      </div>
      :
      <ContributionsCalendar data={data} />
      }
    </div>
  );
}