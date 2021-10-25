import React, { useEffect, useState } from 'react';

function OutputTime({ time }) {
	const [formatTime, setFormatTime] = useState('00:00:00')

	useEffect(() => {
		let sec = Math.floor(time / 6000)
		let min = Math.floor(time / 600)
		let hur = Math.floor((time / 10) % 60)

		sec < 10 && (sec = `0${sec}`)
		min < 10 && (min = `0${min}`)
		hur < 10 && (hur = `0${hur}`)

		setFormatTime(`${sec}:${min}:${hur}`)
	}, [time])

	return (
		<h2>
			{formatTime}
		</h2>
	);
}

export default OutputTime;