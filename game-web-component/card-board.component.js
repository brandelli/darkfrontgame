class CardBoardComponent extends HTMLElement
{
	constructor()
	{
		super()

		this.counter = 0;

		this.colors = new Array(
			{ name: "red", force: 10 },
			{ name: "yellow", force: 8 },
			{ name: "green", force: 6 }
		)
		
		this.attachShadow({mode: 'open'}).innerHTML = `
			<style>

				.card
				{
					width: 80px;
					height: 80px;
					border-radius: 40px;
					float: left;
				}

				.card.red
				{
					background: #f68282;
				}

				.card.yellow
				{
					background: #ffefb3;
				}

				.card.green
				{
					background: #7cff8c;
				}

			</style>
			<div class="card-board"></div>
		`

	}

	static get observedAttributes()
	{
		return ['helth']
	}

	// attributeChangedCallback(name, old_value, new_value)
	// {
	// 	let helthBar = this.shadowRoot.querySelector('.helth .bar')

	// 	switch(name)
	// 	{
	// 		case 'helth':
	// 			this._helth = parseInt(new_value, 10) || 0

	// 			helthBar.innerHTML = `${this.helth}%`
	// 			helthBar.style.width = `${this.helth}%`
	// 	}
	// }

	random()
	{
		return Math.floor(Math.random() * this.colors.length)
	}

	addCard()
	{

		const className = this.colors[this.random()].name

		let div = document.createElement('div')
		div.id = this.counter
		div.className = `card ${className}`
		div.onclick = this.cardClick

		let board = this.shadowRoot.querySelector('.card-board')
		board.appendChild(div)

		this.counter++
	}

	strike(attackValue)
	{

		const monster = document.querySelector('monster-component')
		const helth = monster.helth = monster.helth() -= attackValue

		if(helth > 0)
		{
			console.log('refresh')
		}
		else
		{
			MONSTER_HELTH = 0;
			refresh()
			alert("You Win!")
		}
		
	}

	cardClick(event)
	{
		const element = event.srcElement
		const listClasses = element.classList.value
		const test = /(red|yellow|green)/.test("red")

		if(test)
		{
			const match = listClasses.match(/(red|yellow|green)/)[0]

			const key = this.colors.findIndex((element, index) => {
				if(element.name == match) return true
			})

			if(key > -1)
			{
				this.strike(this.colors[key].force)
				// removeCard(element.id)
				// if(size() == 0) populate()
			}
		
		}
	}

	connectedCallback()
	{
		this.colors.forEach(() => this.addCard())
	}

	// get helth()
	// {
	// 	return this.getAttribute('helth')
	// }

	// set helth(value)
	// {
	// 	this.setAttribute('helth', value)
	// }
}