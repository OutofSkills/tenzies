
export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    const dotPositions = {
        1: ['dot__middle dot__center'],
        2: ['dot__top dot__left', 'dot__bottom dot__right'],
        3: ['dot__top dot__left', 'dot__middle dot__center', 'dot__bottom dot__right'],
        4: ['dot__top dot__left', 'dot__top dot__right', 'dot__bottom dot__left', 'dot__bottom dot__right'],
        5: ['dot__top dot__left', 'dot__top dot__right', 'dot__middle dot__center', 'dot__bottom dot__left', 'dot__bottom dot__right'],
        6: ['dot__top dot__left', 'dot__top dot__right', 'dot__middle dot__right', 'dot__bottom dot__left', 'dot__bottom dot__right',  'dot__middle dot__left']
    }

    const dots = dotPositions[props.value];
    console.log(dots)
    const dieDotsElements = dots.map(dot => {
        return <div className={`dot ${dot}`}></div>
    })

    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            {dieDotsElements}
        </div>
    )
}