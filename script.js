document.addEventListener("DOMContentLoaded", function() {
    const rows = document.querySelectorAll("#pcTable tbody tr");
    const totalPriceEl = document.getElementById("totalPrice");

    function calculateTotal() {
        let remainingTotal = 0;
        let ownedTotal = 0;

        rows.forEach(row => {
            const priceCell = row.querySelector("td:nth-child(4)");
            const checkbox = row.querySelector(".owned-checkbox");

            if (!priceCell || !checkbox) return;

            const priceText = priceCell.textContent.replace(/[^0-9.]/g, '');
            const price = parseFloat(priceText);
            if (isNaN(price)) return;

            if (checkbox.checked) {
                ownedTotal += price;
            } else {
                remainingTotal += price;
            }
        });

        totalPriceEl.textContent =
            `₱${remainingTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

        document.getElementById("ownedTotal").textContent =
            `₱${ownedTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
    }


    calculateTotal();

    document.querySelectorAll(".owned-checkbox").forEach(checkbox => {
        checkbox.addEventListener("change", calculateTotal);
    });

    const toggleImagesBtn = document.getElementById("toggleImagesBtn");
    const allImages = document.querySelectorAll("img.toggle-image");
    const allPlaceholders = document.querySelectorAll(".placeholder-text");
    let imagesVisible = false;

    toggleImagesBtn.addEventListener("click", function() {
        imagesVisible = !imagesVisible;
        allImages.forEach(img => img.style.display = imagesVisible ? 'block' : 'none');
        allPlaceholders.forEach(text => text.style.display = imagesVisible ? 'none' : 'block');
        toggleImagesBtn.textContent = imagesVisible ? "Hide All Images" : "Show All Images";
    });

    document.querySelectorAll(".image-container").forEach(container => {
        container.addEventListener("click", () => {
            const img = container.querySelector("img.toggle-image");
            const text = container.querySelector(".placeholder-text");
            const hidden = img.style.display === 'none';
            img.style.display = hidden ? 'block' : 'none';
            text.style.display = hidden ? 'none' : 'block';
        });
    });
});
