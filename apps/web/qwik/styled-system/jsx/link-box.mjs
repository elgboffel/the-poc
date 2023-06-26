import { h } from '@builder.io/qwik'
import { styled } from './factory.mjs';
import { getLinkBoxStyle } from '../patterns/link-box.mjs';

export const LinkBox = function LinkBox(props) {
  const styleProps = getLinkBoxStyle()
return h(styled.div, { ...styleProps, ...props })
}