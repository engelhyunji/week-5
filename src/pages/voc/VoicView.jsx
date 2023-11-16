    import React, { useEffect, useState } from 'react';
    import axios from 'axios';

    const GetCategory = () => {
    const [category, setCategory] = useState({});

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL_1}/board/category`).then((response) => {
        setCategory(response.data);
        });
    }, []);

    const categories = Object.values(category).map((item) => (
        <option key={item.id} value={item.id}>
        {item.displayName}
        </option>
    ));

    return categories;
    };

    const HandleQuestionSubmit = async ({ body }) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer cognito 의 access token',
    };

    try {
        await axios.post(`${process.env.REACT_APP_SERVER_URL_1}/board/question`, body, { headers });
        console.log('Question submitted successfully!');
    } catch (error) {
        console.log('Error submitting question:', error);
    }
    };

    const VocQuestion = () => {
    const categories = GetCategory();

    const [categoryId, setCategoryId] = useState(1);
    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('');
    const [content, setContent] = useState('');

    const body = {
        categoryId: categoryId,
        title: title,
        content: content,
        email: email,
    };

    return (
        <>
        <h2 align="center">게시글 작성</h2>
        <div className="voc-view-wrapper">
            <div className="voc-view-row">
            <label>문의 유형</label>
            <select onChange={(event) => setCategoryId(parseInt(event.target.value))}>
                {categories}
            </select>
            </div>
            <div className="voc-view-row">
            <label>email</label>
            <input onChange={(event) => setEmail(event.target.value)}></input>
            </div>
            <div className="voc-view-row">
            <label>제목</label>
            <input onChange={(event) => setTitle(event.target.value)}></input>
            </div>
            <div className="voc-view-row">
            <label>내용</label>
            <textarea onChange={(event) => setContent(event.target.value)}></textarea>
            </div>
            <button className="voc-view-go-list-btn" onClick={() => HandleQuestionSubmit({ body })}>등록</button>
        </div>
        </>
    );
    };

    export default VocQuestion;
        