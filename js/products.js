const list = document.querySelector('product-cards');

fetch('./products.json')
  .then(response => response.json())
  .then(products => {
    products.forEach(products => {
    const card = `
        <div class="col-md-6">
			<div class="card mb-4" data-id="${products.data-id}">
				<img class="product-img" src="${products.productImg}" alt="">
				<div class="card-body text-center">
					<h4 class="item-title">${products.title}</h4>
					<p><small data-items-in-box class="text-muted">${products.itemsInBox}</small></p>

					<div class="details-wrapper">
						<div class="items counter-wrapper">
							<div class="items__control" data-action="minus">-</div>
							<div class="items__current" data-counter>1</div>
							<div class="items__control" data-action="plus">+</div>
						</div>

						<div class="price">
							<div class="price__weight">${products.weight}</div>
							<div class="price__currency">${products.price}</div>
						</div>
					</div>

					<button data-cart type="button" class="btn btn-block btn-outline-warning">+ в корзину</button>

				</div>
			</div>
		</div>`

  list.insertAdjacentHTML('beforeend', card)
})  
})


					