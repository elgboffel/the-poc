import { h } from '@builder.io/qwik'
import { styled } from './factory.mjs';
import { getVstackStyle } from '../patterns/vstack.mjs';

export const VStack = function VStack(props) {
  const { justify, gap, ...restProps } = props
const styleProps = getVstackStyle({justify, gap})
return h(styled.div, { ...styleProps, ...restProps })
}