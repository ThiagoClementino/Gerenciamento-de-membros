import styled from 'styled-components';




const ComponentUser = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`
const logoAndBtn = styled.div`
display: flex;
    width: 100%;
    height: 10vh;
    justify-content: space-between;
    align-items: center;
    transition: 0.3s ease-in-out;
`
const Nav = styled.nav`
width: ${({exibir})=>(exibir? '200px': '80px')}
height: 100vh;
  background: var(--color950);
  padding: 20px;
  transition: width 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

`
const navOptions = styled.ul` 
    height: 25vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
  `
  const NavItem = styled.a`
    display: flex;
    color: var(--colorSevenWhite);
    padding-block: 5px;
    transition: 0.3s ease-in-out;
    border-radius: 5px;
  `
const settings = styled.div`
    display: flex;
    color: var(--colorSevenWhite);
    padding-block: 5px;
    transition: 0.3s ease-in-out;
    border-radius: 5px;
`


const IconSettings = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Text = styled.div`
  display: ${({ exibir }) => (exibir ? 'block' : 'none')}; 
  margin-left: 10px;
`;

module.exports = {ComponentUser, logoAndBtn, Nav, navOptions, NavItem,settings, IconSettings, Text }



