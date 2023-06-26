/* eslint-disable */
import type { FunctionComponent } from '@builder.io/qwik'
import type { GridProperties } from '../patterns/grid'
import type { HTMLStyledProps } from '../types/jsx'

type Assign<T, U> = {
  [K in keyof T]?: K extends keyof T ? (K extends keyof U ? T[K] & U[K] : T[K]) : never
} & U

export type GridProps = Assign<HTMLStyledProps<'div'>, Omit<GridProperties, "">>


export declare const Grid: FunctionComponent<GridProps>