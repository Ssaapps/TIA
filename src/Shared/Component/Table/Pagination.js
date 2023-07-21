import React, { useState } from 'react';

const Pagination = ({ totalResults, currentPage, resultsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    const handlePrevClick = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <nav className="flex items-center justify-between w-full border-t border-gray-200 bg-white px-4 py-3 sm:px-6" aria-label="Pagination">
            <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(currentPage - 1) * resultsPerPage + 1}</span> to{' '}
                    <span className="font-medium">
                        {Math.min(currentPage * resultsPerPage, totalResults)}
                    </span>{' '}
                    of <span className="font-medium">{totalResults}</span> results
                </p>
            </div>
            <div className="flex flex-1 justify-between sm:justify-end">
                <button
                    onClick={handlePrevClick}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </button>
                <button
                    onClick={handleNextClick}
                    disabled={currentPage === totalPages}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </button>
            </div>
        </nav>
    );
};

export default Pagination;
