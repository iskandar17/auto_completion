import styled from 'styled-components'; 


const popUp = `
    position: absolute;
    top: 100%;
    left: 15px;
    right:15px;
    margin-top: -15px;
`;
export const Wrap = styled.ul`
    display:${(props)=>props.open ? 'block' : 'none'};
    background:#fff;
    padding:0;
    margin:0;
    list-style:none;
    ${(props)=>props.popUp ? popUp : ''}
`;
export const Items = styled.li`
    border-bottom:1px solid #ededed;
    padding:8px 15px;
    ${(props)=>props.popUp ? `
    &:hover{
        background:#ddd;
    }` : ''}
    &.selected {
        border-color:red;
    }
`;
export const Link = styled.a`
    text-decoration:none;
    color:#000;
    &:hover{
        text-decoration:none;
        color:#000;
    }
`;