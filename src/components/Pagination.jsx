import React from "react";

const Pagination = ({ productPerPage, totalProducts, paginate }) => {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav style={{ display: "flex", justifyContent: "center" }}>
            <ul className="pagination" >
                {
                    pageNumbers.map(number => {
                        <li key={number} className="page-item">
                            <span style={{ cursor: "pointer" }} onClick={() => paginate(number)} className="page-link" >
                                {number}
                            </span>
                        </li>
                    })
                }
            </ul>

        </nav>
    )

}

export default Pagination