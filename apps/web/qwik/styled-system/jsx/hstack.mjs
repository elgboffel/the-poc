import { h } from '@builder.io/qwik'
import { styled } from './factory.mjs';
import { getHstackStyle } from '../patterns/hstack.mjs';

export const HStack = function HStack(props) {
  const { justify, gap, ...restProps } = props
const styleProps = getHstackStyle({justify, gap})
return h(styled.div, { ...styleProps, ...restProps })
}