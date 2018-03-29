import styled from 'styled-components'; 

export const Wrap = styled.ul`
    display:${(props)=>props.open ? 'block' : 'none'}
    background:#fff;
    padding:0;
    margin:0;
    list-style:none;
`;
export const Items = styled.li`
    border-bottom:1px solid #ededed;
    padding:8px 15px;
`;
export const Link = styled.a`
    text-decoration:none;
    color:#000;
    &:hover{
        text-decoration:none;
        color:#000;
    }
`;