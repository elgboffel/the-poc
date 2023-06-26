import { h } from '@builder.io/qwik'
import { styled } from './factory.mjs';
import { getBoxStyle } from '../patterns/box.mjs';

export const Box = function Box(props) {
  const styleProps = getBoxStyle()
return h(styled.div, { ...styleProps, ...props })
}