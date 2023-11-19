    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import { Link } from 'react-router-dom';
    import styled from 'styled-components';
    import CommonTable from '../../components/table/CommonTable';
    import CommonTableColumn from '../../components/table/CommonTableColumn';
    import CommonTableRow from '../../components/table/CommonTableRow';
    import VocHeader from './VocHeader';

    const StyledVocContainer = styled.div``;

    const StyledVocTable = styled(CommonTable)`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    `;

    const StyledTableColumn = styled(CommonTableColumn)`
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
    vertical-align: inherit;
    `;

    function Voc() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
        const response = await axios.get('http://localhost:4000/board');
        setData(response.data);
        } catch (error) {
        setError(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); 

    if (error) {
        return (
        <>
            <VocHeader />
            <div>Error occurred while fetching data: {error.message}</div>
        </>
        );
    }

    return (
        <>
        <VocHeader />
        <StyledVocContainer>
            <StyledVocTable headersName={['글번호', '제목', '등록일', '작성자']}>
            {data.map((voc) => (
                <CommonTableRow key={voc.id}>
                <StyledTableColumn>{voc.id}</StyledTableColumn>
                <StyledTableColumn>
                    <Link to={`/voc/${voc.id}`}>{voc.title}</Link>
                </StyledTableColumn>
                <StyledTableColumn>{voc.createAt}</StyledTableColumn>
                <StyledTableColumn>{voc.username}</StyledTableColumn>
                </CommonTableRow>
            ))}
            </StyledVocTable>
        </StyledVocContainer>
        </>
    );
    }

    export default Voc;
