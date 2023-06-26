import { h } from '@builder.io/qwik'
import { styled } from './factory.mjs';
import { getLinkOverlayStyle } from '../patterns/link-overlay.mjs';

export const LinkOverlay = function LinkOverlay(props) {
  const styleProps = getLinkOverlayStyle()
return h(styled.a, { ...styleProps, ...props })
}