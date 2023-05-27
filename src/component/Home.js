import React from "react";
import Container from 'react-bootstrap/Container';


const Home = () => {
    return (
        <Container>
            <h3 className="text-danger text-center">Đề tài ứng tuyển Fresher React</h3>
            <p><b>Yêu cầu:</b></p>
            <ul>
                <li>Sử dụng API từ website http://reqres.in/ để tạo website</li>
                <li>Sử dụng React để tạo 1 màn hình website cơ bản bao gồm các chức năng
                    <ol className="text-primary">
                        <li>Đăng nhập</li>
                        <li>Thêm User</li>
                        <li>Sửa User</li>
                        <li>Xoá User</li>
                        <li>Hiển thị list User</li>
                        <li>Tìm kiếm User theo ID hoặc email</li>
                        <li>Sắp xếp theo ID hoặc First Name</li>
                        <li>Import Users từ file .csv</li>
                        <li>Export Users ra file .csv</li>
                    </ol>
                </li>
                <li>Tự do tuỳ chỉnh html, css, để có 1 website đẹp và khoa học</li>
                <li>Commit và đẩy source code lên github</li>
                <li>Triển khai web site lên Heroku để demo</li>

            </ul>


        </Container>
    )
}
export default Home;