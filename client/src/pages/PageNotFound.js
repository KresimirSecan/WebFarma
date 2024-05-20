import React from 'react';
import {Link} from 'react-router-dom';

function PageNotFound(){
    return(
    <div>
        <h2>Page not found</h2>
        <h3>Go to home: </h3>
        <Link to="/" activeClassName="active">Home</Link>
    </div>
    );
}

export default PageNotFound;