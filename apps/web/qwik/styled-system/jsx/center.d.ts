/* eslint-disable */
import type { FunctionComponent } from '@builder.io/qwik'
import type { CenterProperties } from '../patterns/center'
import type { HTMLStyledProps } from '../types/jsx'

type Assign<T, U> = {
  [K in keyof T]?: K extends keyof T ? (K extends keyof U ? T[K] & U[K] : T[K]) : never
} & U

export type CenterProps = Assign<HTMLStyledProps<'div'>, Omit<CenterProperties, "">>


export declare const Center: FunctionComponent<CenterProps>