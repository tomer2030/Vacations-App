import "./Home.css";
import vacation from "../../../Assets/Images/vacation2.png";

function Home(): JSX.Element {
    return (
        <div className="Home">
            <h2>Welcome to your next vacation</h2>
            <img src= {vacation}/>

        </div>
    );
}

export default Home;
