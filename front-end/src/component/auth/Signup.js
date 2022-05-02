import React, {useEffect, useState} from "react";
import "./Signup.css"
import validation from "./validation";
import axios from "axios";
const Signup = () => {
    const [values,setValues]=useState({
        name:"",
        email:"",
        password:"",
        passwordCk:'',
        auth:'USER'
    })
    const [dataIsCorrect, setDataIsCorrect] = useState(false);
    const [errors,setErrors]=useState({});
    const handleChange = (event) => {
      setValues({
          ...values,
          [event.target.name]:event.target.value,
      })
    }
    const handleFormSubmit = (event) =>{
        event.preventDefault();
        setErrors(validation(values))
        setDataIsCorrect(true);
    }

    useEffect(()=>{
        if(Object.keys(errors).length===0 && dataIsCorrect){
            axios.post("http://localhost:8080/user/signup",
                values,{
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                }
            ).then(res=>{
                console.log(res)
                alert("회원가입을 축하드립니다!")
                // document.location.href="/"
            }).catch(errors=>{
                if(errors.response){
                    alert(errors.response.data)
                }
            })
        }
    })
  return(
      <div className={"signup-wrapper"}>
          <div className={"app-wrapper"}>
              <div>
                  <h2 className={"title"}>회원가입</h2>
              </div>
              <form className={"form-wrapper"}>
                  <div className={"name"}>
                      <label className={"label"}>Name</label>
                      <input
                          className={"input"}
                          type={"text"}
                          name={"name"}
                          value={values.name}
                          onChange={handleChange}
                      />
                      {errors.name && <p className={"error"}>{errors.name}</p> }
                  </div>
                  <div className={"email"}>
                      <label className={"label"}>Email</label>
                      <input
                          className={"input"}
                          type={"email"}
                          name={"email"}
                          value={values.email}
                          onChange={handleChange}
                      />
                      {errors.email && <p className={"error"}>{errors.email}</p> }
                  </div>
                  <div className={"password"}>
                      <label className={"label"}>Password</label>
                      <input
                          className={"input"}
                          type={"password"}
                          name={"password"}
                          value={values.password}
                          onChange={handleChange}
                      />
                      {errors.password && <p className={"error"}>{errors.password}</p> }
                  </div>
                  <div className={"password"}>
                      <label className={"label"}>Password Check</label>
                      <input
                          className={"input"}
                          type={"password"}
                          name={"passwordCk"}
                          value={values.passwordCk}
                          onChange={handleChange}
                      />
                      {errors.passwordCk && <p className={"error"}>{errors.passwordCk}</p> }
                  </div>
                  <div>
                      <button className={"submit"} onClick={handleFormSubmit}>Sign up</button>
                  </div>
              </form>
          </div>
      </div>
  )
}
export default Signup