import React, { Component } from 'react';
import { Table } from 'reactstrap';

class Dashboard extends Component {
  render () {
        return (
            <Table>
            <thead>
                <tr>
                <th>분류</th>
                <th>제목</th>
                <th>댓글수</th>
                <th>조회수</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row"></th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
                </tr>
            </tbody>
            </Table>
        );
    }
}

export default Dashboard;