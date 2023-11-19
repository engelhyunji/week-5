    import React, { useState } from 'react';
    import axios from 'axios';

    const VocQuestion = () => {
    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('');
    const [content, setContent] = useState('');
    const [username, setUsername] = useState('');
    const [submissionError, setSubmissionError] = useState('');

    const body = {
        category: {
        email,
        title,
        content,
        }
    };

    const handleSubmission = async () => {
        setSubmissionError('');
        try {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Bearer cognito 의 access token`.split('').map(char => char.charCodeAt(0) < 128 ? char : '').join(''),
        };

        const endpointUrl = `${process.env.REACT_APP_SERVER_URL_1}/category`;
        console.log('POST request to:', endpointUrl);

        await axios.post(endpointUrl, body, { headers });
        console.log('Question submitted successfully!');
        } catch (error) {
        console.error('Error submitting question:', error);
        setSubmissionError(error.message || 'An error occurred while submitting the question.');
        }
    };

    return (
        <>
        <h2 align="center">게시글 작성</h2>
        <div className="voc-view-wrapper">
            <div className="voc-view-row">
            <label>Email</label>
            <input onChange={(event) => setEmail(event.target.value)} value={email} />
            </div>
            <div className="voc-view-row">
            <label>제목</label>
            <input onChange={(event) => setTitle(event.target.value)} value={title} />
            </div>
            <div className="voc-view-row">
            <label>내용</label>
            <textarea onChange={(event) => setContent(event.target.value)} value={content} />
            </div>
            <div className="voc-view-row">
            <label>사용자명</label>
            <input onChange={(event) => setUsername(event.target.value)} value={username} />
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
