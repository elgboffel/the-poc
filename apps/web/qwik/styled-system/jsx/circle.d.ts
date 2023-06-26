/* eslint-disable */
import type { FunctionComponent } from '@builder.io/qwik'
import type { CircleProperties } from '../patterns/circle'
import type { HTMLStyledProps } from '../types/jsx'

type Assign<T, U> = {
  [K in keyof T]?: K extends keyof T ? (K extends keyof U ? T[K] & U[K] : T[K]) : never
} & U

export type CircleProps = Assign<HTMLStyledProps<'div'>, Omit<CircleProperties, "">>


export declare const Circle: FunctionComponent<CircleProps>