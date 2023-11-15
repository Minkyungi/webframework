import React from 'react';
import '../styles/RecipeModal.css'; // CSS 파일 임포트

const TipModal = (tip,onClose) => {
    if(!tip) return null;

    return(
    <div className="modal-backdrop">
        <div className="modal-header">{tip.t_name}</div>
            <h3>팁 내용</h3>
            <ul className="tip_content">
            {tip.t_content.map((x, i) => <div key={i}>{x}</div>)}
            </ul>
        <div className="modal-footer">
            <button onClick={onClose}>닫기</button>
        </div>
    </div>
    );
}

export default TipModal;