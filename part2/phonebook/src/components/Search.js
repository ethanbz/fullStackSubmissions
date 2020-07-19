import React from 'react'

const Search = (props) => 
<div>
    search <input value={props.newSearch} onChange={props.handleSearch} />
</div>

export default Search