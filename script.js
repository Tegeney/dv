// Form validation and handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const paymentScreenshotInput = document.getElementById('payment_screenshot');
    const photoInput = document.getElementById('photo');
    const childrenNumberInput = document.getElementById('number_of_children');
    const childrenDetails = document.getElementById('children_details');
    const childrenContainer = document.getElementById('children_container');
    const saveInfoBtn = document.getElementById('saveInfoBtn');
    const saveMessage = document.getElementById('saveMessage');
    const paymentSection = document.getElementById('paymentSection');
    
    if (form) {
        // Load saved data on page load
        loadSavedData();
        
        function loadSavedData() {
            const savedData = localStorage.getItem('dv_lottery_personal_info');
            if (savedData) {
                try {
                    const data = JSON.parse(savedData);
                    
                    // Fill all form fields
                    Object.keys(data).forEach(key => {
                        const input = document.querySelector(`[name="${key}"]`);
                        if (input && data[key]) {
                            if (input.type === 'file') {
                                // Skip file inputs - can't programmatically set file values
                                return;
                            }
                            input.value = data[key];
                            input.style.borderColor = 'var(--secondary-color)';
                        }
                    });
                    
                    // Trigger children form generation if needed
                    const numChildren = parseInt(data.number_of_children) || 0;
                    if (numChildren > 0) {
                        childrenNumberInput.value = numChildren;
                        childrenDetails.style.display = 'block';
                        generateChildrenForms(numChildren);
                        
                        // Fill children data
                        setTimeout(() => {
                            for (let i = 1; i <= numChildren; i++) {
                                const childName = document.querySelector(`input[name="child_${i}_name"]`);
                                const childDOB = document.querySelector(`input[name="child_${i}_dob"]`);
                                const childGender = document.querySelector(`select[name="child_${i}_gender"]`);
                                
                                if (childName && data[`child_${i}_name`]) childName.value = data[`child_${i}_name`];
                                if (childDOB && data[`child_${i}_dob`]) childDOB.value = data[`child_${i}_dob`];
                                if (childGender && data[`child_${i}_gender`]) childGender.value = data[`child_${i}_gender`];
                            }
                        }, 100);
                    }
                    
                    // Show that data was loaded
                    console.log('✅ Saved data loaded successfully');
                    
                    // Enable payment section if data was previously saved
                    if (saveInfoBtn && saveMessage && paymentSection) {
                        saveMessage.style.display = 'block';
                        saveInfoBtn.textContent = '✅ Saved! Proceed to Payment / ተቀምጧል! ወደ ክፍያ ይቀጥሉ';
                        saveInfoBtn.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)';
                        paymentSection.style.opacity = '1';
                        paymentSection.style.pointerEvents = 'auto';
                        
                        // Enable payment field validation
                        const paymentMethod = document.getElementById('payment_method');
                        const paymentScreenshot = document.getElementById('payment_screenshot');
                        if (paymentMethod) paymentMethod.setAttribute('required', 'true');
                        if (paymentScreenshot) paymentScreenshot.setAttribute('required', 'true');
                    }
                    
                } catch (error) {
                    console.error('Error loading saved data:', error);
                }
            }
        }
        
        // Auto-save form data as user types (every 2 seconds after typing stops)
        let autoSaveTimeout;
        const formInputs = form.querySelectorAll('input:not([type="file"]), select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                clearTimeout(autoSaveTimeout);
                autoSaveTimeout = setTimeout(() => {
                    autoSaveFormData();
                }, 2000); // Save 2 seconds after user stops typing
            });
        });
        
        function autoSaveFormData() {
            const formData = new FormData(form);
            const dataToSave = {};
            for (let [key, value] of formData.entries()) {
                if (key !== 'payment_method' && key !== 'payment_screenshot' && key !== 'terms' && key !== 'photo') {
                    dataToSave[key] = value;
                }
            }
            localStorage.setItem('dv_lottery_personal_info', JSON.stringify(dataToSave));
            console.log('💾 Auto-saved form data');
        }
        // Handle Save Information button
        if (saveInfoBtn) {
            saveInfoBtn.addEventListener('click', function() {
                // Validate required personal information fields
                const requiredFields = [
                    { id: 'last_name', label: 'Last Name / የመጨረሻ ስም' },
                    { id: 'first_name', label: 'First Name / የመጀመሪያ ስም' },
                    { id: 'gender', label: 'Gender / ፆታ' },
                    { id: 'date_of_birth', label: 'Date of Birth / የልደት ቀን' },
                    { id: 'birth_city', label: 'Birth City / የተወለዱበትን ከተማ' },
                    { id: 'country_of_birth', label: 'Country of Birth / የተወለዱበትን ሀገር' },
                    { id: 'eligible_country', label: 'Country of Eligibility' },
                    { id: 'photo', label: 'Photograph / ፎቶግራፍ' },
                    { id: 'mailing_address', label: 'Mailing Address / የፖስታ አድራሻ' },
                    { id: 'current_country', label: 'Current Country / አሁን ያሉበት ሀገር' },
                    { id: 'phone', label: 'Phone Number / ስልክ ቁጥር' },
                    { id: 'email', label: 'Email / ኢሜይል' },
                    { id: 'education', label: 'Education Level / የትምህርት ደረጃ' },
                    { id: 'marital_status', label: 'Marital Status / የትዳር ሁኔታ' },
                    { id: 'number_of_children', label: 'Number of Children / የልጆች ብዛት' }
                ];
                
                let allValid = true;
                let firstInvalidField = null;
                
                for (let field of requiredFields) {
                    const input = document.getElementById(field.id);
                    if (input && !input.value) {
                        allValid = false;
                        if (!firstInvalidField) {
                            firstInvalidField = input;
                        }
                        input.style.borderColor = 'var(--danger-color)';
                    } else if (input) {
                        input.style.borderColor = 'var(--secondary-color)';
                    }
                }
                
                // Validate children details if applicable
                const numChildren = parseInt(childrenNumberInput.value) || 0;
                if (numChildren > 0) {
                    for (let i = 1; i <= numChildren; i++) {
                        const childName = document.querySelector(`input[name="child_${i}_name"]`);
                        const childDOB = document.querySelector(`input[name="child_${i}_dob"]`);
                        const childGender = document.querySelector(`select[name="child_${i}_gender"]`);
                        
                        if ((childName && !childName.value) || (childDOB && !childDOB.value) || (childGender && !childGender.value)) {
                            allValid = false;
                            alert('እባክዎ የሁሉንም ልጆች መረጃ ያሙሉ | Please fill in all children information');
                            break;
                        }
                    }
                }
                
                if (!allValid) {
                    alert('እባክዎ ሁሉንም አስፈላጊ መረጃዎች ያሙሉ | Please fill in all required fields');
                    if (firstInvalidField) {
                        firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        firstInvalidField.focus();
                    }
                    return;
                }
                
                // Save information to localStorage
                const formData = new FormData(form);
                const dataToSave = {};
                for (let [key, value] of formData.entries()) {
                    if (key !== 'payment_method' && key !== 'payment_screenshot' && key !== 'terms') {
                        dataToSave[key] = value;
                    }
                }
                localStorage.setItem('dv_lottery_personal_info', JSON.stringify(dataToSave));
                
                // Show save message
                saveMessage.style.display = 'block';
                saveInfoBtn.textContent = '✅ Saved! Proceed to Payment / ተቀምጧል! ወደ ክፍያ ይቀጥሉ';
                saveInfoBtn.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)';
                
                // Enable payment section
                paymentSection.style.opacity = '1';
                paymentSection.style.pointerEvents = 'auto';
                paymentSection.style.transition = 'opacity 0.5s ease';
                
                // Enable payment field validation
                const paymentMethod = document.getElementById('payment_method');
                const paymentScreenshot = document.getElementById('payment_screenshot');
                if (paymentMethod) paymentMethod.setAttribute('required', 'true');
                if (paymentScreenshot) paymentScreenshot.setAttribute('required', 'true');
                
                // Scroll to payment section
                setTimeout(() => {
                    paymentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 500);
            });
        }
        
        // Handle number of children input
        if (childrenNumberInput) {
            childrenNumberInput.addEventListener('change', function() {
                const numChildren = parseInt(this.value) || 0;
                
                if (numChildren > 0) {
                    childrenDetails.style.display = 'block';
                    generateChildrenForms(numChildren);
                } else {
                    childrenDetails.style.display = 'none';
                    childrenContainer.innerHTML = '';
                }
            });
        }
        
        // Function to generate children forms
        function generateChildrenForms(count) {
            childrenContainer.innerHTML = '';
            
            for (let i = 1; i <= count; i++) {
                const childDiv = document.createElement('div');
                childDiv.className = 'child-entry';
                childDiv.innerHTML = `
                    <h5>Child ${i} / ልጅ ${i}</h5>
                    <div class="form-group">
                        <label>Full Name (ሙሉ ስም) *</label>
                        <input type="text" name="child_${i}_name" required placeholder="Child's Full Name">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Date of Birth (የልደት ቀን) *</label>
                            <input type="date" name="child_${i}_dob" required>
                        </div>
                        <div class="form-group">
                            <label>Gender (ፆታ) *</label>
                            <select name="child_${i}_gender" required>
                                <option value="">Select</option>
                                <option value="male">Male (ወንድ)</option>
                                <option value="female">Female (ሴት)</option>
                            </select>
                        </div>
                    </div>
                `;
                childrenContainer.appendChild(childDiv);
            }
        }
        
        // Photo validation (JPEG, max 240KB)
        if (photoInput) {
            photoInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    // Validate file type
                    if (!file.type.match('image/jpeg') && !file.type.match('image/jpg')) {
                        alert('ፎቶው JPEG format መሆን አለበት | Photo must be JPEG format');
                        photoInput.value = '';
                        return;
                    }
                    
                    // Validate file size (max 240KB)
                    if (file.size > 240 * 1024 * 1024) {
                        alert('ፎቶው ከ 240KB የማይበልጥ መሆን አለበት | Photo must be less than 240KB');
                        photoInput.value = '';
                        return;
                    }
                }
            });
        }
        
        // Payment screenshot validation
        if (paymentScreenshotInput) {
            paymentScreenshotInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const fileSize = (file.size / 1024 / 1024).toFixed(2); // Convert to MB
                    
                    // Validate file size (max 10MB)
                    if (file.size > 10 * 1024 * 1024) {
                        alert('File size is too large. Please upload an image smaller than 10MB.');
                        paymentScreenshotInput.value = '';
                        return;
                    }
                    
                    // Validate file type
                    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
                    if (!allowedTypes.includes(file.type)) {
                        alert('Invalid file type. Please upload an image (JPEG, PNG, GIF, or WEBP).');
                        paymentScreenshotInput.value = '';
                        return;
                    }
                }
            });
        }
        
        // Form submission handling
        form.addEventListener('submit', function(e) {
            // Validate phone number format
            const phone = document.getElementById('phone').value;
            const phoneRegex = /^(\+251|0)?[79]\d{8}$/;
            
            if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
                alert('Please enter a valid Ethiopian phone number (e.g., +251912345678 or 0912345678)');
                e.preventDefault();
                return false;
            }
            
            // Validate date of birth (must be at least 18 years old)
            const dob = new Date(document.getElementById('date_of_birth').value);
            const today = new Date();
            const age = today.getFullYear() - dob.getFullYear();
            const monthDiff = today.getMonth() - dob.getMonth();
            
            if (age < 18 || (age === 18 && monthDiff < 0)) {
                alert('You must be at least 18 years old to apply.');
                e.preventDefault();
                return false;
            }
            
            // Validate payment screenshot
            if (!fileInput.files || fileInput.files.length === 0) {
                alert('Please upload a payment screenshot.');
                e.preventDefault();
                return false;
            }
            
            // Show loading state
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            // Form will submit normally using Netlify Forms
        });
        
        // Real-time validation feedback
        const inputs = form.querySelectorAll('input[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.style.borderColor = 'var(--danger-color)';
                } else {
                    this.style.borderColor = 'var(--secondary-color)';
                }
            });
            
            input.addEventListener('input', function() {
                if (this.value) {
                    this.style.borderColor = 'var(--secondary-color)';
                }
            });
        });
    }
    
    // Smooth scroll for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all form sections
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.form-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
});

