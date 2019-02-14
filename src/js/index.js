'use strict';


document.documentElement.classList.remove("client__no-js");

//DEVNOTE: if no id use UID generator to assign aria hooks

function uiAccordion(_selector) {

	const $ = (selector, el = document) => [].slice.call(el.querySelector(selector)); //[].from(el.querySelector(selector))
	const $$ = (selector, el = document) => [].slice.call(el.querySelectorAll(selector)); //[].from(el.querySelectorAll(selector))

	//DEVNOTE: Nodelist is an array-like object; this will shallow copy to an actual array.
	var $$ui = $$(_selector);

	$$ui.length && [].forEach.call($$ui, ($accordion, i) => {
		
		//let $$button = $$(":scope > .accordion__header > button", $accordion); //DEVNOTE: :scope is still in w3c draft //for robust solution 1)would need a rooted query to impose the relationship as direct child from accordion 2)or ditch queryselector and use children and evaluate elementName
		let $$button = $$(".accordion__header > button", $accordion).filter( (node) => node.parentNode.parentNode === $accordion);

		[].forEach.call($$button, ($toggle, i) => {

			//DEVNOTE: TODO: clicks from nested accordions would bubble up to the parent and conflict
			$toggle.addEventListener("click", function(event) {
				event.stopPropagation();

				if(this.parentElement.classList.contains("state__active")) return false;

				clickHandler.call(this, event, $accordion);
			}, false);
		});
			
		var $$pane = $$(".accordion__pane", $accordion);
		
		$$pane.forEach(($pane) => {
			$pane.addEventListener("transitionend", function(event) {
				if(this.style.height && event.propertyName === "height") this.style.height = "auto";
			}, false);
		});
	});

	function clickHandler(event, $accordion) {

		let $$headers = $$(".accordion__header", $accordion),
			$target = this.parentElement;//,
			//$pane = $target.nextElementSibling;
			
		[].forEach.call($$headers, ($header, i) => {
			
			if($header.classList.contains("state__active")) {
				//console.log($header.nextElementSibling, " :: ", $header.nextElementSibling.offsetHeight, " :: ", $header.nextElementSibling.clientHeight, " :: ", $header.nextElementSibling.scrollHeight, " :: ", $header.nextElementSibling.getBoundingClientRect().height);
				$header.nextElementSibling.style.height = `${$header.nextElementSibling.scrollHeight}px`;
				$header.nextElementSibling.getBoundingClientRect(); //DEVNOTE: forced recomputation
			}

			$header.classList[$header === $target ? 'add' : 'remove']("state__active");
			$header.nextElementSibling.style.height = ($header === $target) ? `${$header.nextElementSibling.scrollHeight}px` : null;
		});

		return false;
	}
}

new uiAccordion(".ui__accordion");


if(module.hot) {
	module.hot.accept();
}
