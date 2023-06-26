import { h } from '@builder.io/qwik'
import { styled } from './factory.mjs';
import { getSquareStyle } from '../patterns/square.mjs';

export const Square = function Square(props) {
  const { size, ...restProps } = props
const styleProps = getSquareStyle({size})
return h(styled.div, { ...styleProps, ...restProps })
}