import {nanoid} from "nanoid";

export default function ContextWords(props){
    const singleWord = props.words.map((e, index) => {
        return <span key={nanoid()} style={{ color: e.isCorrect? "red":"transparent",
    boxShadow: props.letter.idWords === index? "rgba(0, 0, 0, 0.35) 0px 5px 15px" : "none"}}>{e.value}</span> 
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