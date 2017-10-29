class PlayerComponent extends HTMLElement
{
	constructor()
	{
		super()

		this._helth = 0
		
		this.attachShadow({mode: 'open'}).innerHTML = `
			<style>

				.helth
				{
					width: 100%;
					height: 30px;
					background: gray;
					border-radius: 6px;
					color: white;
				}

				.helth .bar
				{
					text-align: center;
					height: 100%;
					line-height: 30px;
					background: blue;
					text-align: center;
					border-radius: 6px;
					transition: width .25s;
				}

			</style>
			<div class="player">
				<h2>Player</h2>
				<div class="helth">
					<div class="bar">${this.helth}</div>
				</div>
			</div>
		`

	}

	static get observedAttributes()
	{
		return ['helth']
	}

	attributeChangedCallback(name, old_value, new_value)
	{
		let helthBar = this.shadowRoot.querySelector('.helth .bar')

		switch(name)
		{
			case 'helth':
				this._helth = parseInt(new_value, 10) || 0

				helthBar.innerHTML = `${this.helth}%`
				helthBar.style.width = `${this.helth}%`
		}
	}

	get helth()
	{
		return this._helth
	}

	set helth(value)
	{
		this.setAttribute('helth', value)
	}
}