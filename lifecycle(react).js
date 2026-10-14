import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      name: ""
    };
    console.log("Constructor");
  }

  componentDidMount() {
    this.setState({
      students: ["Varshini", "Rahul", "Priya"]
    });
    console.log("Component Mounted");
  }

  componentDidUpdate() {
    console.log("Component Updated");
  }

  componentWillUnmount() {
    console.log("Component Unmounted");
  }

  addStudent = () => {
    if (this.state.name !== "") {
      this.setState({
        students: [...this.state.students, this.state.name],
        name: ""
      });
    }
  };

  render() {
    console.log("Render");

    return (
      <div>
        <h2>Student Management</h2>

        <input
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
          placeholder="Enter student name"
        />

        <button onClick={this.addStudent}>Add Student</button>

        <h3>Student List</h3>

        <ul>
          {this.state.students.map((student, index) => (
            <li key={index}>{student}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;