import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryItem } from './CategoryItem';

import {
  Navbar,
  NavbarBrand,
  Nav,
  Input,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

export const Home = () => {
  const nav=useNavigate()
  const [value, setvalue] = useState("")
  const [active, setActive] = useState(null);
  const [selectSize, setSelectSize] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const handleCart=()=>{
    nav('/Cart')
  }
  const handleLogout=()=>{
    nav('/')
  }
  const handleSearch=(e)=>{
    const searchTem=e.target.value.toLowerCase();
    setvalue(searchTem)
  }

  const clickCategory = (category) => {
    setActive(active === category ? null : category);
  };

  const toggleDropdown = () => setDropdown(!dropdown);

  const handleSizeFilter = (size) => {
    setSelectSize(size);
  };

  return (
    <div className='main-div'>
       <Button className='cart' aria-label="Cart" onClick={handleCart}>
          <i className="bi bi-cart-plus-fill"></i>
        </Button>
      <div >
        <Navbar expand="lg" className='navbar'>
          <NavbarBrand className="logo mx-sm-auto mx-auto mx-md-0" href="/Home">
            Fashion<span style={{ color: "Blue", fontSize: "25px", fontFamily: "monospace" }}>Now</span>
          </NavbarBrand>
          <div className='d-flex mx-auto mx-sm-auto mx-md-0'>
            <Nav className="Search" navbar>
              <Input placeholder='Search' value={value} onChange={handleSearch} />
              <Button className='Search-btn'  >
                <i className="bi bi-search"></i>
              </Button>
              <button onClick={handleLogout} className='log-out'><i class="bi bi-box-arrow-right"></i></button>
            </Nav>
          </div>
        </Navbar>
      </div>
      
      <div className='container  filter-container '>
        <div className='filter-img' style={{ 
            backgroundImage: `url("https://images.unsplash.com/photo-1532074662130-17f5486532b0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")` 
          }} onClick={() => clickCategory('men')}>
          <div className='filter-title'>Mens Collection</div>
        </div>
        <div className='filter-img' style={{ 
            backgroundImage: `url("https://images.unsplash.com/photo-1712652517126-2e94d47f0cc9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")` 
          }} onClick={() => clickCategory('women')}>
          <div className='filter-title'>Womens Collection</div>
        </div>
        <div className='filter-img' style={{ 
            backgroundImage: `url("https://images.unsplash.com/photo-1707745735858-2d323a349d6d?q=80&w=2037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")` 
          }} onClick={() => clickCategory('child')}>
          <div className='filter-title'>Child Collection</div>
        </div>
      </div>
      <div className='container-fluid mt-3 my-3 filter-btn ' >
        <Dropdown isOpen={dropdown} toggle={toggleDropdown} >
          <DropdownToggle caret size="sm" className="text-dark bg-light">
            {selectSize ? `Filtered` : 'Filter'}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => handleSizeFilter(null)}>All Size</DropdownItem>
            <DropdownItem onClick={() => handleSizeFilter('XS')}>XS</DropdownItem>
            <DropdownItem onClick={() => handleSizeFilter('S')}>S</DropdownItem>
            <DropdownItem onClick={() => handleSizeFilter('M')}>M</DropdownItem>
            <DropdownItem onClick={() => handleSizeFilter('L')}>L</DropdownItem>
            <DropdownItem onClick={() => handleSizeFilter('XL')}>XL</DropdownItem>
            <DropdownItem onClick={() => handleSizeFilter('XXL')}>XXL</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      
      {/* Pass the active category and selected size to CategoryItem */}
      <CategoryItem category={active} size={selectSize} searchQuery={value} />
    </div>
  );
};
