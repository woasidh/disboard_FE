import React, {useState, useCallback} from "react";
import styled from 'styled-components';
import { Form , Input} from 'antd';
import axios from "axios";
import { useHistory } from "react-router-dom";

const SubmitBtn = styled.button`
width : 100%;
height : 40px;
border : none;
background-color: #407AD6;
color : white;
text-align :center;
line-height : 40px;
border-radius : 5px;
margin-left : auto;
margin-right : auto;
`
const Box = styled.div`
background-color: #f7f9fc;
border-radius: 5px;
padding: 10px;
margin-bottom: 5px;
`

const InfoBox = styled.div`
margin-left : auto;
margin-right : auto;
border : none;
background-color: #f7f9fc;
padding : 5px;
`

function SignUp(){
	const [emptyError,setEmptyError] = useState(false);
	const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
	const history = useHistory();
	
	const [name, setName] = useState(userInfo.name);
	const [email, setEmail] = useState(userInfo.email);
	const [photourl,setPhote] = useState(userInfo.imgUrl);
	const [professorID, setProfessorID] = useState('');
	const [school, setSchool] = useState('');
	const [major,setMajor] = useState("major_it1");
	
	const onChangeName = e => {
    setName(e.target.value);
  	};

	const onChangeProfessorID = e => {
		setProfessorID(e.target.value);
	};

	const onChangeSchool = e => {
		setSchool(e.target.value);
	};

	const onChangeMajor = e => {
		setMajor(e.target.value);
	};

	const submitHandler = useCallback((e) => {
		e.preventDefault();
		let user = {
			email: email,
			name: name,
			photourl: photourl,
			identityID: professorID,
			school: school,
			major: major,
			grade : '',
			type: 'professor'
		};
		console.log(user);

        if(!user.name||!user.school||!user.identityID||!user.major){
            return setEmptyError(true);
		}
		axios.post('/api/auth/signup',
            {
				email: email,
				name: name,
				photourl: photourl,
				identityID: professorID,
				school: school,
				major: major,
				grade : 0,
				type: 'professor'
			}, {
              headers:{'Content-type': 'application/json', 'Accept': 'application/json' } } )
            .then((response) => {
              const result = response.data;
              if(result.userExist){
				sessionStorage.removeItem("userInfo");
				alert("?????? ???????????? ???????????????.");
				return history.push("/");
			  }
              if(result.success){
				sessionStorage.removeItem("userInfo");
				alert("??????????????? ?????????????????????.");
				return history.push("/");
              }else{
				//return history.push("/signup");
				return window.location.href = '/signup';
              }
        })
	},[email, name, school, major, professorID]);

	return(
		<Form onSubmit={onsubmit}>
				<Box>
					<InfoBox>
						<label>??????</label>
						<Input name="name" type="text" value={name} required onChange={onChangeName}></Input>
					</InfoBox>
					<InfoBox>
						<label>?????????</label>
						<Input name="email" type="text" value={email} required ></Input>
					</InfoBox>
					<InfoBox>
						<label>??????</label>
						<Input name="professorID" placeholder = "??????" value={professorID} required onChange={onChangeProfessorID}></Input>
					</InfoBox>
					<InfoBox>
						<label>??????</label>
						<Input name="school" placeholder = "..?????????" value={school} required onChange={onChangeSchool}></Input>
					</InfoBox>
					<InfoBox>
						<label>??????</label><br/>
						<select style={{ width: 200 }} name="major" value={major} required onChange={onChangeMajor}>
							<optgroup label="??????????????????">
								<option value="major_it1">???????????????</option>
								<option value="major_it2">??????????????????</option>
								<option value="major_it3">???????????????</option>
							</optgroup>
							<optgroup label="????????????">
								<option value="major_eng1">???????????????</option>
								<option value="major_eng2">???????????????</option>
								<option value="major_eng3">???????????????</option>
							</optgroup>
						</select>
					</InfoBox>
					{emptyError && <div style={{color : 'red'}}>?????? ????????? ????????? ?????????.</div>}
				</Box>
				<div>
					<SubmitBtn onClick={submitHandler}>DISBOARD ????????????</SubmitBtn>
				</div>
		</Form>
		
	);
}

export default SignUp;