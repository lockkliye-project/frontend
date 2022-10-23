import React from 'react';

import './styles/Context.css';

function Context(props) {
	return (
		<div
			className={`context ${props.type}`}
			onClick={() => {
				props.popModifier({
					index: props.index,
					type: props.type,
					option: props.option,
					flag: props.flag,
				});
			}}
		>
			{props.option}
		</div>
	);
}

export default Context;
