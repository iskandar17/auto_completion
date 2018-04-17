import styled from 'styled-components';

const formFields = `
height:45px;
padding:5px 15px;
float:left;
`;
const colors = {
    btnText: '#fff',
    fieldsBg: '#1965e2'
};
export const SearchWrap = styled.form `
    &:after{
        display:table;
        width:100%;
        height:0;
        clear:both;
        content:'';
    }
    *{
        box-sizing: border-box;  
    }
`;
export const Input = styled.input `
  width:70%;
  outline:none;
  background:${colors.btnText};
  border:1px solid ${colors.fieldsBg};
  ${formFields}
`;
export const Button = styled.button `
  width:30%;
  border:none;
  background:${colors.fieldsBg};
  color:${colors.btnText};
  ${formFields}
`;