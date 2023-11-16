    import React from 'react';
    import Header from './table/Header';

    function Layout({ children }) {
    
    const sections = [
        { title: '게시글 목록', url: '/voc' },
        { title: '게시글 작성', url: '/voc/:vocId' },
    
    ];

    const title = 'Hyunji Website';  

    return (
        <>
        <header>
            <Header sections={sections} title={title} />
        </header>
        <main>
            {children}
        </main>
        <footer>
            
        </footer>
        </>
    );
    }

    export default Layout;
