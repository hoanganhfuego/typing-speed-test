import ContextWords from "../components/ContextWords";
import PopUpContent from "../components/PopUpContent";
import { useState, useEffect, useRef } from "react";

export default function TypingV1(){
    const paragraphCollection = ["ê tình yêu là gì đây là một câu hỏi vừa khó vừa dễ bởi hầu hết ai trong chúng ta khi trưởng thành cũng đều ít nhất một lần yêu nhưng lại chẳng ai có thể định nghĩa được rõ ràng như thế nào là yêu thế nào là tình yêu chân chính có người nói rằng tình yêu là khi có người ở bên cạnh yêu thương quan tâm và chia sẻ mọi thứ một số người lại cho rằng tình yêu là sự đồng cảm rung động giữa hai người có sự hấp dẫn đích thực về giới tính có lẽ chỉ khi yêu mỗi người mới cảm nhận được một cách đúng nghĩa và đầy đủ về tình yêu tiền tệ là một phạm trù lịch sử nó là sản phẩm tự phát của nền kinh tế hàng hóa sản phẩm của sự phát triển các hình thái giá trị đồng thời cũng là sản phẩm của sự phát triển mâu thuẫn giữa lao động và phân công lao động xã hội trong sản xuất hàng hóa sự ra đời và phát triển của tiền tệ gắn liền với sự ra đời và phát triển của sản xuất và trao đổi hàng hóa theo mac tiền tệ là một thứ hàng hoá đặc biệt được tách ra khỏi thế giới hàng hoá dùng để đo lường và biểu hiện giá trị của tất cả các loại hàng hoá khác nó trực tiếp thể hiện lao động xã hội và biểu hiện quan hệ sản xuất giữa những người sản xuất hàng hóa biến đổi khí hậu là thuật ngữ được dùng để chỉ sự thay đổi của khí hậu do tác động chủ yếu của con người làm thay đổi các thành phần của khí quyển trái đất sự thay đổi này kết hợp với các yếu tố biến động tự nhiên của tự nhiên dẫn tới các biến đổi của khí hậu qua các thời kỳ nói một cách dễ hiểu biến đổi khí hậu chính là sự thay đổi của hệ thống khí hậu từ sinh quyển khí quyển thủy quyền tới thạch quyển trong hiện tại và tương lai"]
    const [paragraph, setParagraph] = useState(paragraphCollection[0])
    const [words, setWords] = useState(wordsValue()) 
    const [fullInput, setFullinput] = useState('')
    const [inputLetter, setInputLetter] = useState('')
    const [test, setTest] = useState(false)
    const [clock, setClock] = useState(60)
    const [letter, setLetter] = useState({
      idWords: 0,
      value: words[0].value.split('')[0],
      id : 0
    })
  
    const spanBottom = useRef()
    const [span, setSpan] = useState('')
    const spanPrevious = useRef(span)
    const [reLocate, setRelocate] = useState(60)
    const [windowWidth, setWindowWidth] = useState('')
    
    useEffect(()=>{
      setWindowWidth(window.innerWidth)
      window.addEventListener('resize', ()=>{
        setWindowWidth(window.innerWidth)
      })
    }, [windowWidth])
  
    useEffect(() => {
        setSpan(spanBottom.current.getBoundingClientRect().bottom)
    }, [words[letter.idWords].value])
  
    useEffect(() => {
        if(spanPrevious.current && spanPrevious.current < span){
            document.querySelector('#para').style.top = `${-reLocate}px`
            setRelocate(prev => prev + 60)
        }
        spanPrevious.current = span
    }, [span])
  
  
    useEffect(()=>{
      if(fullInput && fullInput.slice(0, -1) !== words[letter.idWords-1].value){
        setWords(prev => prev.map((e, index) =>{
          return (index === letter.idWords -1 ? {...e, isCorrect: true} : e)
        }))
      }
    }, [words[letter.idWords].value])
  
    useEffect(()=>{
          if(clock >= 1 && inputLetter){setTimeout(()=>setClock(prev => prev-1), 1000)}
          if(clock === 0){
            localStorage.setItem('wpm',  JSON.stringify({
              'totalWords': letter.idWords+1,
              'wrongWords': words.filter(e => {
                return e.isCorrect
              }).length
            }))
            setTest(true)
          }
    },[clock])
  
    useEffect(()=>{
      if(inputLetter.value === ' '){
        getNextLetter()
        document.querySelector('input').value = ''
      }
      else if(inputLetter.value === letter.value || inputLetter.fullValue === words[letter.idWords].value){
        setLetter(prev => ({
          ...prev,
          value: words[prev.idWords].value.split('')[prev.id+1],
          id: prev.id+1
        }))
        setWords(prev => prev.map((e, index) =>{
          return ( index === letter.idWords ? {...e, isCorrect: false} : e)
        }))
      }
      else if (inputLetter.value && inputLetter.fullValue !== words[letter.idWords].value) {
        setWords(prev => prev.map((e, index) => {
          return (index === letter.idWords ? {...e, isCorrect: true} : e)
        }))
      }
    }, [inputLetter])
  
    function reStart(){
      setWords(wordsValue())
      setLetter(
        {
          idWords: 0,
          value: words[0].value.split('')[0],
          id : 0
        }
      )
      setInputLetter('')
      setFullinput('')
      setTimeout(() => {
        setClock(60)
      }, 800);
      document.querySelector('input').value = ''
      document.querySelector('#para').style.top = `0px`
      setSpan('')
      setRelocate(60)
    }
  
    function turnOffPopUp(){
      setTest(false)
    }
  
  
    function wordsValue(){
      let newWords = paragraph.split(' ').map(e=>({
          value: e,
          isCorrect: false
        }))
      let randomOrder = newWords.sort(func)
      return randomOrder
    }
  
    function func(a, b) {  
      return 0.5 - Math.random();
    }  
    const colors = [
      "linear-gradient(to right, #571845 0%,#571845 20%,#900c3e 20%,#900c3e 40%,#c70039 40%,#c70039 60%,#ff5733 60%,#ff5733 80%,#ffc300 80%,#ffc300 100%)",
      "linear-gradient(to right, #00ffff 0%,#00ffff 20%,#33d6ff 20%,#33d6ff 40%,#66adff 40%,#66adff 60%,#cc5cff 60%,#cc5cff 80%,#ff33ff 80%,#ff33ff 100%)",
      "linear-gradient(to right, #0077b6 0%,#0077b6 20%,#0096c7 20%,#0096c7 40%,#00b4d8 40%,#00b4d8 60%,#48cae4 60%,#48cae4 80%,#90e0ef 80%,#90e0ef 100%)",
      "linear-gradient(to right, #cdb4db 0%,#cdb4db 20%,#ffc8dd 20%,#ffc8dd 40%,#ffafcc 40%,#ffafcc 60%,#bde0fe 60%,#bde0fe 80%,#a2d2ff 80%,#a2d2ff 100%)",
      "linear-gradient(to right, #f72585 0%,#f72585 20%,#b5179e 20%,#b5179e 40%,#7209b7 40%,#7209b7 60%,#560bad 60%,#560bad 80%,#480ca8 80%,#480ca8 100%)",
      "linear-gradient(to right, #ffe5ec 0%,#ffe5ec 20%,#ffc2d1 20%,#ffc2d1 40%,#ffb3c6 40%,#ffb3c6 60%,#ff8fab 60%,#ff8fab 80%,#fb6f92 80%,#fb6f92 100%)",
      "linear-gradient(to right, #5a189a 0%,#5a189a 20%,#7b2cbf 20%,#7b2cbf 40%,#9d4edd 40%,#9d4edd 60%,#c77dff 60%,#c77dff 80%,#e0aaff 80%,#e0aaff 100%)",
      "linear-gradient(to right, #ff7b00 0%,#ff7b00 20%,#ff8800 20%,#ff8800 40%,#ff9500 40%,#ff9500 60%,#ffa200 60%,#ffa200 80%,#ffaa00 80%,#ffaa00 100%)",
      "linear-gradient(to right, #7bdff2 0%,#7bdff2 20%,#b2f7ef 20%,#b2f7ef 40%,#eff7f6 40%,#eff7f6 60%,#f7d6e0 60%,#f7d6e0 80%,#f2b5d4 80%,#f2b5d4 100%)",
    ]
    const [color, setColor] = useState(3)
  
    function randomParagraph(){
      if(color<colors.length-1){
        setColor(prev => prev+1)
      }
      else setColor(0)
    }
  
  
    function inputTypingSection(event){
      if(clock === 60){
        setTimeout(()=>setClock(59), 1000)
      }
      let typingLetter = event.target.value
      let i = typingLetter.length - 1
      setFullinput(typingLetter)
      setInputLetter({
        fullValue: typingLetter,
        value: typingLetter[i],
        isCorrect: false
      })
    }
  
  
    function getNextLetter(){
      setLetter(prev => ({
        idWords: prev.idWords + 1,
        value: words[prev.idWords + 1].value.split('')[0],
        id: 0
      }))
    }
  
    return (
      <div className="main" style={{backgroundImage: colors[color]}}>
        <PopUpContent 
          words = {words} 
          letter = {letter}
          test = {test}
          turnOffPopUp = {turnOffPopUp}
        />
        <div className="off-pop-up" onClick={turnOffPopUp} style={{display: test? "flex" : "none"}}></div>
        <ContextWords
          windowWidth = {windowWidth}
          words = {words} 
          letter = {letter}
          spanBottom = {spanBottom}
  
        />
        <div className="control">
          <div className="control-child">
            <div>
              <input type="text" onChange={inputTypingSection} placeholder="type here"></input>
              <div className="clock">{clock}</div>
            </div>
            <div className="button">
              <button onClick={randomParagraph}><i className="fa-solid fa-angles-right"></i></button><br/>
              <button onClick={reStart}><i className="fa-solid fa-rotate"></i></button><br/>
            </div>
          </div>
        </div>
      </div>
    );
  }
