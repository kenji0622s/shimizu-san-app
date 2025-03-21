import React from 'react';

const LoadingSpinner: React.FC = () => {
  const spinnerStyle: React.CSSProperties = {
    border: '8px solid #f3f3f3', // 明るい色のボーダー
    borderTop: '8px solid #3498db', // 回転する部分の色
    borderRadius: '50%', // 円形にする
    width: '50px', // スピナーの幅
    height: '50px', // スピナーの高さ
    animation: 'spin 1s linear infinite', // アニメーションの設定
  };

  const keyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <div>
      <style>{keyframes}</style> {/* キーフレームをスタイルとして追加 */}
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default LoadingSpinner;