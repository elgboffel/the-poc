import { h } from '@builder.io/qwik'
import { styled } from './factory.mjs';
import { getStackStyle } from '../patterns/stack.mjs';

export const Stack = function Stack(props) {
  const { align, justify, direction, gap, ...restProps } = props
const styleProps = getStackStyle({align, justify, direction, gap})
return h(styled.div, { ...styleProps, ...restProps })
}