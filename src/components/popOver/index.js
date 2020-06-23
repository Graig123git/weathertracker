import React, { Component, useState } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

// PopOver Component that is used to display weather details
const PopoverMessage = (props) => {
	const [popoverOpen, setPopoverOpen] = useState(false);
	const toggle = () => setPopoverOpen(!popoverOpen);
	return (
		<div>
			{props.city ? (
				<div>
					<img className='img' id='Popover1' type='button' src={props.icon} />
					<Popover placement='bottom' isOpen={popoverOpen} target='Popover1' toggle={toggle}>
						<PopoverHeader>{props.city}</PopoverHeader>
						<PopoverBody>
							<span className='weatherText'>Temp {props.temperature}, </span>
							<span className='weatherText'>{props.description}, </span>
							<span className='weatherText'>Feels like {props.feel}, </span>
							<span className='weatherText'>Wind Speed {props.windspeed}</span>
						</PopoverBody>
					</Popover>
				</div>
			) : null}
		</div>
	);
};

//Export Component
export default PopoverMessage;
