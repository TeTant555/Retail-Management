import React from 'react'
import { useState } from 'react'

const HomeView = () => {
	const [name, setname] = useState('');

	const [show, setshow] = useState(false);
	const toggleShow = () => {
		setshow(prev => !prev);
	}

	const data = [
		{id: "1", name: "Neil"},
		{id: "2", name: "Morine"},
		{id: "3", name: "Bruce"},
	];

  return (
	<div>
		<div>The name is {name}</div>
		<input
		className='bg-black text-white'
		value={name}
		onChange={(e) => setname(e.target.value)} />
		<br />
		{ show && <div>Hello, React</div> }
		<button onClick={() => toggleShow()}>
			{show ? "hide" : "show"}
		</button>
		<br />
		{
			data.map((d) => (
				<div key={d.id}>{d.name}</div>
			))
		}
	</div>
  )
}

export default HomeView
