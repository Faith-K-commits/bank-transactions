import React from 'react'

const SearchBar = ({ onSearch }) => {
    const handleSearch = e => {
        onSearch(e.target.value)
    }
    return (
        <input type="text" placeholder='search transactions' onChange={handleSearch} />
    )
}

export default SearchBar