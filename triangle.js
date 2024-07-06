document.addEventListener("DOMContentLoaded", () => {
  const allBtn = document.getElementsByClassName('btn-add');

  document.getElementById('seeAllOffersButton').addEventListener('click', function() {
  document.getElementById('lifeSection').scrollIntoView({ behavior: 'smooth' });
  });

  for (const btn of allBtn) {
    btn.addEventListener("click", function (event) {
      const seatName = event.target.innerText;
      const name = seatName; // Using the button name directly for seat name
      const size = document.getElementById('quality').innerText;
      const height = parseInt(document.getElementById('height').innerText);

      const selectedContainer = document.getElementById("selected-players-container");

      event.target.setAttribute("disabled", true);

      const firstCartCount = getConvertedValue("cart");
      if (firstCartCount + 1 > 4) {
        alert("You can't select more than 4 tickets.");
        return;
      }

      event.target.style.backgroundColor = "green";

      const cartCount = getConvertedValue("cart");
      document.getElementById("cart").innerText = cartCount + 1;

      const leftCount = getConvertedValue("left");
      document.getElementById("left").innerText = leftCount - 1;

      const div = document.createElement("div");
      div.classList.add("flex", "gap-4");

      const p1 = document.createElement("p");
      const p2 = document.createElement("p");
      const p3 = document.createElement("p");

      p1.innerText = name;
      p2.innerText = size;
      p3.innerText = height;

      div.appendChild(p1);
      div.appendChild(p2);
      div.appendChild(p3);
      selectedContainer.appendChild(div);

      updateTotalCost(height);
      updateGrandTotal();
    });
  }

  function getConvertedValue(id) {
    const price = document.getElementById(id).innerText;
    return parseInt(price);
  }

  function updateGrandTotal(status) {
    const totalCost = getConvertedValue("total-cost");
    const grandTotalElement = document.getElementById("grand-total");

    if (status === undefined) {
      grandTotalElement.innerText = totalCost;
    } else {
      const couponCode = document.getElementById("coupon-code").value.trim();

      let discountedPrice;
      if (couponCode === "NEW15") {
        const discount = totalCost * 0.15;
        discountedPrice = totalCost - discount;
      } else if (couponCode === "Couple20") {
        const discount = totalCost * 0.20;
        discountedPrice = totalCost - discount;
      } else {
        alert("Invalid code");
        return;
      }

      grandTotalElement.innerText = discountedPrice.toFixed(2);
    }
  }

  function updateTotalCost(height) {
    const totalCost = getConvertedValue("total-cost");
    const sum = totalCost + height;
    document.getElementById("total-cost").innerText = sum;
  }

  document.getElementById('apply-btn').addEventListener('click', () => {
    updateGrandTotal('apply-btn');
  });
});
