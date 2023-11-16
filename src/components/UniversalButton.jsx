import React from 'react';
import PropTypes from 'prop-types';

    // 만능 버튼
    const UniversalButton = ({ label, onClick, disabled, customStyle }) => {
    const handleClick = () => {
        if (!disabled && onClick) {
        onClick();
        }
    };

    return (
        <button
        className={`universal-button ${disabled ? 'disabled' : ''}`}
        onClick={handleClick}
        disabled={disabled}
        style={customStyle}
        >
        {label}
        </button>
    );
    };

    UniversalButton.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    customStyle: PropTypes.object,
    };

    export default UniversalButton; 

// 만능 버튼 사용 방법
// onClick={handleClick}
// <UniversalButton label="클릭하세요" onClick={handleClick} />
// <UniversalButton label="비활성화된 버튼" onClick={handleClick} disabled />
//  <UniversalButton label="사용자 정의 스타일" onClick={handleClick} customStyle={{ color: 'red', fontWeight: 'bold' }} />
