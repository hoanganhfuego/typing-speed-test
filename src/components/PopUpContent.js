import { useEffect, useState } from "react"

export default function PopUpContent(props){
  const [wpm, setWpm] = useState(JSON.parse(localStorage.getItem("wpm")) || [])
  useEffect(() => {
    setWpm(JSON.parse(localStorage.getItem("wpm")))
  },[props.test])
  return (
    <div className="pop-up" style={{display: props.test? "flex" : "none"}}>
      {wpm && <div className="pop-up-content">
        <div>{wpm.totalWords - wpm.wrongWords} wpm</div>
          <div><p>total words:</p><span>{wpm.totalWords}</span></div>
          <div><p>wrong words:</p><span>{wpm.wrongWords}</span></div>
          <div><p>wps:</p><span>{wpm.totalWords - wpm.wrongWords}</span></div>
        </div>}
    </div>
  )
}