import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const Test = ()=>{
    const [password,setPassword] = useState("password");
    const [rePassWord, setRepassWord] = useState('password');

    const openEye = ()=>{
        if(password=="password"){
            setPassword("text")
        }else{
            setPassword("password")
        }
    }
    const openReEye = ()=>{
        if(rePassWord=="password"){
            setRepassWord("text")
        }else{
            setRepassWord("password")
        }
    }
    
    return (
        <>
            <hr />
            <div className="form-floating">
                <input type={password} className="form-control" placeholder="Password" />
                <label>請輸入密碼</label>
                {
                    password=="password" ? <FontAwesomeIcon className="checkEye" onClick={openEye} icon={faEye} /> : <FontAwesomeIcon className="checkEye" onClick={openEye} icon={faEyeSlash} />
                }
            </div>
            <div className="form-floating">
                <input type={rePassWord} className="form-control" placeholder="Password" />
                <label>請再次確認密碼</label>
                {
                    rePassWord=="password" ? <FontAwesomeIcon className="checkEye" onClick={openReEye} icon={faEye} /> : <FontAwesomeIcon className="checkEye" onClick={openReEye} icon={faEyeSlash} />
                }
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="button">Sign in</button>
        </>
    )
    
}
export default Test