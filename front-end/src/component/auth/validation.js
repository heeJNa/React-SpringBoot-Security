const validation = (values) => {
    let errors={};
    if(!values.name){
       errors.name="이름을 입력하시오!"
    }
    if(!values.email){
        errors.email="이메일을 입력하시오!"
    }else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email="이메일 형식으로 작성하시오!"
    }
    if (!values.password){
        errors.password="비밀번호를 입력하시오!"
    }else if (values.password.length<5 || values.password.length>20){
        errors.password="비밀번호는 5~20자리 사이로 입력하시오!"
    }
    if(!(values.password === values.passwordCk)){
        errors.passwordCk="비밀번호가 다릅니다!"
    }

    return errors;
}
export default validation