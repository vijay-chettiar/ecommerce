import React from 'react'
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Model from './Model';
import Pagination from './Pagination';
const Product = () => {
    const [data, setdata] = useState([]);
    const [show, setShow] = useState(false);
    const [tempData, settempData] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [productPerPage] = useState(10);


    const handleModal = (desc, cat, image) => {
        let tempData = [desc, cat, image];
        settempData(item => [1, ...tempData]);
        setShow(true);
    }

    const handleHoverModal = (desc, cat, image) => {
        let tempData = [desc, cat, image];
        settempData(item => [1, ...tempData]);
        setTimeout(() => {
            setShow(true)
        }, 500)
    }


    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setdata(json)
            })
    }, []);

    const indexoflastproduct = currentPage * productPerPage;
    const indexoffirstproduct = indexoflastproduct - productPerPage;
    var currentProducts = data.slice(indexoffirstproduct, indexoflastproduct)

    const paginate = (pageNumber) => setcurrentPage(pageNumber);

    const handleMen = () => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setdata(json.filter((ele) => {
                    return ele.category === `men's clothing`
                }))
            })
    }
    const handleElectronics = () => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setdata(json.filter((ele) => {
                    return ele.category === `electronics`
                }))
            })
    }
    const handleJewelery = () => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setdata(json.filter((ele) => {
                    return ele.category === `jewelery`
                }))
            })
    }
    const handleWomen = () => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setdata(json.filter((ele) => {
                    return ele.category === `women's clothing`
                }))
            })
    }
    const handleAll = () => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setdata(json)
            })
    }

    return (
        <>
            <div className="head" style={{ display: "flex", justifyContent: "center", backgroundColor: "skyblue" }}>
                <h1>Our Selections</h1>
            </div>


            <DropdownButton id="dropdown-basic-button" title="categories" className='m-4'>
                <Dropdown.Item onClick={handleAll}>All Products</Dropdown.Item>
                <Dropdown.Item onClick={handleMen}>Men's Clothing</Dropdown.Item>
                <Dropdown.Item onClick={handleJewelery}>Jewelery</Dropdown.Item>
                <Dropdown.Item onClick={handleWomen}>Women's Clothing</Dropdown.Item>
                <Dropdown.Item onClick={handleElectronics}>Electronics</Dropdown.Item>
            </DropdownButton>

            <div className="maincontainer" style={{ display: "flex", flexWrap: "wrap", margin: "20px", justifyContent: "center", gap: "20px" }}>
                {
                    currentProducts.map((ele, index) => {
                        return (
                            <div className="product" style={{ margin: "20px", cursor: "pointer" }} key={index}>
                                <img src={ele.image} width="250px" height="250px" alt="product"
                                    onClick={() => handleModal(ele.description, ele.category, ele.image)}
                                    onMouseOver={() => handleHoverModal(ele.description, ele.category, ele.image)} />
                            </div>
                        )
                    })
                }
            </div>

            {
                show === true ? <Model image={tempData[3]} desc={tempData[1]} category={tempData[2]} show={show} setShow={setShow} /> : ""
            }
            <Pagination productPerPage={productPerPage} totalProducts={data.length} paginate={paginate} />
        </>
    )
}

export default Product