import React, { useEffect, useState } from 'react';
import { interval, Subject } from 'rxjs';
import { timeInterval, filter, scan, map } from 'rxjs/operators';
import OutputTime from './Components/OutputTime';
import Buttons from './Components/Buttons';
import './Style/app.scss';

let start = false;
let stop = false;
let wait = false;
let reset = false;

const action$ = new Subject();

const Reset$ = action$.pipe(filter(val => val === 'reset')).subscribe(() => {
	reset = true;
	start = false;
	wait = false;
	stop = false;
});

const Wait$ = action$
	.pipe(
		timeInterval(),
		filter(val => val.value === 'wait' && val.interval <= 300)
	)
	.subscribe(() => {
		wait = true;
	});

const Stop$ = action$.pipe(filter(val => val === 'stop')).subscribe(() => {
	start = false;
	stop = true;
});

const Start$ = action$.pipe(filter(val => val === 'start')).subscribe(() => {
	wait = false;
	start = true;
	stop = false;
});

const timer$ = interval(100).pipe(
	scan(accTime => {
		if (start && !wait) {
			return accTime + 1;
		}
		if (stop && !wait) {
			return (accTime = 0);
		}
		if (wait) {
			return accTime;
		}
		if (reset) {
			accTime = 0;
			reset = false;
			start = true;
		}
		return 0;
	}, 0),
	map(time => ({ time, start, wait }))
);

function App() {
	const [time, setTime] = useState({});

	useEffect(() => {
		const sub = timer$.subscribe(time => {
			setTime(time);
		});

		return () => sub.unsubscribe();
	}, []);

	function action(val) {
		return action$.next(val);
	}

	return (
		<div className='stopwatch'>
			<div className='container'>
				<div className='stopwatch__row'>
					<div className='stopwatch__form'>
						<div className='stopwatch__title'>
							<h1>Stopwatch</h1>
						</div>
						<div className='stopwatch__time'>
							<OutputTime time={time.time} />
						</div>
						<div className='stopwatch__menu'>
							<Buttons start={time.start} wait={time.wait} action={action} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
