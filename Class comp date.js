import React , {Component} from "react";

class DateDisplay extends Component{
    render()
    {
        return(
            <div>
                <h2>Student Attendence</h2>
                <p>
                    Name : {this.props.name}
                </p>
                <p>
                    Attendence : {this.props.attendence} %
                </p>
            </div>
        );
    }
}

class App extends Component{
    constructor{
        super();
        this.state = {
            name = "Hunny",
            attendence = "85"
        };
    }

    render()
    {
        return(
            <div>
                <h1>
                    Attendence System
                </h1>
                <DateDisplay name={this.state.name} attendence={this.state.attendence} />
            </div>
        );
    }
}

export default App;