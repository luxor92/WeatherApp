import React from "react";

class Form extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.weather}>
                <input type={"text"} name={"city"} placeholder={"Ваше месторасположение"}/>
                <button>Узнать погоду</button>
            </form>
        )
    }
}

export default Form