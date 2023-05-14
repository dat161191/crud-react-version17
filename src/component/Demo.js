import React, { useState } from "react";
export class Demo3 extends React.Component {
    state = {
        name: 'tan',
        age: 18
    }
    render() {
        return (
            <div>
                <h1>Demo3 {this.state.name}-{this.state.age}</h1>
            </div>
        )
    }
}
export const Demo1 = () => {
    const [tan, setTan] = useState({
        name: 'tan', age: 18
    })
    return (
        <div>
            <input value={tan.name} onChange={event => setTan()} />
        </div>
    )
};

export const Demo2 = () => {
    return (
        <div>
            <h1>Đây là demo2 </h1>
        </div>
    )
};