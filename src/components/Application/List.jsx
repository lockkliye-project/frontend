import React from 'react';

import './styles/List.css';

function List(props) {
	const data = props.data;

	return (
		<ul id={props.id} className='list'>
			{Object.keys(data).map((entry) => {
				return (
					<li
						className='nav'
						onClick={() => {
							const entryData = data[entry];
							typeof entryData === 'string' || entryData instanceof String
								? props.popCurrentCard(entryData)
								: props.createSubList(entryData);
						}}
					>
						{entry.name}
					</li>
				);
			})}
		</ul>
	);
}

export default List;
