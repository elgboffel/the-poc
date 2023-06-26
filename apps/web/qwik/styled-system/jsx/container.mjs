import { h } from '@builder.io/qwik'
import { styled } from './factory.mjs';
import { getContainerStyle } from '../patterns/container.mjs';

export const Container = function Container(props) {
  const styleProps = getContainerStyle()
return h(styled.div, { ...styleProps, ...props })
}