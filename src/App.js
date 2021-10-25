import React, { useEffect, useState, useRef } from 'react';
import OutputTime from './Components/OutputTime';
import useStopwatch from './hooks/useStopwatch';
import './Style/app.scss';

function App() {
	const start = useRef();
	const stop = useRef();
	const wait = useRef();
	const reset = useRef();
	const [time, setTime] = useState({});
	const { times } = useStopwatch(start, stop, wait, reset);

	useEffect(() => {
		let typ = typeof times;
		if (typ === 'number') {
			setTime(times);
		}
	}, [times]);

	return (
		<div className='stopwatch'>
			<div className='container'>
				<div className='stopwatch__row'>
					<div className='stopwatch__form'>
						<div className='stopwatch__title'>
							<h1>Stopwatch</h1>
						</div>
						<div className='stopwatch__time'>
							<OutputTime time={time} />
						</div>
						<div className='stopwatch__menu'>
							<button className='stopwatch__btn-start' ref={start}>
								Start
							</button>
							<button className='stopwatch__btn-stop' ref={stop}>
								Stop
							</button>
							<button className='stopwatch__btn-wait' ref={wait}>
								Wait
							</button>
							<button className='stopwatch__btn-reset' ref={reset}>
								Reset
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
