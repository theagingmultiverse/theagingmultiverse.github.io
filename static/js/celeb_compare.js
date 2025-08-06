// Data structure for celebrities and their conditions
const celebrityData = {
    "charles": {
        "sourceAge": "30",
        "conditions": ["drywind", "goodskin", "hairloss", "sun"],
        "images": {
            "source": "static/images/comparisons/celeb/charles/source.jpg"
        }
    },
    "elaine": {
        "sourceAge": "30",
        "conditions": ["drywind", "goodskin", "sun"],
        "images": {
            "source": "static/images/comparisons/celeb/elaine/source.jpg"
        }
    },
    "oprah": {
        "sourceAge": "33",
        "conditions": ["alcoholism", "goodskin", "poorskin"],
        "images": {
            "source": "static/images/comparisons/celeb/oprah/source.jpg"
        }
    },
    "robert": {
        "sourceAge": "31",
        "conditions": ["alcoholism", "drywind", "goodskin", "weight"],
        "images": {
            "source": "static/images/comparisons/celeb/robert/source.jpg"
        }
    }
};

const nonCelebrityData = {
    "ana": {
        "sourceAge": "20",
        "conditions": ["alcoholism", "goodskin", "sun"],
        "images": {
            "source": "static/images/comparisons/nonceleb/ana/source.jpg"
        }
    },
    "andrea": {
        "sourceAge": "20",
        "conditions": ["alcoholism", "goodskin", "poorskin"],
        "images": {
            "source": "static/images/comparisons/nonceleb/andrea/source.jpg"
        }
    },
    "jun": {
        "sourceAge": "30",
        "conditions": ["alcoholism", "drywind", "goodskin", "sun"],
        "images": {
            "source": "static/images/comparisons/nonceleb/jun/source.jpg"
        }
    },
    "prakrut": {
        "sourceAge": "20",
        "conditions": ["drywind", "goodskin", "hairloss"],
        "images": {
            "source": "static/images/comparisons/nonceleb/prakrut/source.jpg"
        }
    }
};

// Global variables to track current selections
let currentCelebPerson = "charles";
let currentNonCelebPerson = "ana";

// Function to get display name for conditions
function getConditionDisplayName(condition) {
    const conditionMap = {
        "drywind": "Dry Windy Climate",
        "goodskin": "Good Skin Care",
        "hairloss": "Hair Loss",
        "sun": "Strong Sunlight Exposure",
        "alcoholism": "Alcoholism",
        "poorskin": "Poor Skin Care",
        "weight": "Weight Gain"
    };
    return conditionMap[condition] || condition;
}

// Function to populate condition dropdown
function populateConditionDropdown(selectId, conditions) {
    const select = document.getElementById(selectId);
    select.innerHTML = '<option value="">Select condition</option>';
    
    conditions.forEach(condition => {
        const option = document.createElement('option');
        option.value = condition;
        option.textContent = getConditionDisplayName(condition);
        select.appendChild(option);
    });
    
    // Select first condition by default
    if (conditions.length > 0) {
        select.value = conditions[0];
    }
}

// Function to construct image path
function getImagePath(category, person, method, condition, age) {
    return `static/images/comparisons/${category}/${person}/${method}/${condition}/img_${age}.jpg`;
}

// Function to update celebrity images
function updateCelebImages() {
    const conditionSelect = document.getElementById('celebConditionSelect');
    const ageSelect = document.getElementById('celebAgeSelect');
    
    const selectedCondition = conditionSelect.value;
    const selectedAge = ageSelect.value;
    
    if (!selectedCondition || !selectedAge) {
        return;
    }
    
    const person = currentCelebPerson;
    const data = celebrityData[person];
    
    // Update source image and info
    document.getElementById('celebSourceImage').src = data.images.source;
    document.getElementById('celebSourceAge').innerText = data.sourceAge;
    document.getElementById('celebCondition').innerText = getConditionDisplayName(selectedCondition);
    document.getElementById('celebTargetAge').innerText = selectedAge;
    
    // Update method images
    const methods = ['ours', 'rfsolver', 'flowedit', 'fireflow', 'fading'];
    methods.forEach(method => {
        const elementId = method === 'rfsolver' ? 'celebRFSolverEditImage' : 
                         method === 'flowedit' ? 'celebFlowEditImage' :
                         method === 'fireflow' ? 'celebFireFlowImage' :
                         method === 'fading' ? 'celebFadingImage' : 'celebOursImage';
        
        const imagePath = getImagePath('celeb', person, method, selectedCondition, selectedAge);
        document.getElementById(elementId).src = imagePath;
    });
}

// Function to update non-celebrity images
function updateNonCelebImages() {
    const conditionSelect = document.getElementById('nonCelebConditionSelect');
    const ageSelect = document.getElementById('nonCelebAgeSelect');
    
    const selectedCondition = conditionSelect.value;
    const selectedAge = ageSelect.value;
    
    if (!selectedCondition || !selectedAge) {
        return;
    }
    
    const person = currentNonCelebPerson;
    const data = nonCelebrityData[person];
    
    // Update source image and info
    document.getElementById('nonCelebSourceImage').src = data.images.source;
    document.getElementById('nonCelebSourceAge').innerText = data.sourceAge;
    document.getElementById('nonCelebCondition').innerText = getConditionDisplayName(selectedCondition);
    document.getElementById('nonCelebTargetAge').innerText = selectedAge;
    
    // Update method images
    const methods = ['ours', 'rfsolver', 'flowedit', 'fireflow', 'fading'];
    methods.forEach(method => {
        const elementId = method === 'rfsolver' ? 'nonCelebRFSolverEditImage' : 
                         method === 'flowedit' ? 'nonCelebFlowEditImage' :
                         method === 'fireflow' ? 'nonCelebFireFlowImage' :
                         method === 'fading' ? 'nonCelebFadingImage' : 'nonCelebOursImage';
        
        const imagePath = getImagePath('nonceleb', person, method, selectedCondition, selectedAge);
        document.getElementById(elementId).src = imagePath;
    });
}

// Function to select celebrity person
function selectCompPersonCeleb(person, element) {
    // Remove 'active' class from all celebrity pills
    const pills = document.querySelectorAll('#scene-pills-celebrity .pill');
    pills.forEach(p => p.classList.remove('active'));
    
    // Add 'active' class to the clicked pill
    element.classList.add('active');
    
    currentCelebPerson = person;
    const data = celebrityData[person];
    
    // Update condition dropdown
    populateConditionDropdown('celebConditionSelect', data.conditions);
    
    // Set default age to 50
    document.getElementById('celebAgeSelect').value = '50';
    
    // Update images
    updateCelebImages();
}

// Function to select non-celebrity person
function selectCompPersonNonCeleb(person, element) {
    // Remove 'active' class from all non-celebrity pills
    const pills = document.querySelectorAll('#scene-pills-non-celebrity .pill');
    pills.forEach(p => p.classList.remove('active'));
    
    // Add 'active' class to the clicked pill
    element.classList.add('active');
    
    currentNonCelebPerson = person;
    const data = nonCelebrityData[person];
    
    // Update condition dropdown
    populateConditionDropdown('nonCelebConditionSelect', data.conditions);
    
    // Set default age to 50
    document.getElementById('nonCelebAgeSelect').value = '50';
    
    // Update images
    updateNonCelebImages();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize celebrity section
    const initialCelebPill = document.querySelector('#scene-pills-celebrity .pill.active');
    if (initialCelebPill) {
        selectCompPersonCeleb(initialCelebPill.dataset.value, initialCelebPill);
    }
    
    // Initialize non-celebrity section
    const initialNonCelebPill = document.querySelector('#scene-pills-non-celebrity .pill.active');
    if (initialNonCelebPill) {
        selectCompPersonNonCeleb(initialNonCelebPill.dataset.value, initialNonCelebPill);
    }
}); 