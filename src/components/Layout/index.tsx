import styled from 'styled-components';

interface IColumn {
    width?: number;
}

const Column = styled.div<IColumn>`
    display: inline-block;
    width: ${({ width = 2 }) => 100/width}%;
`

export const Row = styled.div`
    width: 100%;
`

export default Column;