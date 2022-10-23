/**
 * Copyright (c) https://github.com/arsonite
 * Burak Günaydin (2019/2020)
 *
 * SVG-component from 'react-inlinesvg' created by @matthewwithanm at https://github.com/matthewwithanm
 * transfered to and maintained by @gilbarbara at https://github.com/gilbarbara
 */
import React from 'react';
import SVG from 'react-inlinesvg';

import './styles/SVGWrapper.css';

function SVGWrapper(props) {
	const src = props.src;

	return (
		<picture id={props.id} className={`icon ${props.className}`} onClick={props.onClick}>
			<SVG src={`${src}/${props.icon}.svg`} onLoad={props.onload} />
		</picture>
	);
}

export default SVGWrapper;
