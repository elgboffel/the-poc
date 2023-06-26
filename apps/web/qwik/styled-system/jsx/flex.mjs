import { h } from '@builder.io/qwik'
import { styled } from './factory.mjs';
import { getFlexStyle } from '../patterns/flex.mjs';

export const Flex = function Flex(props) {
  const { align, justify, direction, wrap, basis, grow, shrink, ...restProps } = props
const styleProps = getFlexStyle({align, justify, direction, wrap, basis, grow, shrink})
return h(styled.div, { ...styleProps, ...restProps })
}