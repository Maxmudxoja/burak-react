/**
 * hooks.ts — TypeScript'li Redux hook'lari.
 * Oddiy useDispatch/useSelector o'rniga shularni ishlatsangiz, state turini
 * TypeScript avtomatik biladi (autocomplete + xato tekshiruv).
 * Hozircha loyihada to'g'ridan-to'g'ri useDispatch/useSelector ishlatilgan.
 */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
