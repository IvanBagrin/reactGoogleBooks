import React from 'react'

export default ({handleSort, sortDefault, sortDefaultCategory, handleSortDefaultCategory})=> {
        return (
            <div className = 'row'>
                <select className=" col form-select" value = {sortDefault} onChange = {handleSort}>
                    <option value = "Relevance">Relevance</option>
                    <option value = "Newest">Newest</option>
                </select>
                <select className="col form-select" value = {sortDefaultCategory} onChange = {handleSortDefaultCategory}>
                    <option value = "all">All</option>
                    <option value = "art">Art</option>
                    <option value = "biography">Biography</option>
                    <option value = "computers">Computers</option>
                    <option value = "history">History</option>
                    <option value = "medical">Medical</option>
                    <option value = "poetry">Poetry</option>
                </select>
            </div>
        )
    }
