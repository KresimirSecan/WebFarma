import React from 'react';
import './Pagination.css';
function Pagination({ currentPage, totalPages, onPageChange }) {
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    return (
        <div className="pagination-controls">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                <i class="fa-solid fa-chevron-left"></i>
            </button>
            <span>{currentPage} / {totalPages}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    );
}

export default Pagination;
