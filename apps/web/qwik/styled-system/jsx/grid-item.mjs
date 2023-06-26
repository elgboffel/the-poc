import { h } from '@builder.io/qwik'
import { styled } from './factory.mjs';
import { getGridItemStyle } from '../patterns/grid-item.mjs';

export const GridItem = function GridItem(props) {
  const { colSpan, rowSpan, colStart, rowStart, colEnd, rowEnd, ...restProps } = props
const styleProps = getGridItemStyle({colSpan, rowSpan, colStart, rowStart, colEnd, rowEnd})
return h(styled.div, { ...styleProps, ...restProps })
}