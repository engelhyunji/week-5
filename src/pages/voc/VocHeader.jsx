// import React from 'react';
// import { Link } from 'react-router-dom';
// import './VocHeader.css';

    // const VocHeader = ({ headersName, children }) => {
    // return (
    //     <div className="voc-header">
    //         <h2 align="left">Q/A</h2>
    //         <Link to='/voc/question'>
    //             <button align="right" className="voc-view-go-list-btn" >
    //             게시글 작성
    //             </button>
    //         </Link>
    //     </div>
    // )
    // }




    // const VocHeader = ({ children }) => {
    //     return (
    //       <div className="voc-header">
    //         <h2 align="left">Q/A</h2>
    //         <Link to='/voc/question'>
    //           <button align="right" className="voc-view-go-list-btn">
    //             게시글 작성
    //           </button>
    //         </Link>
    //       </div>
    //     );
    //   };
    

    import React from 'react';
    import { Link } from 'react-router-dom';
    import './VocHeader.css';

    const VocHeader = () => {
    return (
    <div className="voc-header">
    <h2 align="left">Q/A</h2>
    <Link to='/voc/question'>
    <button align="right" className="voc-view-go-list-btn">
    게시글 작성
    </button>
    </Link>
    </div>
    );
    };




    export default VocHeader;