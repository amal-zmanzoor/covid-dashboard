import React from 'react';

const Loading= () => {
    return  (
        <div style = {{ height: "100vh", display: "flex", justifyContent: "center",
                        alignItems: "center"}}>
            <div className="spinner-grow text-info" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-info" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-info" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}
 
export default Loading;