import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Items() {
  const [items, setItems] = useState<{id:string, text:string, created_at:string, updated_at:string}[]>([]);
  const [page, setPage] = useState<{total:number, per_page:number, current_page:number, last_page:number, first_page:number}>({current_page:0,first_page:0,last_page:0,per_page:0,total:0});
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [sort, setSort] = useState<{sort:string, direction:string}>({sort:'id',direction:'asc'});

   useEffect(() => {
    const url = new URL('http://core:3333');  
    url.pathname = '/items';
    url.searchParams.append('page', selectedPage.toString());
    url.searchParams.append('sort',sort.sort);
    url.searchParams.append('sortDirection', sort.direction);

    // Add client side cache if time
    fetch(url.toString())
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setItems(data.data);
            setPage(data.meta);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, [selectedPage, sort]);

   // Should add i18n
   const itemTable = <Table striped bordered hover responsive>
   <thead>
     <tr>
       <th>Id</th>
       <th>Text</th>
       <th>Created at</th>
       <th>Updated at</th>
     </tr>
   </thead>
   <tbody>
    {
      items.map((item)=>
        <tr>
          {
            Object.values(item).map((v:any)=>
            <td>
              {v.toString()}
            </td>)
          }
        </tr> 
      )
    }
   </tbody>
 </Table>

  function sortItems(sortKey:string) {
    if(sort.sort === sortKey){
      setSort({sort:sortKey,direction: sort.direction === 'asc' ? 'desc' : 'asc'})
    } else {
      setSort({sort:sortKey,direction: 'asc'})
    }
  }

  const sortDropdown = <DropdownButton
    // as={ButtonGroup}
    key={sort.direction}
    id={`dropdown-button-drop-${sort.direction}`}
    drop={sort.direction === 'asc' ? 'up' : 'down'}
    variant="primary"
    title={`Sort`}
  >
    <Dropdown.Item active={sort.sort === 'id'} onClick={()=>sortItems('id')}>Id</Dropdown.Item>
    <Dropdown.Item active={sort.sort === 'text'} onClick={()=>sortItems('text')}>Text</Dropdown.Item>
    <Dropdown.Item active={sort.sort === 'created_at'} onClick={()=>sortItems('created_at')}>Created at</Dropdown.Item>
    <Dropdown.Item active={sort.sort === 'updated_at'} onClick={()=>sortItems('updated_at')}>Updated at</Dropdown.Item>
  </DropdownButton>


  const pages = []
  if(page.total){
    pages.push(
      <Pagination.Prev onClick={()=> setSelectedPage(selectedPage > 1 ? selectedPage - 1: selectedPage) }/>
    );
    for(let i = page.first_page; i < page.last_page + 1; ++i){
      pages.push(<Pagination.Item active={selectedPage === i} onClick={()=>setSelectedPage(i)}>{i}</Pagination.Item>)
    }
    pages.push(
    <Pagination.Next onClick={()=>setSelectedPage(selectedPage < page.last_page ? selectedPage + 1: selectedPage)}/>
    )
  }

  return (  
    <div className="Items">
      <Row className="justify-content-left" style={{padding:"10px 0"}}>
        <Col md="auto">
          {sortDropdown}
        </Col>
      </Row>
      {itemTable}
      
      <Row className="justify-content-center">
        <Col md="auto">
          <Pagination>
            {pages}  
          </Pagination>
        </Col>
      </Row>
    </div>
  );
}

export default Items;
