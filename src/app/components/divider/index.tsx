/**
 * Divider — qayta ishlatiladigan ajratuvchi chiziq.
 * Props: width, height (px da, string ko'rinishida) va bg (rang).
 * Misol: <Divider height="64" width="2" bg="#E3C08D" />  -> vertikal oltin chiziq.
 * styled-components props'ni qabul qilib, CSS ichida ishlatadi.
 */
import React from 'react';
import styled from 'styled-components';

export interface IDividerProps {
	width?: string;
	height?: string;
	bg?: string;
}

const DividerComponent = styled.span<IDividerProps>`
	display: flex;
	min-width: ${({ width }) => `${width}px`};
	min-height: ${({ height }) => `${height}px`};
	background: ${({ bg }) => `${bg}`};
`;

function Divider(props: IDividerProps) {
	return <DividerComponent {...props} />;
}

export default Divider;
