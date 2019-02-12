(function main() {
	const doc = document;

	// Shortcuts to DOM methods
	const getClassElements = className => doc.getElementsByClassName(className);
	const getFirstElementOfClass = className => getClassElements(className)[0];

	// MENU
	const collapse = getFirstElementOfClass('collapse');
	collapse.onclick = () => {
		const menu = getFirstElementOfClass('mnavigation');
		menu.classList.toggle('mnavigation--disappear');
	};

	const model = [
		{
			id: 0,
			imgSrc: 'assets/images/techshots.png',
			imgAlt: 'TechShots',
			desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, voluptatem. Ea fugit asperiores minus magni.`,
			projectUrl: 'https://techshots.herokuapp.com/',
			prevId: null,
			nextId: 1
		},
		{
			id: 1,
			imgSrc: 'assets/images/simon_game.png',
			imgAlt: 'Simon Game',
			desc: `The game was created as assignment for FreeCodeCamp FrontEnd Certification`,
			projectUrl: 'https://codepen.io/DeylRaytop/full/YYNmQZ',
			prevId: 0,
			nextId: 2
		},
		{
			id: 2,
			imgSrc: 'assets/images/tictactoe.png',
			imgAlt: 'Tic Tac Toe',
			desc: `The game was created as assignment for FreeCodeCamp FrontEnd Certification`,
			projectUrl: 'https://codepen.io/DeylRaytop/full/GyooPq',
			prevId: 1,
			nextId: 3
		},
		{
			id: 3,
			imgSrc: 'assets/images/pomodoro.png',
			imgAlt: 'Pomodoro Clock',
			desc: `The project was created as assignment for FreeCodeCamp FrontEnd Certification.`,
			projectUrl: 'https://codepen.io/DeylRaytop/full/vbrZmR',
			prevId: 2,
			nextId: 4
		},
		{
			id: 4,
			imgSrc: 'assets/images/js_calculator.png',
			imgAlt: 'JavaScript Calculator',
			desc: `The project was created as assignment for FreeCodeCamp FrontEnd Certification.`,
			projectUrl: 'https://codepen.io/DeylRaytop/full/zzBdqX',
			prevId: 3,
			nextId: 5
		},
		{
			id: 5,
			imgSrc: 'assets/images/wikipedia_viewer.png',
			imgAlt: 'Wikipedia Viewer',
			desc: `The project was created as assignment for FreeCodeCamp FrontEnd Certification.`,
			projectUrl: 'https://codepen.io/DeylRaytop/pen/BRVdmx',
			prevId: 4,
			nextId: null
		}
	];

	// Setting modal window variables
	const modal = getFirstElementOfClass('modal');
	const imageSurfaces = getClassElements('thumbnails__item');
	const closeBtn = getFirstElementOfClass('modal__close-btn');

	// Toggle modal window content
	const toggleContent = () => {
		setTimeout(() => {
		// show button
			closeBtn.classList.toggle('modal__close-btn--visible');

			// show an image and description
			const container = getFirstElementOfClass('modal__container');
			container.classList.toggle('modal__container--visible');
		}, 700);

		setTimeout(() => {
			const footer = getFirstElementOfClass('modal__footer');
			footer.classList.toggle('modal__footer--visible');
		}, 1500);
	};

	// Open the modal window
	const openModal = () => {
		// wait before open
		setTimeout(() => {
			modal.classList.toggle('modal--visible');
		}, 400);

		// it'll show the content afterwards (700ms)
		toggleContent();
	};

	// Close the modal window
	const closeModal = () => {
		toggleContent();

		// fading effect
		setTimeout(() => {
			modal.classList.add('modal--fading');
		}, 1500);

		// exclude used classes
		setTimeout(() => {
			modal.classList.remove('modal--fading');
			modal.classList.remove('modal--visible');
		}, 2500);
	};

	// DATA FETCHING
	const fetchTheContent = id => model.filter(x => x.id === id)[0];

	// Applies when 'next/prev-btn' was clicked
	const switchImage = trigger => {
		const container = getFirstElementOfClass('modal__container');

		const otherPhoto = direction => {
			const btn = 'modal__container';
			container.classList.add(`${btn}--switch-${direction}`);
			// move to direction
			setTimeout(() => {
				container.classList.remove(`${btn}--visible`);
			}, 400);

			// move to the opposite
			setTimeout(() => {
				container.classList.remove(`${btn}--switch-${direction}`);
				container.classList.add(`${btn}--switch-${direction}-on-opposite`);
			}, 600);

			// return to original place
			setTimeout(() => {
				container.classList.add(`${btn}--visible`);
				container.classList.remove(`${btn}--switch-${direction}-on-opposite`);
				container.classList.add(`${btn}--default-place`);
			}, 850);

			setTimeout(() => {
				container.classList.remove(`${btn}--default-place`);
			}, 1000);
		};

		if (trigger === 'prev') {
			otherPhoto('right');
		} else if (trigger === 'next') {
			otherPhoto('left');
		}
	};

	const insertTheData = (work, trigger) => {
		const { imgSrc, imgAlt, desc, projectUrl, prevId, nextId } = work;

		// setup references to elements
		const modalImg = getFirstElementOfClass('modal__img');
		const modalDesc = getFirstElementOfClass('modal__desc');
		const modalUrl = getFirstElementOfClass('modal__link').children[0];
		const prevBtn = getFirstElementOfClass('modal__prev-btn');
		const nextBtn = getFirstElementOfClass('modal__next-btn');

		if (trigger) {
			// image switching effect
			switchImage(trigger);

			// change image "behind the scenes"
			setTimeout(() => {
				modalImg.src = imgSrc;
			}, 800);
		} else {
			modalImg.src = imgSrc;
		}

		// modifying elements
		modalImg.alt = imgAlt;
		modalDesc.innerHTML = desc;
		modalUrl.href = projectUrl;
		prevBtn.dataset.visit = prevId;
		nextBtn.dataset.visit = nextId;

		const prevBtnClassList = prevBtn.classList;
		const nextBtnClassList = nextBtn.classList;

		const btnSwitcher = (id, classList) => {
			const activeClass = `${classList[0]}--active`;
			const isBtnActive = classList.contains(activeClass);

			if (typeof id === 'number' && !isBtnActive){
				classList.add(activeClass);
			} else if (!id && isBtnActive){
				classList.remove(activeClass);
			}
		}
		
		btnSwitcher(prevId, prevBtnClassList);
		btnSwitcher(nextId, nextBtnClassList);
	};

	// MANIPULATE WITHIN MODAL
	function manipulate(id) {
		const work = fetchTheContent(id);

		// if the function was invoked by prev/next button
		const trigger = this !== window ? this.trigger : null;

		insertTheData(work, trigger);
	}

	// Extracts surface id
	const getImageId = (cssId) => {
		const divided = cssId.split('_');
		const last = divided.length - 1;
		const id = parseInt(divided[last], 10);

		return id;
	}

	// if image was clicked
	const onClickSurface = (cssId) => () => {
		openModal();
		const id = getImageId(cssId);
		manipulate(id);
	};

	// next/prev button handler
	function switchButtonAction() {
		const { visit, movement } = this.dataset;
		const id = parseInt(visit, 10);
		const trigger = movement;

		// in case there is an image toward the direction
		if (id || id === 0) {
			manipulate.call({ trigger }, id);
		}
	}

	const prevBtn = getFirstElementOfClass('modal__prev-btn');
	const nextBtn = getFirstElementOfClass('modal__next-btn');

	prevBtn.onclick = switchButtonAction;
	nextBtn.onclick = switchButtonAction;

	// HELPERS
	// DOM node into array
	function turnIntoArray(nodeList) {
		return Array.from(nodeList);
	}

	// LISTENERS
	// if close button was clicked
	closeBtn.onclick = closeModal;

	// Click event for imageSurfaces
	turnIntoArray(imageSurfaces).forEach(item => {
	// get the id of clicked image
		item.onclick = onClickSurface(item.id);
	});


})();
