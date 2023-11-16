    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import './VocView.css';

    const GetCategory = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL_1}/board/category`);
        return response.data;
    } catch (error) {
        console.log('Error fetching categories:', error);
        throw error;
    }
    };

    function VocQuestion() {
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('');
    const [content, setContent] = useState('');
    const [submissionError, setSubmissionError] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);

    const body = {
        title,
        content,
        email,
    };

    useEffect(() => {
        GetCategory()
        .then((data) => setCategories(data))
        .catch((error) => {
            console.error('Error fetching categories:', error);
        });
    }, []);

    const handleCategoryChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) => parseInt(option.value));
        setSelectedCategories(selectedOptions);
    };

    const handleSubmission = async () => {
        setSubmissionError('');
        try {
        await HandleQuestionSubmit({ body, setSubmissionError });
        console.log('Question submitted successfully!');
        } catch (error) {
        console.error('Error submitting question:', error);
        setSubmissionError(error.message || 'An error occurred while submitting the question.');
        }
    };

    const HandleQuestionSubmit = async ({ body, setSubmissionError }) => {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8', 
            'Authorization': 'Bearer cognito 의 access token',
        };

        try {
        await axios.post('http://localhost:4000/board/voc/question', body, { headers });
        console.log('Question submitted successfully!');
        } catch (error) {
        console.log('Error submitting question:', error);
        setSubmissionError(error.message || 'An error occurred while submitting the question.');
        }
    };

    return (
        <>
        <h2 align="center">게시글 작성</h2>
        <div className="voc-view-wrapper">
            <div className="voc-view-row">
            <label>문의 유형</label>
            <select
            multiple
            onChange={handleCategoryChange}
            value={selectedCategories}
            >
            {categories.map((category) => (
            <option key={category.id} value={category.id}>
            {category.name}
            </option>
            ))}
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
            <button className="voc-view-go-list-btn" onClick={handleSubmission}>등록</button>
            {submissionError && <p className="error-message">{submissionError}</p>}
        </div>
        </>
    );
    }

    export default VocQuestion;
