import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetCategory = () => {
const [category, setCategory] = useState({});

useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL_1}/board`).then((response) => {
    console.log('요청 데이터 ->', response.data);
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

const VocQuestion = () => {
const [categoryId, setCategoryId] = useState(1);
const [title, setTitle] = useState('');
const [email, setEmail] = useState('');
const [content, setContent] = useState('');
const [submissionError, setSubmissionError] = useState('');

const handleSubmission = async () => {
    setSubmissionError('');
    try {
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer cognito 의 access token`.split('').map(char => char.charCodeAt(0) < 128 ? char : '').join(''),
    };

    const body = {
        title,
        email,
        context: content,
        category: categoryId,
    };

    await axios.post(`${process.env.REACT_APP_SERVER_URL_1}/board/category`, body, { headers });
    console.log('Question submitted successfully!');
    } catch (error) {
    console.error('Error submitting question:', error);
    setSubmissionError(error.message || 'An error occurred while submitting the question.');
    }
};



const categories = GetCategory();

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
        <button className="voc-view-go-list-btn" onClick={handleSubmission}>
        등록
        </button>
        {submissionError && <p className="error-message">{submissionError}</p>}
    </div>
    </>
);
};

export default VocQuestion;
