// components/TipModal.js
import React from 'react';
import '../styles/TipModal.css'; // CSS 파일 임포트

const TipModal = ({tip,onClose}) => {
    if(!tip) return null;

    return(
    <div className="modal-backdrop">
        <div className="modal">
            <div className="modal-header">{tip.t_name}</div>
            <div className="modal-body">
            <img width={300} height={200} src={tip.t_photo} alt={tip.t_name}/>
            <h3>《팁 내용》</h3>
            <ol className="tip_content">
            {tip.t_content.map((x, i) => <li key={i}>{x}</li>)}
            </ol>
            </div>
            <div className="modal-footer">
            <button onClick={onClose}>닫기</button>
            </div>
        </div>
    </div>
    );
}

export default TipModal;