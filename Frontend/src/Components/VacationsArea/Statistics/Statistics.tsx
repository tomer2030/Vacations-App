import { useEffect, useState } from "react";
import vacationService from "../../../Services/VacationService";
import CanvasJSReact from "../../../Assets/Charts/canvasjs.react";
import "./Statistics.css";
import notifyService from "../../../Services/NotifyService";

function Statistics(): JSX.Element {
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;
    let [dataPoints, setDataPoint] = useState<[{}]>();
    const [now, setNow] = useState<string>();

    useEffect(()=>{
        vacationService.getFollowsStatistics()
            .then(statistics => {
                if(statistics.length > 0) {
                    const firstIndex = statistics.findIndex(s => s.followersCount > 0) 
                    dataPoints = [{label: statistics[firstIndex].destination, y: statistics[firstIndex].followersCount }]
                    for(let i = firstIndex + 1; i < statistics.length; i++){
                        if(statistics[i].followersCount > 0) {
                            dataPoints.push({
                                label: statistics[i].destination, 
                                y: statistics[i].followersCount
                            })
                            setDataPoint(dataPoints);
                        }
                    }
                }
            })
            .catch(err=> notifyService.error(err));
            const date = new Date();
            setNow(date.toLocaleString())
    },[]);
    
    const options = {
        theme: "light2",
        data: [{
            type: "column",
            dataPoints: dataPoints
        }]
    }

    return (
        <div className="Statistics">
            <div>
                <h2>Follows Statistics</h2>
                <p>Last Updated: {now}</p>
                <CanvasJSChart options={options}/>

            </div>
			
        </div>
    );
}

export default Statistics;
