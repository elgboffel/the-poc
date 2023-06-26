/* eslint-disable */
import type { FunctionComponent } from '@builder.io/qwik'
import type { LinkOverlayProperties } from '../patterns/link-overlay'
import type { HTMLStyledProps } from '../types/jsx'

type Assign<T, U> = {
  [K in keyof T]?: K extends keyof T ? (K extends keyof U ? T[K] & U[K] : T[K]) : never
} & U

export type LinkOverlayProps = Assign<HTMLStyledProps<'a'>, Omit<LinkOverlayProperties, "">>


export declare const LinkOverlay: FunctionComponent<LinkOverlayProps>