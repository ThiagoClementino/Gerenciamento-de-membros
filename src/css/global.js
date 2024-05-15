import styled from 'styled-components';
// const colors ={
//     colorOneGray: "#404040",
//     colorTwoGray: #595959;
//     colorTreeGray: #737373;
//     colorFourGray: #8C8C8C;
//     colorFiveGray:#BFBFBF;
//     colorSixGray:#e4e4e4;

// }

export const InHeader = styled.header`
width: 35%;
    background: #404040;
    height: 100vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

`
export const Logo = styled.div`
  width: 100%;
    text-align: center;
    color: #BFBFBF;
    font-size: 1.1rem;
`

export const NavHeader = styled.nav`
 width: 100%;
    height: 25vh;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

`
export const Li = styled.li`
text-decoration: none;
list-style-type: none;
padding-block: 10px;
cursor: pointer;
transition: 0.2s ease-in-out;
&:hover {
    background: #8C8C8C;
    transition: 0.2s ease-in-out;
}

`
export const Settings = styled.div`

width: 100%;
    height: 5vh;
    text-align: center;
`
export const OptionMenu = styled.div`
 text-align: left;
    padding-left: 30px;
    color: #e4e4e4;

`
// Css Header //




export const Layoutform = styled.div`
  display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
`
export const InForm = styled.form`
width: 100%;
padding-inline: 2%;

`
export const FormCotainer = styled.div`
width: 100%;
height: 100vh;

`
export const Abas = styled.div`
width: 100%;
display: flex;
flex-direction: column;
overflow-y: hidden;
height: 100vh;
justify-content: center;
align-items: center;

`
export const AbasA = styled.a`
 width: 16.6%;
    height: 5vh;
    border: 1px solid #fff;
    color: #fff;
    background: #3d3d3d;
    padding-block: 5px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
`
export const SectionAbas = styled.div `
 display: flex;
    flex-wrap: wrap;
    justify-content:space-between;
    align-items: center;
    height: 90vh;
    gap: 15px;
    padding-block: 5px;
    /* margin-bottom: 20px; */
    width: 100%;
`

export const CampForm = styled.label`
width: 32%;
    background-color: var(--colorSixGray);
    padding: 10px;
  
    border-radius: 5px;
    height: 10vh;
    font-weight: 500;
    color: #404040;

`

export const CampFormP = styled.p`
 color: var(--colorOneGray);
    font-weight: 600;
    margin-bottom: 5px;

`
export const Inputtext = styled.input.attars({type: 'text'})`
width: 100%;
    height: 4vh;
    border: none;
    color: #404040;
` 
export const Inputpassword = styled.input.attars({type: 'password'})`
width: 100%;
    height: 4vh;
    border: none;
    color: #404040;
` 
export const Inputemail = styled.input.attars({type: 'email'})`
width: 100%;
    height: 4vh;
    border: none;
    color: #404040;
` 
export const Inputtel = styled.input.attars({type: 'tel'})`
width: 100%;
    height: 4vh;
    border: none;
    color: #404040;
` 
export const Inputnumber = styled.input.attars({type: 'number'})`
width: 100%;
    height: 4vh;
    border: none;
    color: #404040;
` 
export const Inputdate = styled.input.attars({type: 'date'})`
width: 100%;
    height: 4vh;
    border: none;
    color: #404040;
` 
export const Inputselect = styled.input.attars({type: 'select'})`
width: 100%;
    height: 4vh;
    border: none;
    color: #404040;
` 
