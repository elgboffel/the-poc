/* eslint-disable */
import type { FunctionComponent } from '@builder.io/qwik'
import type { HstackProperties } from '../patterns/hstack'
import type { HTMLStyledProps } from '../types/jsx'

type Assign<T, U> = {
  [K in keyof T]?: K extends keyof T ? (K extends keyof U ? T[K] & U[K] : T[K]) : never
} & U

export type HstackProps = Assign<HTMLStyledProps<'div'>, Omit<HstackProperties, "">>


export declare const HStack: FunctionComponent<HstackProps>