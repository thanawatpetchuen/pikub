import styled from "styled-components";

interface IText {
    fontSize?: string
}

const Text = styled.span<IText>`
    color: ${({ color= 'white' }) =>  color};
    font-size: ${({ fontSize = '5rem' }) => fontSize};
`

export default Text;