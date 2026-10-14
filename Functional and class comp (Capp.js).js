import React , {Component} from "react";

class Student extends Component{
    render()
    {
        return(
            <div>
                <h1>Class Component</h1>
                <p>Name : {this.props.name}</p>
                <p>Class : {this.props.course}</p>
            </div>
        );
    }
}

function Capp()
{
    return(
        <div>
            <Student name="Hunny" course="btech" />
        </div>
    );
}

export default Capp;