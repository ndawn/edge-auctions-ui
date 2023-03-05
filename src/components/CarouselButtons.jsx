const styles = {
  wrapper: {
    position: 'absolute',
    width: '100%',
    zIndex: '100',
    bottom: '0',
    textAlign: 'center'
  },
  btn: {
    width: '30px',
    height: '30px',
    cursor: 'pointer',
    userSelect: 'none',
    position: 'absolute',
    bottom: '0',
    font: '16px/30px sans-serif',
    color: 'rgba(255,255,255,0.8)'
  },
  left: {
    left: '0'
  },
  right: {
    right: '0'
  }
}

const CarouselButtons = ({ index, total, loop, prevHandler, nextHandler }) => {
  const prevBtnStyle = Object.assign({}, styles.btn, styles.left);
  const nextBtnStyle = Object.assign({}, styles.btn, styles.right);

  return (
    <div style={styles.wrapper}>
      {(loop || index !== 0) && (
        <div style={prevBtnStyle} onClick={prevHandler}>◀</div>
      )}
      {(loop || index !== total - 1) && (
        <div style={nextBtnStyle} onClick={nextHandler}>▶</div>
      )}
    </div>
  );
};

export default CarouselButtons;
