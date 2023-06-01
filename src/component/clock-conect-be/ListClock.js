import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import { getListClockService } from "../../service/ClockService";


const ListClock = (props) => {
    const [clocks, setClocks] = useState([]);
    const [size, setSize] = useState(4);
    useEffect(() => {
        getListClock()
    }, [])
    const getListClock = async () => {
        // console.log("check size: ",size);
        let result = await getListClockService(size);
        // console.log('check call API BE: ', result.content);
        setClocks(result.content);
    }
    const showMore = () => {
        setSize(size + 4);
        // console.log("check size: ",size);
        getListClock();
    }
    const hideAway = () => {
        setSize(4);
        // console.log("check size: ",size);
        getListClock();
    }
    return (
        <Container>
            <h3 className="text-center text-danger">List Clock: connect React with JAva</h3>
            <div className="row py-2">
                {clocks && clocks.length > 0 && clocks.map((ele, index) => {
                    return (
                        <div className="col-3 py-1">
                            <div className="card text-left">
                                <img className="card-img-top" src={ele.url} alt="" />
                                <div className="card-body">
                                    <p className="card-title">{ele.clockName}</p>
                                    <p className="card-text">{ele.price}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="d-flex my-1 align-items-center justify-content-center">
                <a tyle="cursor: pointer; color: #f44336; text-decoration: none" type="button"
                    class="btn btn-primary w-25 text-light me-2 text-center"
                    onClick={() => showMore()}>
                    <i className="fas fa-angle-double-down"></i>Xem thêm...
                </a>
                {clocks && clocks.length && clocks.length > 4 &&
                    <a tyle="cursor: pointer; color: #f44336; text-decoration: none" type="button"
                        class="btn btn-primary w-25 text-light me-2 text-center"
                        onClick={() => hideAway()}>
                        <i className="fas fa-angle-double-down"></i>Ẩn bớt
                    </a>
                }
            </div>
        </Container>

    )
}
export default ListClock;