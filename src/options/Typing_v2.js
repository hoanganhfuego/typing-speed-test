import { useEffect, useRef, useState } from "react"

export default function TypingV2(){

    const [letter, setLetter] = useState('')
    const context = useRef()
    const [changeContext, setChangeContext] = useState('')
    function handleTyping(event){
        setLetter(event.target.value)
    }

    useEffect(()=>{
        console.log(context.current.innerHTML)
        setChangeContext(context.current.innerHTML)
        // context.current.innerHTML = 12
    }, [])

    return (
        <>
            <p ref={context}>xin chao</p>
            <input onChange={handleTyping}></input>
        </>
    )
}