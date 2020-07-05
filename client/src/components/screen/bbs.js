import React, { Component }  from 'react';
import { Table,
  Pagination, 
  PaginationItem, 
  PaginationLink, 
  Input,
  FormGroup,
  Label,
  Button, 
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  CardBody,
  CardTitle
} from 'reactstrap';


const bbs = () => {
  
  return (
    
    <>
    <div className="dashboard">
    <div className="container">
    <div className="row">
    <div className="col-md-12">
      <CardBody>
        <h1 className="display-4">
          자유게시판
        </h1>
      </CardBody>
    </div>
    
      <Table>
        <thead>
          <tr>
            <th>분류</th>
            <th>제목</th>
            <th>작성자</th>
            <th>댓글수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
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
      </div>
    </div>
    </div>
    </>
    
  
  )
}

export default bbs;