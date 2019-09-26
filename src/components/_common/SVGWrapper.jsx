/**
 * SVG-component from 'react-inlinesvg' created by @matthewwithanm at https://github.com/matthewwithanm
 * transfered to and maintained by @gilbarbara at https://github.com/gilbarbara
 */
import React from 'react';
import SVG from 'react-inlinesvg';

import './style/SVGWrapper.css';

function SVGWrapper(props) {
	return (
		<picture
			id={props.id}
			className={`icon ${props.className}`}
			onClick={props.onClick}
		>
			<SVG src={`${props.src}/${props.icon}.svg`} onLoad={props.onload} />
		</picture>
	);
}

export default SVGWrapper;
