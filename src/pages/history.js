// Get references to the history list and empty message elements
const boughtButton = document.getElementById('bought-button');
const soldButton = document.getElementById('sold-button');

const fromDate = document.getElementById('from-date');
const toDate = document.getElementById('to-date');

const historySearchButton = document.getElementById('history-search-button');
const historyResetButton = document.getElementById('history-reset-button');

const historyList = document.getElementById('history-list');
const historyEmpty = document.getElementById('history-empty');

let historyItems = [];

// Function to render the history items
const renderHistory = (historyItems) => {
    historyList.innerHTML = '';

    if (historyItems.length === 0) {
        historyEmpty.style.display = 'block';
        return;
    }

    historyEmpty.style.display = 'none';

    historyItems.forEach(item => {
        const historyElement = document.createElement('tr');
        historyElement.classList.add('history-item');

historyElement.innerHTML = `
    <td class="px-4 py-3">
        <div class="flex items-center gap-3">
            <img
                src="${item.media?.[0]?.url || ''}"
                alt="${item.media?.[0]?.alt || ''}"
                class="w-14 h-14 object-cover rounded-lg"
            >

            <a
                href="/product.html?id=${item.id}"
                class="font-semibold text-gray-900 hover:text-purple-600"
            >
                ${item.title}
            </a>
        </div>
    </td>

    <td class="px-4 py-3">
        anthony86
    </td>

    <td class="px-4 py-3">
        -
    </td>

    <td class="px-4 py-3">
        ${new Date(item.created).toLocaleDateString()}
    </td>

    <td class="px-4 py-3">
        -
    </td>

    <td class="px-4 py-3 text-center">
        <a
            href="/product.html?id=${item.id}"
            class="text-purple-600 hover:text-purple-800 font-semibold"
        >
            View
        </a>
    </td>
`;        historyList.appendChild(historyElement);
    });
};


const token = localStorage.getItem('accessToken');
if (!token) {
    window.location.href = '/login.html';
} else {


const response = await fetch('https://v2.api.noroff.dev/auction/profiles/anthony86/listings', {
    method: 'GET',
    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW50aG9ueTg2IiwiZW1haWwiOiJhbnRob255LmFwaUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTc4Nzc1MTk5MX0.pBk30AYhdVwQFdv5oe-FfpCRioU1E0Uad6-nYHQ1aEM',
                    'X-Noroff-API-Key': 'c87c2791-c851-4066-9044-070f941de43d'
    }
});

if (response.ok) {
    const data = await response.json();
    console.log('MY LISTINGS:', data);

historyItems = data.data;
renderHistory(historyItems);
} else {
    console.error('Failed to fetch history:', response.status);
}   

}

// history search 
historySearchButton.addEventListener('click', () => {
    const from = fromDate.value;
    const to = toDate.value;

    const filteredItems = historyItems.filter(item => {
        const itemDate = new Date(item.created);

        if (from && itemDate < new Date(from)) {
            return false;
        }

        if (to && itemDate > new Date(`${to}T23:59:59`)) {
            return false;
        }

        return true;
    });

    renderHistory(filteredItems);
});

historyResetButton.addEventListener('click', () => {
    fromDate.value = '';
    toDate.value = '';

    renderHistory(historyItems);
});