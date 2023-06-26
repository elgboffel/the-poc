/* eslint-disable */
import type { FunctionComponent } from '@builder.io/qwik'
import type { DividerProperties } from '../patterns/divider'
import type { HTMLStyledProps } from '../types/jsx'

type Assign<T, U> = {
  [K in keyof T]?: K extends keyof T ? (K extends keyof U ? T[K] & U[K] : T[K]) : never
} & U

export type DividerProps = Assign<HTMLStyledProps<'div'>, Omit<DividerProperties, "">>


export declare const Divider: FunctionComponent<DividerProps>