import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import { getListClockService } from "../../service/ClockService";


const ListClock = (props) => {
    const [clocks, setClocks] = useState([])
    useEffect(() => {
        getListClock()
    }, [])
    const getListClock = async () => {
        let result = await getListClockService();
        console.log('check call API BE: ', result.content);
        setClocks(result.content);
    }
    console.log(clocks);
    return (
        <Container>
            <div className="row py-2">
                {clocks && clocks.length > 0 && clocks.map((ele, index) => {
                    return(
                        <div className="col-3 py-1">
                            <div className="card text-left">
                              <img className="card-img-top" src={ele.url} alt=""/>
                              <div className="card-body">
                                <p className="card-title">{ele.clockName}</p>
                                <p className="card-text">{ele.price}</p>
                              </div>
                            </div>
                        </div>
                    )
                 })}
            </div>
        </Container>

    )
}
export default ListClock;