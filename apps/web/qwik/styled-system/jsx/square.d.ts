/* eslint-disable */
import type { FunctionComponent } from '@builder.io/qwik'
import type { SquareProperties } from '../patterns/square'
import type { HTMLStyledProps } from '../types/jsx'

type Assign<T, U> = {
  [K in keyof T]?: K extends keyof T ? (K extends keyof U ? T[K] & U[K] : T[K]) : never
} & U

export type SquareProps = Assign<HTMLStyledProps<'div'>, Omit<SquareProperties, "">>


export declare const Square: FunctionComponent<SquareProps>