import { useEffect, useState } from 'react/cjs/react.development';
import { interval, fromEvent } from 'rxjs';
import { timeInterval, filter } from 'rxjs/operators';

function useStopwatch(start, stop, wait, reset) {
	const [times, setTimes] = useState();
	const [clas, setClas] = useState({ start, stop, wait, reset });

	useEffect(() => {
		const str = document.querySelector(`.${clas.start.current.className}`);
		const stp = document.querySelector(`.${clas.stop.current.className}`);
		const wit = document.querySelector(`.${clas.wait.current.className}`);
		const res = document.querySelector(`.${clas.reset.current.className}`);

		const btnStart$ = fromEvent(str, 'click');
		const btnStop$ = fromEvent(stp, 'click');
		const btnWait$ = fromEvent(wit, 'click');
		const btnReset$ = fromEvent(res, 'click');

		const interval$ = interval(100);

		let startAction = false;
		let stopAction = false;
		let resetAction = false;

		btnStart$.subscribe(() => {
			startAction = true;
			stopAction = false;
		});

		btnStop$.subscribe(() => {
			startAction = false;
			stopAction = true;
		});

		btnWait$
			.pipe(
				timeInterval(),
				filter(({ interval }) => interval <= 300)
			)
			.subscribe(() => (startAction = false));

		btnReset$.subscribe(() => {
			startAction = false;
			stopAction = false;
			resetAction = true;
		});

		let a = 0;
		interval$.subscribe(() => {
			startAction && (a = a + 1);
			stopAction && (a = 0);
			if (resetAction) {
				a = 0;
				resetAction = false;
				startAction = true;
			}
			setTimes(a);
		});
	}, [clas]);

	return { times };
}

export default useStopwatch;
