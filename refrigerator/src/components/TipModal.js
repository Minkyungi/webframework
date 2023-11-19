// components/TipModal.js
import React from 'react';
import '../styles/TipModal.css'; // CSS 파일 임포트

const TipModal = ({tip,onClose}) => {
    if(!tip) return null;

    return(
    <div className="tip_modal-backdrop">
        <div className="tip_modal">
            <div className="tip_modal-header">{tip.t_name}</div>
            <div className="tip_modal-body">
            <img width={300} height={200} src={tip.t_photo} alt={tip.t_name}/>
            <h3>《팁 내용》</h3>
            <ol className="tip_tip_content">
            {tip.t_content.map((x, i) => <li key={i}>{x}</li>)}
            </ol>
            </div>
            <div className="tip_modal-footer">
            <button onClick={onClose}>닫기</button>
            </div>
        </div>
    </div>
    );
}

export default TipModal;