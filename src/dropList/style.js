import styled from 'styled-components'; 

export const Wrap = styled.div`
    display:${(props)=>props.open ? 'block' : 'none'}

`;