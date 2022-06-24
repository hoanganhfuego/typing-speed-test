import {nanoid} from "nanoid";

export default function ContextWords(props){
    console.log(props.windowWidth, 'current')
    const singleWord = props.words.map((e, index) => {
        return <span key={nanoid()} style={{ color: e.isCorrect? "red": props.windowWidth <= 1600? 'black' : 'transparent',
    boxShadow: props.letter.idWords === index? "rgba(0, 0, 0, 0.35) 0px 5px 15px" : "none"} } ref={props.letter.idWords === index ? props.spanBottom: null}>{e.value}</span> 
    })

    return (
        <div className="essay">
            <div className="essay-overlay">
                <div id="para">
                    {singleWord}
                </div>
            </div>
        </div>
    )
  }