import React from 'react';

function Buttons({ start, wait, action }) {

	if (!start && !wait) {
		return (
			<button className='stopwatch__btn-start' onClick={() => action('start')}>Start</button>
		)
	} else if (start && wait) {
		return (
			<>
				<button className='stopwatch__btn-start' onClick={() => action('start')}>Start</button>
				<button className='stopwatch__btn-reset' onClick={() => action('reset')}>Reset</button>
			</>
		)
	} else {
		return (
			<>
				<button className='stopwatch__btn-stop' onClick={() => action('stop')}>Stop</button>
				<button className='stopwatch__btn-wait' onClick={() => action('wait')}>Wait</button>
				<button className='stopwatch__btn-reset' onClick={() => action('reset')}>Reset</button>
			</>
		)
	}
}

export default Buttons;