document.addEventListener("DOMContentLoaded", function () {
    const rows = document.querySelectorAll("#pcTable tbody tr");
    let total = 0;

    rows.forEach(row => {
        const priceCell = row.querySelector("td:nth-child(4)");
        if (priceCell) {
            const priceText = priceCell.textContent.replace(/[^0-9.]/g, '');
            const price = parseFloat(priceText);
            if (!isNaN(price)) total += price;
        }
    });

    document.getElementById("totalPrice").textContent =
        `₱${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

    const toggleImagesBtn = document.getElementById("toggleImagesBtn");
    const allImages = document.querySelectorAll("img.toggle-image");
    const allPlaceholders = document.querySelectorAll(".placeholder-text");
    let imagesVisible = false;

    toggleImagesBtn.addEventListener("click", function () {
        imagesVisible = !imagesVisible;
        allImages.forEach(img => img.style.display = imagesVisible ? 'block' : 'none');
        allPlaceholders.forEach(placeholder => placeholder.style.display = imagesVisible ? 'none' : 'block');
        toggleImagesBtn.textContent = imagesVisible ? "Hide All Images" : "Show All Images";
    });

    document.querySelectorAll(".image-container").forEach(container => {
        container.addEventListener("click", () => {
            const img = container.querySelector("img.toggle-image");
            const text = container.querySelector(".placeholder-text");
            const isHidden = img.style.display === 'none';
            img.style.display = isHidden ? 'block' : 'none';
            text.style.display = isHidden ? 'none' : 'block';
        });
    });
});
