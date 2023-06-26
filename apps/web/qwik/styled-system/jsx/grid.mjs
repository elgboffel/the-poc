import { h } from '@builder.io/qwik'
import { styled } from './factory.mjs';
import { getGridStyle } from '../patterns/grid.mjs';

export const Grid = function Grid(props) {
  const { gap, columnGap, rowGap, columns, minChildWidth, ...restProps } = props
const styleProps = getGridStyle({gap, columnGap, rowGap, columns, minChildWidth})
return h(styled.div, { ...styleProps, ...restProps })
}