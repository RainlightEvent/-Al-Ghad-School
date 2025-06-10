window.onload = function() {
    setLang('en');

    // Google Sheets submission
    document.getElementById('registrationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const form = e.target;
        const lang = document.documentElement.getAttribute('lang');
        const mobile = form.mobile.value;
        const email = form.email.value;

        // Validate mobile number
        if (!/^[0-9]{10,15}$/.test(mobile)) {
            alert(lang === 'ar' ? 'يرجى إدخال رقم جوال صالح (10-15 رقمًا)' : 'Please enter a valid mobile number (10-15 digits)');
            return;
        }

        // Validate email
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            alert(lang === 'ar' ? 'يرجى إدخال بريد إلكتروني صالح' : 'Please enter a valid email address');
            return;
        }

        const data = {
            title: form.title.value,
            name: form.name.value,
            surname: form.surname.value,
            mobile: mobile,
            email: email,
            designation: form.designation.value,
            organisation: form.organisation.value
        };

        fetch('https://script.google.com/macros/s/AKfycbx24MU6e2j3KDgztnwipnT5I8us1c0xA8dyTztKjq55ZkNMevqcbVJQiFnHZhii1gJU/exec', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === "success") {
                alert(lang === 'ar' ? 'تم التسجيل بنجاح!' : 'Registration successful!');
                form.reset();
                // Reset select to placeholder
                form.title.innerHTML = `
                    <option value="" disabled selected>${lang === 'ar' ? 'اختر اللقب' : 'Select Title'}</option>
                    <option value="Mr">${lang === 'ar' ? 'السيد' : 'Mr'}</option>
                    <option value="Ms">${lang === 'ar' ? 'السيدة' : 'Ms'}</option>
                    <option value="Dr">${lang === 'ar' ? 'دكتور' : 'Dr'}</option>
                    <option value="Prof">${lang === 'ar' ? 'أستاذ' : 'Prof'}</option>
                    <option value="Other">${lang === 'ar' ? 'أخرى' : 'Other'}</option>
                `;
            } else {
                alert(lang === 'ar' ? 'فشل التسجيل. يرجى المحاولة مرة أخرى.' : 'Submission failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert(lang === 'ar' 
                ? 'خطأ في إرسال النموذج. تحقق من الاتصال بالإنترنت وحاول مرة أخرى.'
                : 'Error submitting form. Please check your internet connection and try again.');
        });
    });
};

function setLang(lang) {
    const isArabic = lang === 'ar';
    document.body.setAttribute('dir', isArabic ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
    document.getElementById('btn-ar').classList.toggle('active', isArabic);
    document.getElementById('btn-en').classList.toggle('active', !isArabic);
    document.getElementById('btn-ar').setAttribute('aria-pressed', isArabic ? 'true' : 'false');
    document.getElementById('btn-en').setAttribute('aria-pressed', !isArabic ? 'true' : 'false');

    // Update select options
    const titleSelect = document.getElementById('title');
    titleSelect.innerHTML = `
        <option value="" disabled selected>${isArabic ? 'اختر اللقب' : 'Select Title'}</option>
        <option value="Mr">${isArabic ? 'السيد' : 'Mr'}</option>
        <option value="Ms">${isArabic ? 'السيدة' : 'Ms'}</option>
        <option value="Dr">${isArabic ? 'دكتور' : 'Dr'}</option>
        <option value="Prof">${isArabic ? 'أستاذ' : 'Prof'}</option>
        <option value="Other">${isArabic ? 'أخرى' : 'Other'}</option>
    `;
}