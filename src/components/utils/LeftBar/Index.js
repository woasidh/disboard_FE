import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import logo_mark from '../../../images/logo/logo_mark.png'
import logo_word from '../../../images/logo/logo_word.png'
import Avater from '../../../images/avatar/avater.jpeg'
import axios from 'axios'

const Container = styled.div`
width : ${props => props.theme.margin.leftBar};
height : 100%;
background-color: ${props => props.theme.color.main};
position : absolute;
left : 0;
`

const Content = styled.div`
margin: 0;
`

const SubjectMenu = styled.ul`
display : none;
padding : 5px;
padding-bottom : 0px;
/*position: absolute;*/
/*margin-left: 150px;*/
list-style: none;
line-height: normal;
background-color: ${props => props.theme.color.main};
color : white;
font-size : 12px;
list-style-type : none;
`

const SubjectMenuCom = styled.a`
color : white;
`

const Menu = styled.button`
margin : 5px 0;
margin-left : 25px;
display : block;
color : white;
font-size :15px;
text-align : left;
`
const SubMenu = styled.a`
color : white;
margin-bottom : 5px;
margin-left: 0px;
padding-left : 50px;
display : block;
font-size : 12px;
&:hover{
    ${SubjectMenu}{
        display: block;
    }
}
/* &.active{

} */
`
const Footer = styled.div`
width : 200px;
position : fixed;
padding : 10px;
background-color : #1E2A38;
bottom : 0;
height : 40px;
display : flex;
align-items : center;
`

const FooterAvater = styled.div`
width: 30px;
height: 30px;
background-image: url(${Avater});
border-radius: 50%;
background-position: center center;
background-size: cover;
display : inline-block;
`

const FooterRight = styled.div`
color : white;
display : inline-block;
margin-left: 10px;
`


function Index() {

    const [isStudent, setisStudent] = useState(false)
    const [isProfessor, setisProfessor] = useState(false);
    const [subjectList, setSubjectList] = useState([]);
    const user = JSON.parse(window.sessionStorage.userInfo);

    useEffect(() => {
        if(user.type === "student"){
            setisStudent(true);
        }else{
            setisProfessor(true);
        }
        axios.get('/api/subject/get/mySubjects')
        .then((response)=>{
            console.log(response.data);
            setSubjectList(response.data.subjects);
        })
        .catch((error)=>{
            console.log(error);
        })
    }, [])

    const [ShowMenu1, setShowMenu1] = useState(true);
    const [ShowMenu2, setShowMenu2] = useState(true);

    const toggle1 = (e) => {
        if (ShowMenu1 === false) setShowMenu1(true);
        else setShowMenu1(false);
    }

    const toggle2 = (e) => {
        if (ShowMenu2 === false) setShowMenu2(true);
        else setShowMenu2(false);
    }

    return (
        <Container>
            <a style={{ display: 'inline-block', margin: "25px 10px" }} href="/main">
                <img style={{ maxHeight: '25px' }} src={logo_mark} alt="logo_mark" />
                <img style={{ maxHeight: '25px' }} src={logo_word} alt="logo_word" />
            </a>
            <Content>
                <Menu onClick={toggle1}>
                    ??????
                </Menu>
                {ShowMenu1 && <div>
                    {isProfessor && <SubMenu href="/main/uploadLecture">{'>'}<span>?????? ??????</span></SubMenu>}
                    {isStudent && <SubMenu href="/main/enterLecture">{'>'}?????? ??????</SubMenu>}
                    <SubMenu href="/test/aaa">{'>'}zoom test</SubMenu>
                    <SubMenu href="/main/all/all/notice">{'>'}????????????</SubMenu>
                    <SubMenu href="/">{'>'}????????????</SubMenu>
                    <SubMenu href="/">{'>'}?????? ??????</SubMenu>
                </div>}
                <Menu onClick={toggle2} style={{marginTop:"10px"}}>
                    ??? ??????
                </Menu>
                {ShowMenu2 && <div>
                    {subjectList.map((subject) => 
                    <SubMenu>{'>'}{subject.name}
                        <SubjectMenu>
                            {isStudent && <li style={{marginBottom:"5px"}}><SubjectMenuCom href={`/main/class/st/${subject.code}`}>{'>'}????????? ?????? ??????</SubjectMenuCom></li>}
                            {isProfessor && <li style={{marginBottom:"5px"}}><SubjectMenuCom href={`/main/class/pf/${subject.code}`}>{'>'}????????? ?????? ??????</SubjectMenuCom></li>}
                            <li style={{marginBottom:"5px"}}><SubjectMenuCom href={`/main/${subject._id}/info`}>{'>'}?????? ??????</SubjectMenuCom></li>
                            <li style={{marginBottom:"5px"}}><SubjectMenuCom href={`/main/${subject._id}/${subject.name}/notice`}>{'>'}?????? ??????</SubjectMenuCom></li>
                            <li style={{marginBottom:"5px"}}><SubjectMenuCom href={`/main/${subject._id}/${subject.name}/note`}>{'>'}?????? ??????</SubjectMenuCom></li>
                            <li style={{marginBottom:"5px"}}><SubjectMenuCom href={`/main/${subject._id}/chart`}>{'>'}?????? ?????? ??????</SubjectMenuCom></li>
                            <li style={{marginBottom:"5px"}}><SubjectMenuCom href={`/main/${subject._id}/attendence`}>{'>'}??????</SubjectMenuCom></li>
                            <li><SubjectMenuCom href={`/main/${subject._id}/replay`}>{'>'}?????? ?????? ??????</SubjectMenuCom></li>
                        </SubjectMenu>
                    </SubMenu>)}
                </div>
                }
            </Content>
            <Footer>
                <FooterAvater style={{backgroundImage: `url(${user.photourl})`}}/>
                <FooterRight>
                    <div>
                        <div style={{ fontSize: '15px' }}>{user.name}({user.identityID})</div>
                        <div style={{ fontSize: '10px' }}>{user.major}</div>
                    </div>
                </FooterRight>
            </Footer>
        </Container>
    )
}

export default Index
