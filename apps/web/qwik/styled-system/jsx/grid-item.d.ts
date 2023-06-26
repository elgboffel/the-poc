/* eslint-disable */
import type { FunctionComponent } from '@builder.io/qwik'
import type { GridItemProperties } from '../patterns/grid-item'
import type { HTMLStyledProps } from '../types/jsx'

type Assign<T, U> = {
  [K in keyof T]?: K extends keyof T ? (K extends keyof U ? T[K] & U[K] : T[K]) : never
} & U

export type GridItemProps = Assign<HTMLStyledProps<'div'>, Omit<GridItemProperties, "">>


export declare const GridItem: FunctionComponent<GridItemProps>